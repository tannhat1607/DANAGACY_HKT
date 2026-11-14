import json
import httpx
import pytest
from app.providers import GeminiPlannerProvider, PlannerError, create_planner
from app.main import DATA


def mock_response(monkeypatch, status=200, plan=None, timeout=False):
    original = httpx.Client
    def handler(request):
        assert request.headers['x-goog-api-key'] == 'test-key'
        assert json.loads(request.content)['generationConfig']['responseMimeType'] == 'application/json'
        if timeout:
            raise httpx.ReadTimeout('timeout', request=request)
        return httpx.Response(status, json={'candidates': [{'finishReason': 'STOP',
            'content': {'parts': [{'text': json.dumps({'stops': plan})}]}}]})
    monkeypatch.setattr(httpx, 'Client', lambda **kwargs: original(transport=httpx.MockTransport(handler)))


def test_valid_plan(monkeypatch):
    mock_response(monkeypatch, plan=[{'key': 'sontra', 'start': '09:00', 'end': '11:30'}])
    stop = DATA['stops']['sontra']
    result = GeminiPlannerProvider('test-key', 'test-model').plan([stop], 'moderate')
    assert result[0]['start'] == '09:00'
    assert result[0]['img'] == stop['img']


@pytest.mark.parametrize('plan', [
    [{'key': 'unknown', 'start': '09:00', 'end': '12:00'}],
    [{'key': 'sontra', 'start': '25:00', 'end': '26:00'}],
    [{'key': 'sontra', 'start': '09:00', 'end': '09:30'}], [],
])
def test_invalid_plan(monkeypatch, plan):
    mock_response(monkeypatch, plan=plan)
    with pytest.raises(PlannerError):
        GeminiPlannerProvider('test-key', 'test-model').plan([DATA['stops']['sontra']], 'moderate')


@pytest.mark.parametrize('status', [400, 403, 404, 429, 500])
def test_errors(monkeypatch, status):
    mock_response(monkeypatch, status=status)
    with pytest.raises(PlannerError) as error:
        GeminiPlannerProvider('test-key', 'test-model').plan([DATA['stops']['sontra']], 'moderate')
    assert 'test-key' not in str(error.value)


def test_timeout(monkeypatch):
    mock_response(monkeypatch, timeout=True)
    with pytest.raises(PlannerError) as error:
        GeminiPlannerProvider('test-key', 'test-model').plan([DATA['stops']['sontra']], 'moderate')
    assert error.value.status == 504


def test_env(monkeypatch):
    monkeypatch.delenv('GEMINI_API_KEY', raising=False)
    assert create_planner().source == 'sample'
    monkeypatch.setenv('GEMINI_API_KEY', 'test-key')
    assert create_planner().source == 'gemini'
