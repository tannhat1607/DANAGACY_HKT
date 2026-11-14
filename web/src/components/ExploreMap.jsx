import { useEffect, useState } from 'react';
import { api } from '../api.js';

const places = [
  { key: 'sontra', name: 'Bán đảo Sơn Trà', query: 'Son Tra Peninsula Da Nang Vietnam', area: 'Sơn Trà', free: true, tour: true },
  { key: 'caurong', name: 'Cầu Rồng', query: 'Dragon Bridge Da Nang Vietnam', area: 'Hải Châu', free: true, tour: false },
  { key: 'nguhanhson', name: 'Ngũ Hành Sơn', query: 'Marble Mountains Da Nang Vietnam', area: 'Ngũ Hành Sơn', free: false, tour: true },
  { key: 'baotang', name: 'Bảo tàng Đà Nẵng', query: 'Da Nang Museum Vietnam', area: 'Hải Châu', free: false, tour: true },
];

export default function ExploreMap({ onPlaceSelect }) {
  const [key, setKey] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    api('/config').then(config => { if (active) setKey(config.googleMapsEmbedKey || ''); })
      .catch(() => {}).finally(() => { if (active) setLoading(false); });
    const reset = () => setSelected(null);
    window.addEventListener('danangacy:map-reset', reset);
    return () => { active = false; window.removeEventListener('danangacy:map-reset', reset); };
  }, []);
  const query = selected?.query || 'Da Nang Vietnam';
  const external = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const params = new URLSearchParams({ key, q: query, language: 'vi' });
  return <section className="brutal-card explore-map">
    <header className="explore-map-heading"><span>{selected?.name || 'KHÁM PHÁ ĐÀ NẴNG'}</span><span>GOOGLE MAPS</span></header>
    {key ? <iframe title={`Bản đồ ${selected?.name || 'Đà Nẵng'}`} className="explore-map-frame"
      src={`https://www.google.com/maps/embed/v1/place?${params}`} loading="lazy" allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin" />
      : <div className="explore-map-empty"><span className="brutal-badge badge-teal">ĐỊA ĐIỂM DI SẢN</span><h3>Khám phá Đà Nẵng trên bản đồ</h3><p>{loading ? 'Đang kết nối bản đồ…' : 'Bản đồ nhúng chưa được cấu hình. Bạn vẫn có thể mở địa điểm bằng Google Maps.'}</p><a className="brutal-btn brutal-btn-ochre" href={external} target="_blank" rel="noreferrer">Mở Google Maps ↗</a></div>}
    <div className="explore-map-places" aria-label="Chọn địa điểm">
      {places.map(place => <button type="button" key={place.key} id={`pin-${place.key}`}
        data-area={place.area} data-free={place.free} data-tour={place.tour}
        className={`brutal-btn brutal-btn-sm ${selected?.key === place.key ? 'brutal-btn-ochre' : 'brutal-btn-white'}`}
        onClick={() => { setSelected(place); onPlaceSelect(place.key); }}>{place.name}</button>)}
    </div>
    <footer className="explore-map-footer"><span>Chọn địa điểm để định vị và xem chi tiết. Bộ lọc áp dụng cho danh sách bên trên.</span><a href={external} target="_blank" rel="noreferrer">Xem trên Google Maps ↗</a></footer>
  </section>;
}
