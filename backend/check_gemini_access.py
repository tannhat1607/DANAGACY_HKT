"""Read model availability; redact credential from all displayed upstream messages."""
from app.main import planner_provider
import httpx
key = getattr(planner_provider, 'key', '')
model = getattr(planner_provider, 'model', '')
with httpx.Client(timeout=15) as client:
    response = client.get(f'https://generativelanguage.googleapis.com/v1beta/models/{model}',
                          headers={'x-goog-api-key': key})
    data = response.json()
    print('Model lookup HTTP:', response.status_code)
    error = data.get('error', {})
    print('Reason:', str(error.get('message', 'available')).replace(key, '[REDACTED]') if key else 'No key')
    response = client.get('https://generativelanguage.googleapis.com/v1beta/models',
                          headers={'x-goog-api-key': key})
    print('Model list HTTP:', response.status_code)
    if response.is_success:
        print('Available Flash models:', [m['name'] for m in response.json().get('models', [])
              if 'flash' in m['name'] and 'generateContent' in m.get('supportedGenerationMethods', [])])
