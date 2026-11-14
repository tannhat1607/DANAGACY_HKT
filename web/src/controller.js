// DANANGACY VINTAGE BRUTALISM CONTROLLER & DETERMINISTIC MVP FLOWS
import { api } from './api.js';
// Sample providers are served by FastAPI; user data is stored locally.

const STOP_TEMPLATES = {
  nguhanhson: {
    key: 'nguhanhson',
    start: '08:00',
    end: '11:00',
    title: 'DANH THẮNG NGŨ HÀNH SƠN',
    desc: 'Khám phá ngọn Thủy Sơn, động Huyền Không và làng đá mỹ nghệ Non Nước hơn 400 năm tuổi.',
    img: 'assets/ngu_hanh_son.jpg',
    dotColor: 'var(--vintage-terracotta)',
    timeBadgeClass: 'badge-sage',
    ticketCost: 40000,
    distanceKm: 8.5,
    durationHours: 3.0,
    isOutdoor: true,
    badges: [
      { text: 'VÉ: 40.000 VNĐ', cls: 'badge-ochre' },
      { text: 'DI TÍCH QUỐC GIA', cls: 'badge-teal' }
    ]
  },
  baotang_noon: {
    key: 'baotang',
    start: '11:30',
    end: '13:30',
    title: 'BẢO TÀNG ĐÀ NẴNG (TRONG NHÀ)',
    desc: 'Tìm hiểu dòng lịch sử hình thành xứ Quảng, tư liệu quý về văn hóa biển và đô thị Đà Nẵng.',
    img: 'assets/bao_tang_dn.jpg',
    dotColor: 'var(--vintage-ochre)',
    timeBadgeClass: 'badge-ochre',
    ticketCost: 20000,
    distanceKm: 4.2,
    durationHours: 2.0,
    isOutdoor: false,
    badges: [
      { text: 'VÉ: 20.000 VNĐ', cls: 'badge-ochre' },
      { text: 'TRONG NHÀ · MÁT MẺ', cls: 'badge-sage' }
    ]
  },
  sontra: {
    key: 'sontra',
    start: '14:00',
    end: '16:30',
    title: 'ĐỈNH BÀN CỜ - BÁN ĐẢO SƠN TRÀ (NGOÀI TRỜI)',
    desc: 'Cung đường ven biển Sơn Trà, chùa Linh Ứng và đỉnh Bàn Cờ ngắm toàn cảnh vịnh Đà Nẵng (Điểm ngoài trời dễ bị ảnh hưởng khi mưa).',
    img: 'assets/son_tra.jpg',
    dotColor: 'var(--vintage-rose)',
    timeBadgeClass: 'badge-rose',
    ticketCost: 0,
    distanceKm: 11.0,
    durationHours: 2.5,
    isOutdoor: true,
    rainVulnerable: true,
    badges: [
      { text: 'NGOÀI TRỜI 100%', cls: 'badge-terracotta' },
      { text: '⚠ DỰ BÁO MƯA 14:00 (MÔ PHỎNG)', cls: 'badge-amber' }
    ]
  },
  caurong: {
    key: 'caurong',
    start: '18:00',
    end: '21:00',
    title: 'CẦU RỒNG & CHỢ ĐÊM SƠN TRÀ',
    desc: 'Dạo bộ bờ sông Hàn, thưởng thức ẩm thực bản địa và ngắm Cầu Rồng phun lửa & nước.',
    img: 'assets/cau_rong.jpg',
    dotColor: 'var(--vintage-teal)',
    timeBadgeClass: 'badge-teal',
    ticketCost: 0,
    distanceKm: 3.0,
    durationHours: 3.0,
    isOutdoor: true,
    badges: [
      { text: 'MIỄN PHÍ', cls: 'badge-ochre' },
      { text: 'BIỂU TƯỢNG ĐÀ NẴNG', cls: 'badge-teal' }
    ]
  }
};

const WEATHER_REPLACEMENTS = {
  baotang: {
    key: 'baotang',
    name: 'BẢO TÀNG ĐÀ NẴNG & KHÔNG GIAN DI SẢN',
    timelineTitle: 'BẢO TÀNG ĐÀ NẴNG (TRONG NHÀ · ĐÃ THAY THẾ TRÁNH MƯA)',
    desc: 'Vị trí trung tâm thành phố, có bãi đậu xe có mái che, máy lạnh mát mẻ, trưng bày sinh động hơn 2.500 hiện vật lịch sử & văn hóa.',
    timelineDesc: 'Điểm đến trong nhà thay thế cho Đỉnh Bàn Cờ - Sơn Trà theo mô phỏng tránh mưa . Giữ nguyên khung giờ 14:00 - 16:30, an toàn và không bị gián đoạn.',
    img: 'assets/bao_tang_dn.jpg',
    ticketCost: 20000,
    benefit: '✓ Giữ nguyên khung giờ 14:00 - 16:30 · Tiết kiệm 45 phút di chuyển · Không ảnh hưởng các điểm còn lại.'
  },
  cham: {
    key: 'cham',
    name: 'BẢO TÀNG ĐIÊU KHẮC CHĂM ĐÀ NẴNG',
    timelineTitle: 'BẢO TÀNG ĐIÊU KHẮC CHĂM (TRONG NHÀ · ĐÃ THAY THẾ TRÁNH MƯA)',
    desc: 'Không gian trưng bày cổ vật Chăm Pa lớn nhất Việt Nam bên sông Hàn, kiến trúc Pháp cổ điển, tham quan trong nhà 100% an toàn khi trời mưa.',
    timelineDesc: 'Điểm đến di sản trong nhà thay thế cho Đỉnh Bàn Cờ - Sơn Trà theo mô phỏng tránh mưa . Giữ nguyên khung giờ 14:00 - 16:30.',
    img: 'assets/bao_tang_dn.jpg',
    ticketCost: 60000,
    benefit: '✓ Giữ nguyên khung giờ 14:00 - 16:30 · Không gian di sản Chăm Pa đặc sắc trong nhà 100%.'
  }
};

