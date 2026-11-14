"""Explicit live smoke check without printing credentials."""
import json
from datetime import datetime, timezone, timedelta
from fastapi.testclient import TestClient
from app.main import app, planner_provider

day = datetime.now(timezone(timedelta(hours=7))).date().isoformat()
client = TestClient(app)
print('Planner:', planner_provider.source, 'Model:', getattr(planner_provider, 'model', 'sample'))
for path, body in [('/api/itineraries', {'date': day, 'destinations': ['nguhanhson', 'sontra', 'caurong'], 'people': 2}),
                   (f'/api/weather?day={day}', None)]:
    response = client.post(path, json=body) if body else client.get(path)
    data = response.json()
    print(json.dumps({'endpoint': path, 'status': response.status_code,
        'source': data.get('source'), 'stops': len(data.get('stops', [])),
        'hours': len(data.get('hourly', [])), 'detail': data.get('detail')}, ensure_ascii=True))
