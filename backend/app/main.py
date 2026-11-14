"""Stateless API; user data stays in the browser, catalog is read-only JSON."""
from datetime import date
from pathlib import Path
from typing import Literal
import json
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from .providers import create_planner, weather_provider, PlannerError, SamplePlannerProvider

load_dotenv(Path(__file__).resolve().parents[2] / '.env')
planner_provider = create_planner()
DATA = json.loads((Path(__file__).parent / 'data/catalog.json').read_text(encoding='utf-8'))
app = FastAPI(title='Danangacy API', version='1.0.0')


class PlanRequest(BaseModel):
    date: date
    destinations: list[str] = Field(min_length=1, max_length=4)
    pace: Literal['Chậm rãi', 'Vừa phải', 'Năng động'] = 'Vừa phải'
    people: int = Field(default=2, ge=1, le=100)


class QuizRequest(BaseModel):
    question: int = Field(ge=0)
    answer: int = Field(ge=0, le=3)


@app.get('/api/health')
def health():
    return {'status': 'ok', 'planner': planner_provider.source, 'weather': weather_provider.source}


@app.get('/api/catalog')
def catalog():
    return {k: v for k, v in DATA.items() if k != 'questions'}


@app.post('/api/itineraries')
def plan(request: PlanRequest):
    keys = list(dict.fromkeys(request.destinations))
    if any(key not in DATA['stops'] for key in keys):
        raise HTTPException(422, 'Điểm đến không hợp lệ')
    source = planner_provider.source
    warning = None
    try:
        stops = planner_provider.plan([DATA['stops'][key] for key in keys], request.pace,
                                      day=request.date, people=request.people)
    except PlannerError as error:
        stops = SamplePlannerProvider().plan([DATA['stops'][key] for key in keys], request.pace,
                                             day=request.date, people=request.people)
        source = 'sample'
        warning = 'Gemini chưa sẵn sàng. Lịch trình này dùng dữ liệu mẫu để bạn tiếp tục trải nghiệm.'
    for previous, current in zip(stops, stops[1:]):
        if current['start'] < previous['end']:
            raise HTTPException(409, 'Các khung giờ bị trùng')
    return {'date': request.date, 'stops': stops, 'source': source, 'warning': warning,
            'ticketTotal': sum(s['ticketCost'] for s in stops) * request.people}


@app.get('/api/weather')
def weather(day: date, latitude: float = 16.0544, longitude: float = 108.2022):
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        raise HTTPException(422, 'Tọa độ không hợp lệ')
    try:
        hourly = weather_provider.forecast(day, latitude, longitude)
    except PlannerError as error:
        raise HTTPException(error.status, str(error)) from None
    return {'date': day, 'source': weather_provider.source, 'isSample': False,
            'hourly': hourly,
            'replacements': DATA['replacements']}


@app.get('/api/quiz')
def quiz():
    return [{'id': i, 'question': q['question'], 'options': q['options']}
            for i, q in enumerate(DATA['questions'])]


@app.post('/api/quiz/answer')
def answer(request: QuizRequest):
    if request.question >= len(DATA['questions']):
        raise HTTPException(404, 'Không tìm thấy câu hỏi')
    question = DATA['questions'][request.question]
    return {'correct': request.answer == question['correct'],
            'correctIndex': question['correct'], 'explanation': question['explanation']}


# Integration seam: replace sample planner/weather with providers here when ready.
# Secrets belong only in backend env / Secret Manager, never in VITE_* variables.
static = Path(os.getenv('STATIC_DIR', str(Path(__file__).resolve().parents[2] / 'web/dist')))
if static.is_dir():
    app.mount('/assets', StaticFiles(directory=static / 'assets'), name='assets')

    @app.get('/')
    def index():
        return FileResponse(static / 'index.html')