const state = {
  user: {
    isLoggedIn: false,
    name: 'Nguyễn Văn An',
    email: 'traveler@danangacy.vn',
    phone: '0905 123 456',
    coins: 350,
    savedPlaces: ['Bán đảo Sơn Trà', 'Cầu Rồng Đà Nẵng', 'Ngũ Hành Sơn'],
    vouchers: ['DN-WELCOME-2026']
  },
  currentView: 'home',
  currentPlaceModalKey: 'sontra',
  explore: {
    query: '',
    area: 'Tất cả'
  },
  itinerary: {
    title: 'KHÁM PHÁ DI SẢN ĐÀ NẴNG 1 NGÀY',
    date: '2026-11-20',
    people: '2 Người (Cặp đôi / Bạn thân)',
    pace: 'Vừa phải',
    preferences: ['culture', 'icon', 'nature'],
    rainAvoidanceApplied: false,
    rainIgnored: false,
    selectedReplacementKey: 'baotang',
    createdCount: 1,
    stops: [
      { ...STOP_TEMPLATES.nguhanhson, badges: [...STOP_TEMPLATES.nguhanhson.badges] },
      { ...STOP_TEMPLATES.sontra, badges: [...STOP_TEMPLATES.sontra.badges] },
      { ...STOP_TEMPLATES.caurong, badges: [...STOP_TEMPLATES.caurong.badges] }
    ]
  },
  quiz: {
    currentQuestion: 0,
    selectedOption: null,
    answeredCurrent: false,
    completedOnce: false,
    score: 0,
    userAnswers: [null, null, null],
    questions: [
      {
        question: 'Cầu Rồng Đà Nẵng chính thức được khánh thành vào năm nào và thường phun lửa, nước vào thời gian nào?',
        options: [
          'Năm 2013 · Phun lửa & nước lúc 21:00 thứ Bảy & Chủ Nhật hàng tuần',
          'Năm 2015 · Phun lửa hàng ngày lúc 20:00',
          'Năm 2010 · Phun lửa vào mùng 1 và ngày rằm hàng tháng',
          'Năm 2018 · Phun lửa lúc 22:00 thứ Sáu'
        ],
        correct: 0,
        explanation: 'Cầu Rồng được khánh thành ngày 29/03/2013 nhân kỷ niệm 38 năm giải phóng Đà Nẵng, trình diễn phun lửa và nước lúc 21:00 cuối tuần.'
      },
      {
        question: 'Bán đảo Sơn Trà được mệnh danh là vương quốc của loài linh trưởng quý hiếm nào trong Sách Đỏ?',
        options: [
          'Vượn đen má vàng',
          'Voọc chà vá chân nâu (Nữ hoàng linh trưởng)',
          'Khỉ đuôi dài Sơn Trà',
          'Cu li nhỏ'
        ],
        correct: 1,
        explanation: 'Voọc chà vá chân nâu được mệnh danh là "Nữ hoàng linh trưởng" và là loài đặc hữu biểu tượng sinh thái của bán đảo Sơn Trà.'
      },
      {
        question: 'Ngọn núi đá vôi nào lớn nhất và tập trung nhiều hang động, chùa chiền cổ kính nhất tại Danh thắng Ngũ Hành Sơn?',
        options: [
          'Kim Sơn',
          'Mộc Sơn',
          'Thủy Sơn',
          'Hỏa Sơn'
        ],
        correct: 2,
        explanation: 'Thủy Sơn là ngọn núi lớn và cao nhất tại Ngũ Hành Sơn, nơi hội tụ chùa Tam Thai, chùa Linh Ứng Non Nước và động Huyền Không.'
      }
    ]
  },
  placesData: {
    sontra: {
      key: 'sontra',
      tag: 'THIÊN NHIÊN HOANG DÃ (MÔ PHỎNG)',
      name: 'BÁN ĐẢO SƠN TRÀ',
      area: 'Sơn Trà',
      img: 'assets/son_tra.jpg',
      hours: '06:00 - 18:30 (Hàng ngày)',
      ticket: 'Miễn phí vé tham quan',
      desc: 'Bán đảo Sơn Trà là khu bảo tồn thiên nhiên tuyệt đẹp nằm cách trung tâm Đà Nẵng 10km về hướng Đông Bắc. Nơi đây sở hữu cung đường ven biển hùng vĩ, Chùa Linh Ứng với tượng Phật Quan Âm 67m ngắm trọn thành phố và đỉnh Bàn Cờ.'
    },
    caurong: {
      key: 'caurong',
      tag: 'BIỂU TƯỢNG KIẾN TRÚC HIỆN ĐẠI (MÔ PHỎNG)',
      name: 'CẦU RỒNG ĐÀ NẴNG',
      area: 'Hải Châu',
      img: 'assets/cau_rong.jpg',
      hours: 'Mở cả ngày · Phun lửa 21:00 cuối tuần',
      ticket: 'Miễn phí',
      desc: 'Chiếc cầu thép có hình dáng rồng vươn ra Biển Đông dài 666m. Vào lúc 21h tối thứ Bảy và Chủ Nhật, du khách có thể chiêm ngưỡng màn trình diễn phun lửa và phun nước bên bờ sông Hàn.'
    },
    nguhanhson: {
      key: 'nguhanhson',
      tag: 'DI TÍCH LỊCH SỬ VĂN HÓA (MÔ PHỎNG)',
      name: 'DANH THẮNG NGŨ HÀNH SƠN',
      area: 'Ngũ Hành Sơn',
      img: 'assets/ngu_hanh_son.jpg',
      hours: '07:00 - 17:30',
      ticket: '40.000 VNĐ / Người',
      desc: 'Quần thể 5 ngọn núi đá vôi mang tên hệ Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) với các hang động huyền bí như động Huyền Không, động Âm Phủ cùng làng đá mỹ nghệ Non Nước truyền thống.'
    },
    baotang: {
      key: 'baotang',
      tag: 'LỊCH SỬ & DI SẢN ĐÔ THỊ (MÔ PHỎNG)',
      name: 'BẢO TÀNG ĐÀ NẴNG',
      area: 'Hải Châu',
      img: 'assets/bao_tang_dn.jpg',
      hours: '08:00 - 17:00',
      ticket: '20.000 VNĐ / Người',
      desc: 'Nơi tái hiện sinh động chiều dài lịch sử, văn hóa của Đà Nẵng và xứ Quảng. Không gian trong nhà mát mẻ, trưng bày khoa học, là điểm đến lý tưởng cho mọi điều kiện thời tiết.'
    }
  }
};

