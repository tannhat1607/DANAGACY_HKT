from fastapi.testclient import TestClient
from app.main import app
import pytest


@pytest.fixture(autouse=True)
def sample_planner(monkeypatch):
    from app.providers import SamplePlannerProvider
    monkeypatch.setattr('app.main.planner_provider', SamplePlannerProvider())
    class WeatherStub:
        source = 'open-meteo'
        def forecast(self, day, latitude, longitude):
            return [{'time': f'{day}T{hour:02}:00', 'rainProbability': 85, 'temperature': 25}
                    for hour in range(24)]
    monkeypatch.setattr('app.main.weather_provider', WeatherStub())

client = TestClient(app)


def test_catalog_and_plan():
    assert client.get('/api/health').status_code == 200
    assert len(client.get('/api/catalog').json()['places']) == 4
    result = client.post('/api/itineraries', json={
        'date': '2026-11-20', 'destinations': ['caurong', 'nguhanhson'], 'people': 2})
    assert result.status_code == 200
    assert result.json()['stops'][0]['key'] == 'nguhanhson'
    assert result.json()['ticketTotal'] == 80000


def test_invalid_plan():
    assert client.post('/api/itineraries', json={
        'date': '2026-11-20', 'destinations': ['unknown']}).status_code == 422
    assert client.post('/api/itineraries', json={
        'date': 'bad', 'destinations': []}).status_code == 422


def test_public_maps_config_never_exposes_gemini(monkeypatch):
    monkeypatch.setenv('GOOGLE_MAPS_EMBED_KEY', 'public-map-test-key')
    monkeypatch.setenv('GEMINI_API_KEY', 'private-test-key')
    response = client.get('/api/config')
    assert response.json() == {'googleMapsEmbedKey': 'public-map-test-key'}
    assert 'private-test-key' not in response.text


def test_gemini_failure_returns_labeled_mock(monkeypatch):
    from app.providers import PlannerError
    class FailingPlanner:
        source = 'gemini'
        def plan(self, *args, **kwargs):
            raise PlannerError('timeout', 504)
    monkeypatch.setattr('app.main.planner_provider', FailingPlanner())
    response = client.post('/api/itineraries', json={
        'date': '2026-11-20', 'destinations': ['nguhanhson', 'caurong'], 'people': 2})
    assert response.status_code == 200
    result = response.json()
    assert result['source'] == 'sample'
    assert result['warning']
    assert len(result['stops']) == 2
    assert result['ticketTotal'] == 80000


def test_quiz_grading():
    assert 'correct' not in client.get('/api/quiz').json()[0]
    result = client.post('/api/quiz/answer', json={'question': 0, 'answer': 0})
    assert result.json()['correct'] is True
    assert client.post('/api/quiz/answer', json={'question': 99, 'answer': 0}).status_code == 404


def test_sample_weather():
    result = client.get('/api/weather?day=2026-11-20').json()
    assert result['isSample'] is False
    assert result['source'] == 'open-meteo'
    assert len(result['hourly']) == 24
    assert result['hourly'][14]['rainProbability'] == 85
    assert client.get('/api/weather?day=2026-11-20&latitude=999').status_code == 422


def test_frontend_build_served():
    from app.main import static
    if not static.exists():
        return  # API-only development does not require a frontend build.
    response = client.get('/')
    assert response.status_code == 200
    assert '<div id="root"></div>' in response.text
    import re
    script = re.search(r'src="([^"]+\.js)"', response.text).group(1)
    assert client.get(script).status_code == 200
    assert client.get('/assets/son_tra.jpg').status_code == 200
    assert client.get('/api/missing').status_code == 404
