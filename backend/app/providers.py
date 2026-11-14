"""Server-side providers. Only catalog metadata is sent to Gemini."""
import json
import os
import re
import httpx
from pydantic import BaseModel, Field, ValidationError


class PlannerError(Exception):
    def __init__(self, message, status=502):
        super().__init__(message)
        self.status = status


class PlannedStop(BaseModel):
    key: str
    start: str = Field(pattern=r'^([01]\d|2[0-3]):[0-5]\d$')
    end: str = Field(pattern=r'^([01]\d|2[0-3]):[0-5]\d$')


class GeneratedPlan(BaseModel):
    stops: list[PlannedStop] = Field(min_length=1, max_length=4)


class GeminiPlannerProvider:
    source = 'gemini'

    def __init__(self, key, model):
        self.key = key
        self.model = model.removeprefix('models/')

    def plan(self, stops, pace, *, day=None, people=2):
        if not re.fullmatch(r'[a-zA-Z0-9._-]+', self.model):
            raise PlannerError('GEMINI_MODEL không hợp lệ. Kiểm tra file .env.', 503)
        prompt = {
            'task': 'Lập lịch du lịch Đà Nẵng trong một ngày. Dùng đúng mỗi điểm đã chọn một lần. '
                    'Giữ thời lượng tham quan tối thiểu theo durationHours, chừa ít nhất 30 phút '
                    'di chuyển giữa các điểm. Các mốc giờ từ 07:00 đến 22:00, không trùng nhau. '
                    'Không tạo thêm điểm, không thay key. Giờ mẫu chỉ là gợi ý, không phải giờ mở cửa đã xác minh.',
            'date': str(day), 'people': people, 'pace': pace,
            'places': [{k: s[k] for k in ('key', 'title', 'durationHours', 'start', 'end')} for s in stops],
        }
        try:
            with httpx.Client(timeout=httpx.Timeout(20, connect=5)) as client:
                response = client.post(
                    f'https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent',
                    headers={'x-goog-api-key': self.key},
                    json={'contents': [{'parts': [{'text': json.dumps(prompt, ensure_ascii=False)}]}],
                          'generationConfig': {'responseMimeType': 'application/json',
                                               'responseJsonSchema': GeneratedPlan.model_json_schema()}},
                )
            if response.status_code == 403:
                details = response.json().get('error', {}).get('details', [])
                if any(isinstance(item, dict) and item.get('reason') == 'SERVICE_DISABLED' for item in details):
                    raise PlannerError('Gemini API chưa được bật trong Google Cloud project của API key. Hãy bật Generative Language API rồi thử lại.', 503)
            if response.status_code in (400, 401, 403, 404):
                raise PlannerError('Gemini từ chối yêu cầu. Kiểm tra API key, tên model và quyền truy cập.', 503)
            if response.status_code == 429:
                raise PlannerError('Gemini đã hết quota hoặc đang giới hạn yêu cầu. Vui lòng thử lại sau.', 503)
            response.raise_for_status()
            candidate = response.json()['candidates'][0]
            if candidate.get('finishReason') != 'STOP':
                raise ValueError('Incomplete response')
            text = ''.join(part.get('text', '') for part in candidate['content']['parts'] if not part.get('thought'))
            generated = GeneratedPlan.model_validate_json(text)
            originals = {s['key']: s for s in stops}
            keys = [s.key for s in generated.stops]
            if len(keys) != len(originals) or set(keys) != set(originals):
                raise ValueError('Invalid destinations')
            result = sorted(generated.stops, key=lambda s: s.start)
            previous_end = None
            for stop in result:
                start, end = (int(t[:2]) * 60 + int(t[3:]) for t in (stop.start, stop.end))
                if not (420 <= start < end <= 1320):
                    raise ValueError('Invalid hours')
                if end - start < originals[stop.key]['durationHours'] * 60:
                    raise ValueError('Insufficient visit time')
                if previous_end is not None and start < previous_end + 30:
                    raise ValueError('Insufficient travel time')
                previous_end = end
            return [{**originals[s.key], 'start': s.start, 'end': s.end} for s in result]
        except httpx.TimeoutException:
            raise PlannerError('Gemini phản hồi quá lâu. Vui lòng thử lại.', 504) from None
        except httpx.HTTPError:
            raise PlannerError('Không kết nối được Gemini. Vui lòng thử lại sau.') from None
        except (ValueError, KeyError, IndexError, TypeError, ValidationError):
            raise PlannerError('Gemini trả lịch trình chưa hợp lệ. Vui lòng tạo lại.') from None


def create_planner():
    key = os.getenv('GEMINI_API_KEY', '').strip()
    if not key:
        return SamplePlannerProvider()
    return GeminiPlannerProvider(key, os.getenv('GEMINI_MODEL', '').strip() or 'gemini-2.5-flash')


class SamplePlannerProvider:
    source = 'sample'

    def plan(self, stops, pace, *, day=None, people=2):
        return sorted(stops, key=lambda stop: stop['start'])


class SampleWeatherProvider:
    def forecast(self, day, latitude, longitude):
        return [{'time': f'{day}T{hour:02}:00',
                 'rainProbability': 85 if 14 <= hour <= 16 else 15}
                for hour in range(24)]


class OpenMeteoProvider:
    source = 'open-meteo'

    def forecast(self, day, latitude, longitude):
        from datetime import datetime, timezone, timedelta
        today = datetime.now(timezone(timedelta(hours=7))).date()
        if not today <= day <= today + timedelta(days=15):
            raise PlannerError('Chỉ có thể dự báo từ hôm nay đến 15 ngày tiếp theo.', 422)
        try:
            with httpx.Client(timeout=httpx.Timeout(10, connect=5)) as client:
                response = client.get('https://api.open-meteo.com/v1/forecast', params={
                    'latitude': latitude, 'longitude': longitude,
                    'hourly': 'precipitation_probability,temperature_2m',
                    'timezone': 'Asia/Ho_Chi_Minh', 'start_date': day.isoformat(),
                    'end_date': day.isoformat(),
                })
            if response.status_code == 429:
                raise PlannerError('Dịch vụ thời tiết đang giới hạn truy cập. Vui lòng thử lại sau.', 503)
            response.raise_for_status()
            data = response.json()['hourly']
            times, probabilities, temperatures = (data[k] for k in
                ('time', 'precipitation_probability', 'temperature_2m'))
            if not times or not (len(times) == len(probabilities) == len(temperatures)):
                raise ValueError('Invalid hourly data')
            result = []
            for time, probability, temperature in zip(times, probabilities, temperatures):
                if not time.startswith(day.isoformat() + 'T'):
                    raise ValueError('Unexpected date')
                if probability is not None and (not isinstance(probability, (int, float)) or not 0 <= probability <= 100):
                    raise ValueError('Invalid probability')
                result.append({'time': time, 'rainProbability': probability, 'temperature': temperature})
            return result
        except httpx.TimeoutException:
            raise PlannerError('Dịch vụ thời tiết phản hồi quá lâu. Vui lòng thử lại.', 504) from None
        except httpx.HTTPError:
            raise PlannerError('Không kết nối được Open-Meteo. Vui lòng thử lại sau.') from None
        except (ValueError, KeyError, TypeError):
            raise PlannerError('Dữ liệu thời tiết chưa hợp lệ. Vui lòng thử lại.') from None


weather_provider = OpenMeteoProvider()