// Switching Views
function switchView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const activePanel = document.getElementById(`view-${viewName}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }

  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const navKey = viewName === 'itinerary-create' ? 'itinerary' : viewName;
  const activeNav = document.getElementById(`nav-${navKey}`);
  if (activeNav) activeNav.classList.add('active');

  if (viewName === 'itinerary') {
    renderItineraryTimeline();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toast Alert
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('brutal-toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.style.display = 'block';
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

// Modal helper
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = 'flex';
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = 'none';
}

// Toggle Auth Sub-screens 
function toggleAuthSub(type) {
  document.getElementById('auth-box-login').style.display = type === 'login' ? 'block' : 'none';
  document.getElementById('auth-box-register').style.display = type === 'register' ? 'block' : 'none';
  document.getElementById('auth-box-forgot').style.display = type === 'forgot' ? 'block' : 'none';
}

function syncAuthButton() {
  const btn = document.getElementById('auth-state-btn');
  if (!btn) return;
  const loggedIn = state.user.isLoggedIn;
  btn.textContent = loggedIn ? `${state.user.name.toUpperCase()} ✓` : 'ĐĂNG NHẬP';
  btn.classList.remove('brutal-btn-yellow', 'brutal-btn-green');
  btn.classList.toggle('brutal-btn-ochre', !loggedIn);
  btn.classList.toggle('brutal-btn-sage', loggedIn);
  btn.setAttribute('aria-label', loggedIn ? `Mở hồ sơ của ${state.user.name}` : 'Đăng nhập');
  btn.title = loggedIn ? 'Xem hồ sơ cá nhân' : 'Đăng nhập';
}

function openAccount() {
  if (!state.user.isLoggedIn) toggleAuthSub('login');
  switchView(state.user.isLoggedIn ? 'profile' : 'auth');
}

function doLogin() {
  state.user.isLoggedIn = true;
  syncAuthButton();
  showToast(`Đăng nhập mô phỏng thành công! Chào mừng ${state.user.name}.`);
  switchView('home');
}

function doQuickDemoLogin() {
  doLogin();
  switchView('home');
}

function doLogout() {
  state.user.isLoggedIn = false;
  syncAuthButton();
  toggleAuthSub('login');
  showToast('Đã đăng xuất phiên mô phỏng.');
  switchView('auth');
}

// Places and Filters 
function filterPlaces(category) {
  const cards = document.querySelectorAll('.place-card-item');
  cards.forEach(c => {
    if (category === 'all' || c.getAttribute('data-cat') === category) {
      c.style.display = 'block';
    } else {
      c.style.display = 'none';
    }
  });
  const catNames = { all: 'TẤT CẢ (4)', nature: 'THIÊN NHIÊN', culture: 'VĂN HÓA & LỊCH SỬ', icon: 'BIỂU TƯỢNG' };
  showToast(`Đã lọc danh mục địa điểm: ${catNames[category] || category.toUpperCase()}`);
}

function selectExploreArea(chipEl, areaName) {
  state.explore.area = areaName;
  const container = document.getElementById('explore-area-chips');
  if (container) {
    container.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('active'));
  }
  chipEl.classList.add('active');
  applyExploreFilter(false);
}

function searchFilter(queryValue) {
  state.explore.query = (queryValue || '').trim().toLowerCase();
  applyExploreFilter(false);
}

function applyExploreFilter(withToast = true) {
  const pinIds = [
    { id: 'pin-sontra', name: 'bán đảo sơn trà chùa linh ứng đỉnh bàn cờ', area: 'Sơn Trà' },
    { id: 'pin-caurong', name: 'cầu rồng đà nẵng sông hàn', area: 'Hải Châu' },
    { id: 'pin-nguhanhson', name: 'danh thắng ngũ hành sơn thủy sơn', area: 'Ngũ Hành Sơn' },
    { id: 'pin-baotang', name: 'bảo tàng đà nẵng di sản', area: 'Hải Châu' }
  ];

  let visibleCount = 0;
  pinIds.forEach(pin => {
    const el = document.getElementById(pin.id);
    if (!el) return;
    const matchQuery = !state.explore.query || pin.name.includes(state.explore.query) || pin.area.toLowerCase().includes(state.explore.query);
    const matchArea = state.explore.area === 'Tất cả' || pin.area === state.explore.area;
    if (matchQuery && matchArea) {
      el.style.display = 'block';
      visibleCount++;
    } else {
      el.style.display = 'none';
    }
  });

  const summaryBox = document.getElementById('explore-filtered-results');
  if (summaryBox) {
    summaryBox.innerHTML = `Đang hiển thị: <strong>${visibleCount} / 4 địa điểm tiêu biểu</strong> (Khu vực: ${state.explore.area}).`;
  }
  const applyBtn = document.getElementById('explore-apply-btn');
  if (applyBtn) {
    applyBtn.innerText = `ÁP DỤNG BỘ LỌC (${visibleCount} ĐIỂM PHÙ HỢP)`;
  }
  if (withToast) {
    showToast(`Đã lọc bản đồ mô phỏng: ${visibleCount} địa điểm phù hợp.`);
  }
}

function resetExploreFilter() {
  window.dispatchEvent(new Event('danangacy:map-reset'));
  state.explore.query = '';
  state.explore.area = 'Tất cả';
  const input = document.getElementById('explore-search-input');
  if (input) input.value = '';
  const container = document.getElementById('explore-area-chips');
  if (container) {
    container.querySelectorAll('.chip-btn').forEach((c, idx) => {
      c.classList.toggle('active', idx === 0);
    });
  }
  applyExploreFilter(false);
  showToast('Đã làm mới tọa độ và bộ lọc bản đồ mô phỏng!');
}

function openPlaceDetail(placeKey) {
  const p = state.placesData[placeKey];
  if (!p) return;
  state.currentPlaceModalKey = placeKey;
  document.getElementById('modal-place-tag').innerText = p.tag;
  document.getElementById('modal-place-name').innerText = p.name;
  document.getElementById('modal-place-img').src = p.img;
  document.getElementById('modal-place-hours').innerText = p.hours;
  document.getElementById('modal-place-ticket').innerText = p.ticket;
  document.getElementById('modal-place-desc').innerText = p.desc;
  openModal('modal-place-detail');
}

function renderSavedPlacesList() {
  const badge = document.getElementById('saved-count-badge');
  if (badge) badge.innerText = `${state.user.savedPlaces.length} ĐÃ LƯU`;

  const list = document.getElementById('saved-places-list');
  if (!list) return;

  const lookup = {
    'Bán đảo Sơn Trà': { key: 'sontra', img: 'assets/son_tra.jpg', code: '' },
    'Cầu Rồng Đà Nẵng': { key: 'caurong', img: 'assets/cau_rong.jpg', code: '' },
    'Ngũ Hành Sơn': { key: 'nguhanhson', img: 'assets/ngu_hanh_son.jpg', code: '' },
    'Bảo tàng Đà Nẵng': { key: 'baotang', img: 'assets/bao_tang_dn.jpg', code: '' }
  };

  list.innerHTML = state.user.savedPlaces.map(placeName => {
    const info = lookup[placeName] || { key: 'sontra', img: 'assets/son_tra.jpg', code: '' };
    return `
      <div class="brutal-card" style="padding:12px; display:flex; justify-content:space-between; align-items:center; background:#FFFDF0;">
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="${info.img}" style="width:50px; height:50px; object-fit:cover; border:2px solid var(--border-color); filter:sepia(15%);">
          <div>
            <h4 style="font-family:var(--font-heading); font-size:16px; font-weight:900;">${placeName.toUpperCase()}</h4>
            <div style="font-family:var(--font-body); font-size:11px; color:#5D564C;">Đã lưu trong hồ sơ mô phỏng</div>
          </div>
        </div>
        <button class="brutal-btn brutal-btn-sm brutal-btn-ochre" onclick="openPlaceDetail('${info.key}')">XEM (${info.code})</button>
      </div>
    `;
  }).join('');
}

function savePlace(placeName) {
  if (!state.user.savedPlaces.includes(placeName)) {
    state.user.savedPlaces.push(placeName);
    renderSavedPlacesList();
    showToast(`Đã lưu "${placeName}" vào danh sách yêu thích! `);
  } else {
    showToast(`"${placeName}" đã có sẵn trong danh sách lưu!`);
  }
}

function addCurrentPlaceToItinerary() {
  const key = state.currentPlaceModalKey;
  closeModal('modal-place-detail');
  const templateKey = key === 'baotang' ? 'baotang_noon' : key;
  const tpl = STOP_TEMPLATES[templateKey];
  if (tpl && !state.itinerary.stops.some(s => s.key === tpl.key)) {
    state.itinerary.stops.push({ ...tpl, badges: [...tpl.badges] });
    state.itinerary.stops.sort((a, b) => a.start.localeCompare(b.start));
  }
  renderItineraryTimeline();
  showToast('Đã thêm điểm tham quan vào lịch trình mô phỏng! ');
  switchView('itinerary');
}

// Booking Ticket 
function openBookingTicketModal() {
  closeModal('modal-place-detail');
  openModal('modal-booking');
}

function confirmTicketBooking() {
  closeModal('modal-booking');
  showToast('Đặt vé mô phỏng thành công! Mã QR mẫu đã được ghi nhận .');
}

// ============================================================================
// FLOW 1: DETERMINISTIC ITINERARY GENERATION 
// ============================================================================
function selectPace(labelElement, paceText) {
  state.itinerary.pace = paceText;
  document.querySelectorAll('input[name="pace"]').forEach(inp => {
    const parent = inp.closest('.quiz-option');
    if (parent) parent.classList.remove('selected');
    inp.checked = false;
  });
  labelElement.classList.add('selected');
  const radio = labelElement.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;

  applyDeterministicDestinationSuggestions();
}

function togglePreferenceChip(chipEl) {
  chipEl.classList.toggle('active');
  const activePrefs = Array.from(document.querySelectorAll('#it-pref-chips .chip-btn.active'))
    .map(el => el.getAttribute('data-pref'))
    .filter(Boolean);
  state.itinerary.preferences = activePrefs;
  applyDeterministicDestinationSuggestions();
}

function applyDeterministicDestinationSuggestions() {
  const pace = state.itinerary.pace;
  const prefs = state.itinerary.preferences;

  const pickNguHanhSon = document.getElementById('pick-nguhanhson');
  const pickSonTra = document.getElementById('pick-sontra');
  const pickCauRong = document.getElementById('pick-caurong');
  const pickBaoTang = document.getElementById('pick-baotang');

  if (!pickNguHanhSon || !pickSonTra || !pickCauRong || !pickBaoTang) return;

  if (pace === 'Thư thả') {
    // 2 stops: prioritize outdoor Son Tra (for rain demo) + 1 culture/icon stop
    pickSonTra.checked = true;
    pickNguHanhSon.checked = prefs.includes('culture') || !prefs.includes('icon');
    pickCauRong.checked = !pickNguHanhSon.checked;
    pickBaoTang.checked = false;
  } else if (pace === 'Vừa phải') {
    // 3 stops: Morning Ngu Hanh Son, Afternoon Son Tra (Outdoor), Evening Cau Rong
    pickNguHanhSon.checked = true;
    pickSonTra.checked = true;
    pickCauRong.checked = true;
    pickBaoTang.checked = false;
  } else {
    // Khám phá tối đa: all 4 stops
    pickNguHanhSon.checked = true;
    pickBaoTang.checked = true;
    pickSonTra.checked = true;
    pickCauRong.checked = true;
  }

  updateItineraryPreview();
}

function updateItineraryPreview() {
  const checkedCount = ['pick-nguhanhson', 'pick-baotang', 'pick-sontra', 'pick-caurong']
    .filter(id => document.getElementById(id)?.checked).length;
  const previewBox = document.getElementById('it-create-preview-box');
  const hasSonTra = document.getElementById('pick-sontra')?.checked;
  if (previewBox) {
    previewBox.innerHTML = `✦ <strong>Dự kiến mô phỏng (${state.itinerary.pace}):</strong> ${checkedCount} điểm đến đã chọn ${hasSonTra ? '· Có điểm ngoài trời Sơn Trà (14:00 - 16:30) hỗ trợ mô phỏng tránh mưa .' : '· Tất cả điểm đến đã sẵn sàng sắp xếp khung giờ.'}`;
  }
}

function formatDateVN(isoDate) {
  if (!isoDate || !isoDate.includes('-')) return '20/11/2026';
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

async function generateAndSaveItinerary() {
  if (state.planning) return;
  const titleInput = document.getElementById('it-title');
  const dateInput = document.getElementById('it-date');
  const peopleSelect = document.getElementById('it-people');

  const pickedKeys = [];
  if (document.getElementById('pick-nguhanhson')?.checked) pickedKeys.push('nguhanhson');
  if (document.getElementById('pick-baotang')?.checked) pickedKeys.push('baotang_noon');
  if (document.getElementById('pick-sontra')?.checked) pickedKeys.push('sontra');
  if (document.getElementById('pick-caurong')?.checked) pickedKeys.push('caurong');

  if (pickedKeys.length === 0) {
    showToast('⚠ Vui lòng chọn ít nhất 1 điểm đến ở Bước 3 !');
    return;
  }

  let result;
  state.planning = true;
  showToast('Đang tạo lịch trình, vui lòng chờ…');
  try {
    result = await api('/itineraries', {
      date: dateInput?.value || new Date().toISOString().slice(0, 10),
      destinations: pickedKeys,
      people: Number(peopleSelect?.value || 2),
      pace: ({ 'Thư thả': 'Chậm rãi', 'Khám phá tối đa': 'Năng động' })[state.itinerary.pace] || 'Vừa phải',
    });
  } catch (error) {
    showToast(error.message);
    return;
  } finally {
    state.planning = false;
  }
  state.itinerary.title = (titleInput?.value || 'Khám phá Di sản Đà Nẵng').trim();
  state.itinerary.date = dateInput?.value || '2026-11-20';
  state.itinerary.people = peopleSelect?.options[peopleSelect.selectedIndex]?.text || '2 Người';
  state.itinerary.rainAvoidanceApplied = false;
  state.itinerary.rainIgnored = false;
  state.itinerary.stops = result.stops;
  state.itinerary.source = result.source;
  state.itinerary.warning = result.warning || null;
  state.itinerary.createdCount += 1;

  const profileItinEl = document.getElementById('profile-itineraries-val');
  if (profileItinEl) {
    profileItinEl.innerText = `${state.itinerary.createdCount} Lịch trình `;
  }

  renderItineraryTimeline();
  syncWeatherViewUI();
  showToast(result.warning || `Đã tạo lịch trình ${result.source === 'gemini' ? 'bằng Gemini' : 'mẫu'} "${state.itinerary.title}" (${state.itinerary.stops.length} điểm đến)!`);
  switchView('itinerary');
}

function renderItineraryTimeline() {
  const stops = state.itinerary.stops;
  const titleEl = document.getElementById('active-itinerary-title');
  const metaEl = document.getElementById('active-itinerary-meta');
  const listEl = document.getElementById('timeline-list');
  const statsEl = document.getElementById('itinerary-overview-stats');
  const weatherBanner = document.getElementById('itinerary-weather-banner');

  if (titleEl) {
    titleEl.innerText = `${state.itinerary.title.toUpperCase()} (${stops.length} ĐIỂM)`;
  }
  if (metaEl) {
    metaEl.innerText = `NGÀY 1 · ${formatDateVN(state.itinerary.date)} · NHỊP ĐỘ ${state.itinerary.pace.toUpperCase()} · ${state.itinerary.source === 'gemini' ? 'TẠO BẰNG GEMINI' : 'LỊCH TRÌNH MẪU'}`;
  }

  // Update Weather Banner inside Itinerary Detail
  if (weatherBanner) {
    const hasVulnerableStop = stops.some(s => s.rainVulnerable);
    if (state.itinerary.rainAvoidanceApplied) {
      const rep = WEATHER_REPLACEMENTS[state.itinerary.selectedReplacementKey];
      weatherBanner.style.background = '#EBF3EB';
      weatherBanner.style.borderColor = 'var(--vintage-sage)';
      weatherBanner.innerHTML = `
        <div style="font-family:var(--font-body); font-size:13px; font-weight:700; color:#1E1B18;">
          ✓ <strong>:</strong> Đã chuyển điểm ngoài trời 14:00 - 16:30 sang <strong>${rep.name}</strong> (Trong nhà 100%).
        </div>
        <button class="brutal-btn brutal-btn-sm brutal-btn-white" onclick="resetWeatherSimulation()">↺ Hoàn tác</button>
      `;
    } else if (hasVulnerableStop) {
      weatherBanner.style.background = '#FDF3E5';
      weatherBanner.style.borderColor = 'var(--vintage-terracotta)';
      weatherBanner.innerHTML = `
        <div style="font-family:var(--font-body); font-size:13px; font-weight:700; color:#3D372E;">
          🌧 <strong>:</strong> Dự báo có mưa lớn 14:00 - 17:00 tại Bán đảo Sơn Trà (Ngoài trời).
        </div>
        <button class="brutal-btn brutal-btn-sm brutal-btn-terracotta" onclick="simulateRainTrigger()">XEM ĐỀ XUẤT TRÁNH MƯA ➜</button>
      `;
    } else {
      weatherBanner.style.background = '#FFFDF0';
      weatherBanner.style.borderColor = 'var(--border-color)';
      weatherBanner.innerHTML = `
        <div style="font-family:var(--font-body); font-size:13px; font-weight:700; color:#3D372E;">
          ☀ <strong>[MÔ PHỎNG THỜI TIẾT]:</strong> Lịch trình hiện tại không có điểm ngoài trời trùng khung giờ mưa 14:00 - 17:00.
        </div>
        <button class="brutal-btn brutal-btn-sm brutal-btn-ochre" onclick="simulateRainTrigger()">MỞ MÔ PHỎNG MƯA </button>
      `;
    }
  }

  if (listEl) {
    listEl.innerHTML = stops.map((stop, idx) => {
      const badgesHtml = (stop.badges || [])
        .map(b => `<span class="brutal-badge ${b.cls}">${b.text}</span>`)
        .join('');
      return `
        <div class="timeline-item" id="timeline-item-${idx + 1}">
          <div class="timeline-dot" style="background:${stop.dotColor || 'var(--vintage-terracotta)'};">${idx + 1}</div>
          <div class="brutal-card" style="padding:16px;" id="item-${idx + 1}-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
              <div>
                <span class="brutal-badge ${stop.timeBadgeClass || 'badge-sage'}" id="item-${idx + 1}-time">${stop.start} - ${stop.end}</span>
                <h4 style="font-family:var(--font-heading); font-size:18px; font-weight:900; margin-top:4px;" id="item-${idx + 1}-title">${stop.title}</h4>
                <p style="font-family:var(--font-body); font-size:13px; color:#4E483F; margin-top:4px; line-height:1.5;" id="item-${idx + 1}-desc">${stop.desc}</p>
              </div>
              <img src="${stop.img}" id="item-${idx + 1}-img" style="width:70px; height:70px; object-fit:cover; border:2px solid var(--border-color); box-shadow:2px 2px 0px var(--border-color); filter:sepia(15%);">
            </div>
            <div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:8px;" id="item-${idx + 1}-badges">
              ${badgesHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (statsEl) {
    const totalDist = stops.reduce((acc, s) => acc + (s.distanceKm || 5), 0).toFixed(1);
    const totalHours = stops.reduce((acc, s) => acc + (s.durationHours || 2), 0);
    const totalCost = stops.reduce((acc, s) => acc + (s.ticketCost || 0), 0);
    const weatherStatus = state.itinerary.rainAvoidanceApplied
      ? '<strong style="color:var(--vintage-sage);">Đã thay điểm trong nhà </strong>'
      : state.itinerary.rainIgnored
        ? '<strong style="color:var(--vintage-amber);">Giữ nguyên điểm ngoài trời</strong>'
        : '<strong style="color:var(--vintage-terracotta);">Cảnh báo mưa 14:00 (Mô phỏng)</strong>';

    statsEl.innerHTML = `
      <div>• Số điểm tham quan: <strong>${stops.length} địa điểm</strong></div>
      <div>• Nhịp độ & Quy mô: <strong>${state.itinerary.pace} · ${state.itinerary.people.split(' ')[0]} người</strong></div>
      <div>• Tổng cự ly dự kiến: <strong>${totalDist} km (Mô phỏng)</strong></div>
      <div>• Thời gian hoạt động: <strong>${totalHours} giờ</strong></div>
      <div>• Ngân sách vé tham quan: <strong>${totalCost.toLocaleString('vi-VN')} VNĐ / người</strong></div>
      <div>• Trạng thái thời tiết: ${weatherStatus}</div>
    `;
  }
}

// Time Edit & Conflict Check 
function timeToMinutes(hhmm) {
  if (!hhmm || !/^\d{2}:\d{2}$/.test(hhmm)) return -1;
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function openEditScreenC07() {
  openTimeEditModal();
}

function openTimeEditModal() {
  const select = document.getElementById('edit-stop-index');
  if (select) {
    select.innerHTML = state.itinerary.stops.map((s, idx) =>
      `<option value="${idx}" ${idx === Math.min(1, state.itinerary.stops.length - 1) ? 'selected' : ''}>Điểm ${idx + 1}: ${s.title} (${s.start} - ${s.end})</option>`
    ).join('');
  }
  onSelectStopToEdit();
  openModal('modal-time-edit');
}

function onSelectStopToEdit() {
  const select = document.getElementById('edit-stop-index');
  const idx = Number(select?.value || 0);
  const stop = state.itinerary.stops[idx] || state.itinerary.stops[0];
  if (!stop) return;
  document.getElementById('edit-time-start').value = stop.start;
  document.getElementById('edit-time-end').value = stop.end;
  checkTimeConflict();
}

function checkTimeConflict() {
  const select = document.getElementById('edit-stop-index');
  const idx = Number(select?.value || 0);
  const start = document.getElementById('edit-time-start').value;
  const end = document.getElementById('edit-time-end').value;
  const alertBox = document.getElementById('conflict-alert-box');
  if (!alertBox) return false;

  const startMin = timeToMinutes(start);
  const endMin = timeToMinutes(end);

  if (startMin < 0 || endMin < 0 || startMin >= endMin) {
    alertBox.style.display = 'block';
    alertBox.innerText = '⚠  InvalidRange: Giờ kết thúc phải lớn hơn giờ bắt đầu!';
    return false;
  }
  if (startMin < 360 || endMin > 1320) {
    alertBox.style.display = 'block';
    alertBox.innerText = '⚠  HoursWarning: Khung giờ nằm ngoài thời gian mở cửa khuyến nghị (06:00 - 22:00)!';
    return false;
  }

  const conflictStop = state.itinerary.stops.find((other, otherIdx) => {
    if (otherIdx === idx) return false;
    const oStart = timeToMinutes(other.start);
    const oEnd = timeToMinutes(other.end);
    return startMin < oEnd && endMin > oStart;
  });

  if (conflictStop) {
    alertBox.style.display = 'block';
    alertBox.innerText = `⚠  Conflict: Khung giờ này bị trùng với "${conflictStop.title}" (${conflictStop.start} - ${conflictStop.end})!`;
    return false;
  }

  alertBox.style.display = 'none';
  return true;
}

function saveNewTimeSlot() {
  if (!checkTimeConflict()) {
    showToast('⚠ Khung giờ chưa hợp lệ hoặc bị trùng lặp. Vui lòng kiểm tra lại!');
    return;
  }
  const select = document.getElementById('edit-stop-index');
  const idx = Number(select?.value || 0);
  const start = document.getElementById('edit-time-start').value;
  const end = document.getElementById('edit-time-end').value;

  if (state.itinerary.stops[idx]) {
    state.itinerary.stops[idx].start = start;
    state.itinerary.stops[idx].end = end;
  }
  renderItineraryTimeline();
  closeModal('modal-time-edit');
  showToast(`Đã cập nhật khung giờ ${start} - ${end} thành công! `);
}

// ============================================================================
// FLOW 2: SIMULATED RAIN AVOIDANCE 
// ============================================================================
function simulateRainTrigger() {
  syncWeatherViewUI();
  switchView('weather');
  showToast;
}

function selectReplacementOption(repKey) {
  if (!WEATHER_REPLACEMENTS[repKey]) return;
  state.itinerary.selectedReplacementKey = repKey;

  document.getElementById('rep-opt-baotang')?.classList.toggle('active', repKey === 'baotang');
  document.getElementById('rep-opt-cham')?.classList.toggle('active', repKey === 'cham');

  syncWeatherViewUI();
}

function syncWeatherViewUI() {
  const rep = WEATHER_REPLACEMENTS[state.itinerary.selectedReplacementKey] || WEATHER_REPLACEMENTS.baotang;
  const titleEl = document.getElementById('weather-replace-title');
  const descEl = document.getElementById('weather-replace-desc');
  const imgEl = document.getElementById('weather-replace-img');
  const benefitEl = document.getElementById('weather-replace-benefit');
  const resetBtn = document.getElementById('btn-reset-weather');
  const confirmBtn = document.getElementById('btn-confirm-weather-replace');

  if (titleEl) titleEl.innerText = rep.name;
  if (descEl) descEl.innerText = rep.desc;
  if (imgEl) imgEl.src = rep.img;
  if (benefitEl) benefitEl.innerText = rep.benefit;

  if (resetBtn) {
    resetBtn.style.display = state.itinerary.rainAvoidanceApplied ? 'inline-flex' : 'none';
  }
  if (confirmBtn) {
    confirmBtn.innerText = state.itinerary.rainAvoidanceApplied
      ? `ĐÃ ÁP DỤNG: ${rep.name}  ✓`
      : 'ÁP DỤNG THAY THẾ NÀY () ➜';
  }
}

function confirmWeatherReplacement() {
  const rep = WEATHER_REPLACEMENTS[state.itinerary.selectedReplacementKey] || WEATHER_REPLACEMENTS.baotang;

  let targetIdx = state.itinerary.stops.findIndex(s => s.key === 'sontra' || s.rainVulnerable);
  if (targetIdx === -1) {
    targetIdx = Math.min(1, state.itinerary.stops.length - 1);
  }

  if (targetIdx >= 0 && state.itinerary.stops[targetIdx]) {
    const preservedStart = state.itinerary.stops[targetIdx].start;
    const preservedEnd = state.itinerary.stops[targetIdx].end;

    state.itinerary.stops[targetIdx] = {
      key: rep.key,
      start: preservedStart,
      end: preservedEnd,
      title: rep.timelineTitle,
      desc: rep.timelineDesc,
      img: rep.img,
      dotColor: 'var(--vintage-sage)',
      timeBadgeClass: 'badge-sage',
      ticketCost: rep.ticketCost,
      distanceKm: 4.5,
      durationHours: 2.5,
      isOutdoor: false,
      rainVulnerable: false,
      replacedFromSonTra: true,
      badges: [
        { text: '✓ ĐÃ THAY THẾ TRÁNH MƯA ', cls: 'badge-sage' },
        { text: 'TRONG NHÀ 100%', cls: 'badge-teal' },
        { text: `VÉ: ${rep.ticketCost.toLocaleString('vi-VN')} VNĐ`, cls: 'badge-ochre' }
      ]
    };
  }

  state.itinerary.rainAvoidanceApplied = true;
  state.itinerary.rainIgnored = false;
  renderItineraryTimeline();
  syncWeatherViewUI();
  showToast(`✓ Đã thay thế Sơn Trà bằng "${rep.name}" (Giữ nguyên giờ 14:00 - 16:30) theo mô phỏng tránh mưa !`);
  switchView('itinerary');
}

function skipWeatherReplacement() {
  state.itinerary.rainIgnored = true;
  renderItineraryTimeline();
  showToast('Đã giữ nguyên địa điểm ngoài trời theo lựa chọn của bạn.');
  switchView('itinerary');
}

function resetWeatherSimulation() {
  const idx = state.itinerary.stops.findIndex(s => s.replacedFromSonTra);
  if (idx !== -1) {
    const preservedStart = state.itinerary.stops[idx].start;
    const preservedEnd = state.itinerary.stops[idx].end;
    state.itinerary.stops[idx] = {
      ...STOP_TEMPLATES.sontra,
      start: preservedStart,
      end: preservedEnd,
      badges: [...STOP_TEMPLATES.sontra.badges]
    };
  }
  state.itinerary.rainAvoidanceApplied = false;
  state.itinerary.rainIgnored = false;
  renderItineraryTimeline();
  syncWeatherViewUI();
  showToast('↺ Đã hoàn tác mô phỏng tránh mưa, khôi phục điểm đến Bán đảo Sơn Trà.');
}

// ============================================================================
// FLOW 3: THREE-QUESTION HERITAGE QUIZ 
// ============================================================================
function renderQuiz() {
  const total = state.quiz.questions.length; // 3 questions
  const currentIdx = state.quiz.currentQuestion;
  const q = state.quiz.questions[currentIdx];

  document.getElementById('quiz-question-number').innerText = `CÂU HỎI ${currentIdx + 1} / ${total} ()`;
  document.getElementById('quiz-question-title').innerText = q.question;
  document.getElementById('quiz-score-badge').innerText = state.quiz.score;

  // Update 3-step progress bar
  const progressBar = document.getElementById('quiz-progress-bar');
  if (progressBar) {
    progressBar.innerHTML = state.quiz.questions.map((_, idx) => {
      let bg = 'var(--bg-card-alt)';
      if (idx < currentIdx) bg = 'var(--vintage-sage)';
      else if (idx === currentIdx) bg = 'var(--vintage-ochre)';
      return `<div style="height:10px; border:2px solid var(--border-color); background:${bg};"></div>`;
    }).join('');
  }

  state.quiz.selectedOption = null;
  state.quiz.answeredCurrent = false;

  const container = document.getElementById('quiz-options-container');
  container.innerHTML = '';

  q.options.forEach((optText, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.innerHTML = `<span style="display:inline-block; width:26px; height:26px; border:2px solid #000; text-align:center; line-height:22px; font-weight:900; margin-right:8px; background:#fff; color:#1E1B18;">${String.fromCharCode(65 + index)}</span> ${optText}`;
    btn.onclick = () => selectQuizOption(index, btn);
    container.appendChild(btn);
  });

  document.getElementById('quiz-feedback-box').innerText = `Chọn 1 đáp án để xác nhận `;
  const actionBtn = document.getElementById('quiz-action-btn');
  actionBtn.innerText = 'XÁC NHẬN ĐÁP ÁN ';
  actionBtn.disabled = false;
}

function selectQuizOption(index, btnElement) {
  if (state.quiz.answeredCurrent || state.quiz.pending) return;
  state.quiz.selectedOption = index;
  document.querySelectorAll('#quiz-options-container .quiz-option').forEach(el => el.classList.remove('selected'));
  btnElement.classList.add('selected');
  document.getElementById('quiz-feedback-box').innerText = 'Đã chọn đáp án. Bấm "XÁC NHẬN ĐÁP ÁN" ';
}

function submitQuizAnswer() {
  if (state.quiz.answeredCurrent) {
    state.quiz.currentQuestion++;
    if (state.quiz.currentQuestion < state.quiz.questions.length) renderQuiz();
    else finishQuiz();
    return;
  }
  if (state.quiz.selectedOption === null) {
    showToast('⚠ Vui lòng chọn một đáp án trước khi xác nhận!');
    return;
  }
  if (state.quiz.answeredCurrent || state.quiz.pending) return;
  state.quiz.answeredCurrent = true;

  const currentIdx = state.quiz.currentQuestion;
  const total = state.quiz.questions.length;
  const q = state.quiz.questions[currentIdx];
  const options = document.querySelectorAll('#quiz-options-container .quiz-option');
  // Local mock quiz: no network or Gemini request is needed for grading.
  const isCorrect = state.quiz.selectedOption === q.correct;

  state.quiz.userAnswers[currentIdx] = state.quiz.selectedOption;

  if (isCorrect) {
    options[state.quiz.selectedOption].classList.add('correct');
    state.quiz.score++;
    document.getElementById('quiz-score-badge').innerText = state.quiz.score;
    document.getElementById('quiz-feedback-box').innerHTML = `✓ <strong style="color:var(--vintage-sage);">CHÍNH XÁC !</strong> ${q.explanation}`;
  } else {
    options[state.quiz.selectedOption].classList.add('wrong');
    options[q.correct].classList.add('correct');
    document.getElementById('quiz-feedback-box').innerHTML = `✗ <strong style="color:var(--vintage-rose);">CHƯA ĐÚNG !</strong> Đáp án đúng là ${String.fromCharCode(65 + q.correct)}. ${q.explanation}`;
  }

  const actionBtn = document.getElementById('quiz-action-btn');
  actionBtn.innerText = currentIdx < total - 1 ? 'CÂU TIẾP THEO ➜' : 'XEM KẾT QUẢ 3 CÂU  ➜';
}

function finishQuiz() {
  const total = state.quiz.questions.length;
  document.getElementById('quiz-main-card').style.display = 'none';
  document.getElementById('quiz-result-card').style.display = 'block';

  const scoreLine = document.getElementById('quiz-result-score-line');
  if (scoreLine) {
    scoreLine.innerText = `KẾT QUẢ: ĐÚNG ${state.quiz.score}/${total} CÂU HỎI DI SẢN`;
  }

  const rewardBadge = document.getElementById('quiz-result-reward-badge');
  if (!state.quiz.completedOnce) {
    state.user.coins += 500;
    state.quiz.completedOnce = true;
    if (rewardBadge) rewardBadge.innerText = '+500 XU DI SẢN (MÔ PHỎNG)';
    showToast(`Chúc mừng! Bạn trả lời đúng ${state.quiz.score}/${total} câu và nhận +500 Xu Di Sản mô phỏng !`);
  } else {
    if (rewardBadge) rewardBadge.innerText = 'ĐÃ NHẬN 500 XU LẦN ĐẦU (MÔ PHỎNG)';
    showToast(`Hoàn thành lượt chơi lại: Đúng ${state.quiz.score}/${total} câu hỏi di sản!`);
  }

  document.getElementById('game-coin-display').innerText = state.user.coins;
  document.getElementById('profile-coins-val').innerText = `${state.user.coins} XU`;
}

function reviewQuizAnswers() {
  const reviewCard = document.getElementById('quiz-review-card');
  const reviewList = document.getElementById('quiz-review-list');
  if (!reviewCard || !reviewList) return;

  reviewList.innerHTML = state.quiz.questions.map((q, idx) => {
    const picked = state.quiz.userAnswers[idx];
    const isCorrect = picked === q.correct;
    const pickedText = picked !== null && picked !== undefined
      ? `${String.fromCharCode(65 + picked)}. ${q.options[picked]}`
      : 'Chưa trả lời';
    const correctText = `${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]}`;
    return `
      <div class="brutal-card" style="padding:14px; background:#FFFDF0;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span class="brutal-badge ${isCorrect ? 'badge-sage' : 'badge-rose'}">CÂU ${idx + 1}/3 · ${isCorrect ? 'ĐÚNG ✓' : 'CHƯA ĐÚNG ✗'}</span>
        </div>
        <h4 style="font-family:var(--font-heading); font-size:15px; font-weight:900; margin-bottom:8px;">${q.question}</h4>
        <div style="font-family:var(--font-body); font-size:13px; margin-bottom:4px;">
          • <strong>Bạn chọn:</strong> <span style="color:${isCorrect ? 'var(--vintage-sage)' : 'var(--vintage-rose)'}; font-weight:700;">${pickedText}</span>
        </div>
        <div style="font-family:var(--font-body); font-size:13px; margin-bottom:6px;">
          • <strong>Đáp án đúng:</strong> <span style="color:var(--vintage-sage); font-weight:700;">${correctText}</span>
        </div>
        <div style="font-family:var(--font-body); font-size:12px; color:#4E483F; background:var(--bg-card); border:1.5px solid var(--border-color); padding:8px;">
          💡 <strong>Giải thích di sản:</strong> ${q.explanation}
        </div>
      </div>
    `;
  }).join('');

  reviewCard.style.display = 'block';
  reviewCard.scrollIntoView({ behavior: 'smooth' });
  showToast;
}

function resetQuiz() {
  state.quiz.currentQuestion = 0;
  state.quiz.score = 0;
  state.quiz.selectedOption = null;
  state.quiz.answeredCurrent = false;
  state.quiz.userAnswers = [null, null, null];
  document.getElementById('quiz-result-card').style.display = 'none';
  const reviewCard = document.getElementById('quiz-review-card');
  if (reviewCard) reviewCard.style.display = 'none';
  document.getElementById('quiz-main-card').style.display = 'block';
  renderQuiz();
}

// ============================================================================
// REWARDS & PROFILE 
// ============================================================================
function redeemVoucher(title, cost, code) {
  if (state.user.vouchers.includes(code)) {
    showToast(`Bạn đã đổi mã ưu đãi mô phỏng ${code} trước đó rồi!`);
    return;
  }
  if (state.user.coins < cost) {
    showToast(`⚠ Bạn cần ${cost} xu (hiện có ${state.user.coins} xu). Hãy hoàn thành thử thách 3 câu hỏi di sản để nhận thêm 500 xu!`);
    return;
  }

  state.user.coins -= cost;
  state.user.vouchers.push(code);
  state.user.voucherDetails ??= {};
  state.user.voucherDetails[code] = title;
  document.getElementById('game-coin-display').innerText = state.user.coins;
  document.getElementById('profile-coins-val').innerText = `${state.user.coins} XU`;
  document.getElementById('my-vouchers-count').innerText = state.user.vouchers.length;

  const container = document.getElementById('vouchers-list-container');
  const div = document.createElement('div');
  div.style.gridColumn = 'span 6';
  div.innerHTML = `
    <div class="brutal-card" style="background:#FFFDF0; border-style:dashed;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="brutal-badge badge-teal">VỪA ĐỔI MÔ PHỎNG </span>
          <h4 style="font-family:var(--font-heading); font-size:18px; font-weight:900; margin-top:6px;">${title}</h4>
          <div style="font-family:var(--font-mono); font-size:16px; font-weight:900; color:var(--vintage-terracotta); margin-top:4px;">
            MÃ: ${code}
          </div>
        </div>
        <div>
          <button class="brutal-btn brutal-btn-sm brutal-btn-dark" onclick="showToast('Đã sao chép mã mô phỏng ${code}!')">COPY MÃ</button>
        </div>
      </div>
    </div>
  `;
  container.prepend(div);

  showToast(`✓ Đổi ưu đãi mô phỏng thành công (-${cost} xu)! Mã của bạn: ${code} `);
}

function showMyRewardsTab() {
  document.getElementById('my-vouchers-section').scrollIntoView({ behavior: 'smooth' });
}

function openProfileEditModal() {
  document.getElementById('edit-profile-name').value = state.user.name;
  document.getElementById('edit-profile-email').value = state.user.email;
  document.getElementById('edit-profile-phone').value = state.user.phone;
  openModal('modal-profile-edit');
}

function saveProfileEdit() {
  const newName = (document.getElementById('edit-profile-name').value || '').trim();
  const newEmail = (document.getElementById('edit-profile-email').value || '').trim();
  const newPhone = (document.getElementById('edit-profile-phone').value || '').trim();

  if (!newName || !newEmail.includes('@')) {
    showToast('⚠ Vui lòng nhập họ tên và địa chỉ email hợp lệ!');
    return;
  }

  state.user.name = newName;
  state.user.email = newEmail;
  state.user.phone = newPhone || 'Chưa cập nhật';

  document.getElementById('profile-name-val').innerText = state.user.name.toUpperCase();
  document.getElementById('profile-email-val').innerText = state.user.email;
  document.getElementById('profile-phone-val').innerText = state.user.phone;

  syncAuthButton();

  closeModal('modal-profile-edit');
  showToast('✓ Đã lưu thông tin hồ sơ cá nhân mô phỏng !');
}

function toggleChip(el) {
  el.classList.toggle('active');
}

// ============================================================================
// HƯỚNG DẪN GUIDE RUNNER (8 STEPS)
// ============================================================================
// Initializer
export async function initializeApp() {
  // Catalog loads independently; the mock quiz is usable immediately offline.
  api('/catalog').then(catalog => {
    Object.assign(STOP_TEMPLATES, catalog.stops);
    Object.assign(WEATHER_REPLACEMENTS, catalog.replacements);
    state.placesData = catalog.places;
  }).catch(() => {
    // Keep local catalog and quiz defaults when the backend is unavailable.
  });
  try {
    const saved = JSON.parse(localStorage.getItem('danangacy:v1') || 'null');
    if (saved?.version === 1 && saved.user && saved.itinerary) {
      Object.assign(state.user, saved.user);
      Object.assign(state.itinerary, saved.itinerary);
      state.quiz.completedOnce = saved.completedOnce === true;
    }
  } catch { /* Invalid or disabled storage: keep defaults. */ }
  const persist = () => {
    try {
      localStorage.setItem('danangacy:v1', JSON.stringify({version: 1, user: state.user,
        itinerary: state.itinerary, completedOnce: state.quiz.completedOnce}));
    } catch { /* Storage may be unavailable or full. */ }
  };
  // Also captures mutations made by the compatibility controller.
  new MutationObserver(persist).observe(document.getElementById('root'), {
    childList: true, subtree: true, attributes: true, characterData: true,
  });
  window.addEventListener('pagehide', persist);
  for (const [id, value] of Object.entries({
    'profile-name-val': state.user.name.toUpperCase(), 'profile-email-val': state.user.email,
    'profile-phone-val': state.user.phone, 'profile-coins-val': `${state.user.coins} XU`,
    'game-coin-display': state.user.coins, 'my-vouchers-count': state.user.vouchers.length,
  })) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }
  renderQuiz();
  renderItineraryTimeline();
  syncWeatherViewUI();
  renderSavedPlacesList();
  updateItineraryPreview();
  syncAuthButton();
  if (state.user.isLoggedIn) {
    switchView('home');
  } else {
    switchView('auth');
  }
  for (const code of state.user.vouchers.filter(code => code !== 'DN-WELCOME-2026')) {
    const card = document.createElement('div');
    card.className = 'brutal-card';
    card.style.gridColumn = 'span 6';
    card.textContent = `${state.user.voucherDetails?.[code] || '?u ??i ?? ??i'} ? M?: ${code}`;
    document.getElementById('vouchers-list-container').prepend(card);
  }
  try {
    const weather = await api(`/weather?day=${state.itinerary.date}`);
    window.dispatchEvent(new CustomEvent('danangacy:weather', { detail: weather }));
  } catch { showToast('Không tải được thời tiết mẫu. Hãy kiểm tra backend.'); }
}

// Compatibility for controls generated by the existing simulation controller.
Object.assign(window, { switchView, showToast, openModal, closeModal, toggleAuthSub, doLogin, doQuickDemoLogin, doLogout, filterPlaces, selectExploreArea, searchFilter, applyExploreFilter, resetExploreFilter, openPlaceDetail, renderSavedPlacesList, savePlace, addCurrentPlaceToItinerary, openBookingTicketModal, confirmTicketBooking, selectPace, togglePreferenceChip, applyDeterministicDestinationSuggestions, updateItineraryPreview, formatDateVN, generateAndSaveItinerary, renderItineraryTimeline, timeToMinutes, openEditScreenC07, openTimeEditModal, onSelectStopToEdit, checkTimeConflict, saveNewTimeSlot, simulateRainTrigger, selectReplacementOption, syncWeatherViewUI, confirmWeatherReplacement, skipWeatherReplacement, resetWeatherSimulation, renderQuiz, selectQuizOption, submitQuizAnswer, finishQuiz, reviewQuizAnswers, resetQuiz, redeemVoucher, showMyRewardsTab, openProfileEditModal, saveProfileEdit, toggleChip });
export { openAccount, switchView, showToast, openModal, closeModal, toggleAuthSub, doLogin, doQuickDemoLogin, doLogout, filterPlaces, selectExploreArea, searchFilter, applyExploreFilter, resetExploreFilter, openPlaceDetail, renderSavedPlacesList, savePlace, addCurrentPlaceToItinerary, openBookingTicketModal, confirmTicketBooking, selectPace, togglePreferenceChip, applyDeterministicDestinationSuggestions, updateItineraryPreview, formatDateVN, generateAndSaveItinerary, renderItineraryTimeline, timeToMinutes, openEditScreenC07, openTimeEditModal, onSelectStopToEdit, checkTimeConflict, saveNewTimeSlot, simulateRainTrigger, selectReplacementOption, syncWeatherViewUI, confirmWeatherReplacement, skipWeatherReplacement, resetWeatherSimulation, renderQuiz, selectQuizOption, submitQuizAnswer, finishQuiz, reviewQuizAnswers, resetQuiz, redeemVoucher, showMyRewardsTab, openProfileEditModal, saveProfileEdit, toggleChip };
