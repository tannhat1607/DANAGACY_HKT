import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function WeatherForecast() {
  const [day, setDay] = useState(new Date().toLocaleDateString('en-CA'));
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    setForecast(null);
    setError('');
    api(`/weather?day=${day}`).then(data => { if (active) setForecast(data); })
      .catch(error => { if (active) setError(error.message); });
    return () => { active = false; };
  }, [day]);
  return <section className="my-4 border-2 border-stone-900 bg-amber-50 p-4" aria-label="Dự báo thời tiết">
    <label className="flex flex-wrap items-center gap-3 font-bold">
      Dự báo thời tiết Đà Nẵng
      <input type="date" required value={day} onChange={event => { if (event.target.value) setDay(event.target.value); }} className="border-2 border-stone-900 p-2" />
    </label>
    <p className="my-3 text-sm" role="status">{error || (forecast ? 'Dự báo Open-Meteo · Giờ Việt Nam' : 'Đang tải dự báo…')}</p>
    {forecast && <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {forecast.hourly.filter((_, i) => [8, 11, 14, 18].includes(i)).map(hour =>
        <div key={hour.time} className="border border-stone-800 p-3">
          <strong>{hour.time.slice(11)}</strong><p>Khả năng mưa: {hour.rainProbability == null ? 'Chưa có dữ liệu' : `${hour.rainProbability}%`}</p>
          {hour.temperature != null && <p>{hour.temperature} °C</p>}
        </div>)}
    </div>}
    <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="text-sm underline">Weather data by Open-Meteo</a>
  </section>;
}
