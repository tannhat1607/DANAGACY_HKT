import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function WeatherForecast() {
  const [day, setDay] = useState(new Date().toLocaleDateString('en-CA'));
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' });
  const lastDay = new Date(`${today}T00:00:00+07:00`);
  lastDay.setDate(lastDay.getDate() + 15);
  const maxDay = lastDay.toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' });
  useEffect(() => {
    let active = true;
    setForecast(null);
    setError('');
    api(`/weather?day=${day}`).then(data => { if (active) setForecast(data); })
      .catch(error => { if (active) setError(error.message); });
    return () => { active = false; };
  }, [day, retry]);
  return <section className="brutal-card forecast-panel" aria-labelledby="forecast-title" aria-busy={!error && !forecast}>
    <div className="forecast-heading">
      <div>
        <span className="brutal-badge badge-teal">DỰ BÁO THEO GIỜ</span>
        <h2 id="forecast-title">Thời tiết Đà Nẵng</h2>
        <p className="section-description">Chọn ngày để xem nhiệt độ và khả năng mưa trước chuyến đi.</p>
      </div>
      <label className="forecast-date">
        <span>NGÀY THAM QUAN</span>
        <input type="date" required min={today} max={maxDay} value={day} onChange={event => { if (event.target.value) setDay(event.target.value); }} className="brutal-input" />
      </label>
    </div>
    {error ? <div className="forecast-error" role="alert">
      <p>{error}</p>
      <button type="button" className="brutal-btn brutal-btn-sm brutal-btn-white" onClick={() => setRetry(value => value + 1)}>Thử lại</button>
    </div> : <p className="forecast-status" role="status">{forecast ? 'Dự báo Open-Meteo · Giờ Việt Nam (UTC+7)' : 'Đang cập nhật dự báo…'}</p>}
    {!forecast && !error && <div className="forecast-grid" aria-hidden="true">{[8, 11, 14, 18].map(hour => <div className="forecast-hour forecast-loading" key={hour}><span>{hour}:00</span><strong>—</strong><p>Đang tải dữ liệu</p></div>)}</div>}
    {forecast && <div className="forecast-grid">
      {forecast.hourly.filter((_, i) => [8, 11, 14, 18].includes(i)).map(hour =>
        <div key={hour.time} className={`forecast-hour${hour.rainProbability >= 60 ? ' forecast-rain' : ''}`}>
          <span className="forecast-time">{hour.time.slice(11)}</span>
          <strong className="forecast-temperature">{hour.temperature == null ? '—' : `${Math.round(hour.temperature * 10) / 10}°`}<small>C</small></strong>
          <p>Khả năng mưa <b>{hour.rainProbability == null ? '—' : `${hour.rainProbability}%`}</b></p>
        </div>)}
    </div>}
    <div className="forecast-footer"><span>Dự báo có thể thay đổi theo thời điểm cập nhật.</span><a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Nguồn: Open-Meteo ↗</a></div>
  </section>;
}
