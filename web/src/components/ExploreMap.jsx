import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../api.js';

const places = [
  { key: 'sontra', name: 'Bán đảo Sơn Trà', query: 'Son Tra Peninsula Da Nang Vietnam', zoom: 13, area: 'Sơn Trà', free: true, tour: true },
  { key: 'caurong', name: 'Cầu Rồng', query: 'Dragon Bridge Da Nang Vietnam', zoom: 16, area: 'Hải Châu', free: true, tour: false },
  { key: 'nguhanhson', name: 'Ngũ Hành Sơn', query: 'Marble Mountains Da Nang Vietnam', zoom: 15, area: 'Ngũ Hành Sơn', free: false, tour: true },
  { key: 'baotang', name: 'Bảo tàng Đà Nẵng', query: 'Da Nang Museum Vietnam', zoom: 17, area: 'Hải Châu', free: false, tour: true },
];

const areas = {
  'Hải Châu': { query: 'Hải Châu, Đà Nẵng, Việt Nam', zoom: 13 },
  'Sơn Trà': { query: 'Sơn Trà, Đà Nẵng, Việt Nam', zoom: 12 },
  'Ngũ Hành Sơn': { query: 'Ngũ Hành Sơn, Đà Nẵng, Việt Nam', zoom: 12 },
};

export default function ExploreMap({ onPlaceSelect }) {
  const [key, setKey] = useState('');
  const [selected, setSelected] = useState(null);
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placesContainer, setPlacesContainer] = useState(null);
  useEffect(() => {
    let active = true;
    setPlacesContainer(document.getElementById('explore-place-buttons'));
    api('/config').then(config => { if (active) setKey(config.googleMapsEmbedKey || ''); })
      .catch(() => {}).finally(() => { if (active) setLoading(false); });
    const reset = () => { setSelected(null); setArea(null); };
    const selectArea = event => { setSelected(null); setArea(areas[event.detail] || null); };
    window.addEventListener('danangacy:map-reset', reset);
    window.addEventListener('danangacy:map-area', selectArea);
    return () => { active = false; window.removeEventListener('danangacy:map-reset', reset); window.removeEventListener('danangacy:map-area', selectArea); };
  }, []);
  const query = selected?.query || area?.query || 'Da Nang Vietnam';
  const external = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const params = new URLSearchParams({ key, q: query, language: 'vi' });
  if (selected || area) params.set('zoom', String(selected?.zoom ?? area.zoom));
  return <section className="brutal-card explore-map">
    <header className="explore-map-heading"><span>{selected?.name || area?.query.split(',')[0] || 'KHÁM PHÁ ĐÀ NẴNG'}</span><span>GOOGLE MAPS</span></header>
    {key ? <iframe title={`Bản đồ ${selected?.name || area?.query.split(',')[0] || 'Đà Nẵng'}`} className="explore-map-frame"
      src={`https://www.google.com/maps/embed/v1/place?${params}`} loading="lazy" allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin" />
      : <div className="explore-map-empty"><span className="brutal-badge badge-teal">ĐỊA ĐIỂM DI SẢN</span><h3>Khám phá Đà Nẵng trên bản đồ</h3><p>{loading ? 'Đang kết nối bản đồ…' : 'Bản đồ nhúng chưa được cấu hình. Bạn vẫn có thể mở địa điểm bằng Google Maps.'}</p><a className="brutal-btn brutal-btn-ochre" href={external} target="_blank" rel="noreferrer">Mở Google Maps ↗</a></div>}
    {placesContainer && createPortal(<div className="explore-map-places" aria-label="Chọn địa điểm">
      {places.map(place => <button type="button" key={place.key} id={`pin-${place.key}`}
        data-area={place.area} data-free={place.free} data-tour={place.tour}
        className={`brutal-btn brutal-btn-sm ${selected?.key === place.key ? 'brutal-btn-ochre' : 'brutal-btn-white'}`}
        onClick={() => { setSelected(place); setArea(null); }}>{place.name}</button>)}
    </div>, placesContainer)}
    <footer className="explore-map-footer"><span>Chọn địa điểm để bản đồ chuyển tới vị trí đó. Bộ lọc áp dụng cho danh sách bên trên.</span><div className="explore-map-actions">{selected && <button type="button" className="brutal-btn brutal-btn-sm brutal-btn-ochre" onClick={() => onPlaceSelect(selected.key)}>Xem chi tiết</button>}<a href={external} target="_blank" rel="noreferrer">Xem trên Google Maps ↗</a></div></footer>
  </section>;
}
