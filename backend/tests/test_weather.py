from datetime import datetime, timezone, timedelta
import httpx
import pytest
from app.providers import OpenMeteoProvider, PlannerError


def today():
    return datetime.now(timezone(timedelta(hours=7))).date()


def test_weather_translation(monkeypatch):
    original = httpx.Client
    day = today()
    def handler(request):
        assert request.url.host == 'api.open-meteo.com'
        assert request.url.params['timezone'] == 'Asia/Ho_Chi_Minh'
        assert 'apikey' not in request.url.params
        return httpx.Response(200, json={'hourly': {'time': [f'{day}T08:00'],
            'precipitation_probability': [None], 'temperature_2m': [25]}})
    monkeypatch.setattr(httpx, 'Client', lambda **kwargs: original(transport=httpx.MockTransport(handler)))
    result = OpenMeteoProvider().forecast(day, 16, 108)
    assert result[0]['rainProbability'] is None
    assert result[0]['temperature'] == 25


def test_forecast_range():
    for day in [today() - timedelta(days=1), today() + timedelta(days=16)]:
        with pytest.raises(PlannerError) as error:
            OpenMeteoProvider().forecast(day, 16, 108)
        assert error.value.status == 422


@pytest.mark.parametrize('status', [429, 500])
def test_weather_upstream_error(monkeypatch, status):
    original = httpx.Client
    monkeypatch.setattr(httpx, 'Client', lambda **kwargs: original(
        transport=httpx.MockTransport(lambda request: httpx.Response(status))))
    with pytest.raises(PlannerError):
        OpenMeteoProvider().forecast(today(), 16, 108)
