import { useEffect } from 'react';
import WeatherForecast from './components/WeatherForecast.jsx';
import ExploreMap from './components/ExploreMap.jsx';
import { openAccount, initializeApp, switchView, showToast, openModal, closeModal, toggleAuthSub, doLogin, doQuickDemoLogin, doLogout, filterPlaces, selectExploreArea, searchFilter, applyExploreFilter, resetExploreFilter, openPlaceDetail, renderSavedPlacesList, savePlace, addCurrentPlaceToItinerary, openBookingTicketModal, confirmTicketBooking, selectPace, togglePreferenceChip, applyDeterministicDestinationSuggestions, updateItineraryPreview, formatDateVN, generateAndSaveItinerary, renderItineraryTimeline, timeToMinutes, openEditScreenC07, openTimeEditModal, onSelectStopToEdit, checkTimeConflict, saveNewTimeSlot, simulateRainTrigger, selectReplacementOption, syncWeatherViewUI, confirmWeatherReplacement, skipWeatherReplacement, resetWeatherSimulation, renderQuiz, selectQuizOption, submitQuizAnswer, finishQuiz, reviewQuizAnswers, resetQuiz, redeemVoucher, showMyRewardsTab, openProfileEditModal, saveProfileEdit, toggleChip } from './controller.js';

export default function App() {
  useEffect(() => { initializeApp(); }, []);
  return (<>


  
  <div className="brutal-marquee">
    <div className="marquee-content">
      ★ DANANGACY · DI SẢN &amp; KHÁM PHÁ ĐÀ NẴNG (BẢN MÔ PHỎNG MVP CLIENT-SIDE) ✦ THIẾT KẾ VINTAGE BRUTALISM HOÀI NIỆM ✦ LẬP LỊCH TRÌNH CỦA BẠN ✦ MÔ PHỎNG CẢNH BÁO MƯA &amp; TỰ ĐỘNG THAY THẾ ĐIỂM ĐẾN TRONG NHÀ ✦ MINI GAME THỬ THÁCH DI SẢN 3 CÂU HỎI ✦ ĐỔI ƯU ĐÃI MÔ PHỎNG TẠI ĐÀ NẴNG ★
    </div>
  </div>

  
  <header className="brutal-header">
    <div className="nav-container">
      <a onClick={(event) => { switchView('home') }} className="logo-box">
        <div className="logo-stamp">DN</div>
        <div>
          <div className="logo-text">DANANGACY</div>
          <div className="logo-sub">HERITAGE VINTAGE BRUTALISM</div>
        </div>
      </a>
      
      <nav className="nav-links">
        <a className="nav-link" id="nav-home" onClick={(event) => { switchView('home') }}>Trang chủ</a>
        <a className="nav-link" id="nav-explore" onClick={(event) => { switchView('explore') }}>Điểm đến</a>
        <a className="nav-link" id="nav-itinerary" onClick={(event) => { switchView('itinerary') }}>Lịch trình</a>
        <a className="nav-link" id="nav-weather" onClick={(event) => { switchView('weather') }}>Thời tiết AI</a>
        <a className="nav-link" id="nav-game" onClick={(event) => { switchView('game') }}>Thử thách Di sản</a>
        <a className="nav-link" id="nav-rewards" onClick={(event) => { switchView('rewards') }}>Ưu đãi</a>
        <a className="nav-link" id="nav-profile" onClick={(event) => { switchView('profile') }}>Hồ sơ</a>
      </nav>

      <div style={{"display": "flex", "gap": "10px", "alignItems": "center"}}>
        <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" onClick={() => openAccount()} id="auth-state-btn">
          <span>ĐĂNG NHẬP</span> 👤
        </button>
      </div>
    </div>
  </header>

  
  <div id="brutal-toast" className="brutal-toast">Thông báo hệ thống</div>

  
  <main className="main-wrapper">

    
    <div id="view-auth" className="view-panel">
      <div className="brutal-grid">
        <div style={{"gridColumn": "span 6"}}>
          <div className="brutal-card" style={{"background": "var(--vintage-ochre)", "height": "100%", "display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
            <div>
              <span className="brutal-badge badge-dark">XÁC THỰC</span>
              <h1 className="hero-title" style={{"marginTop": "20px", "fontSize": "44px"}}>CHÀO MỪNG ĐẾN VỚI DANANGACY.</h1>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "15px", "marginBottom": "20px", "fontWeight": "700", "lineHeight": "1.6"}}>
                Khám phá văn hóa, di sản, kiến trúc độc bản và trải nghiệm ẩm thực miền duyên hải Đà Nẵng với phong cách thô mộc, chính xác và trực quan nhất.
              </p>
            </div>
            <div>
              <img src="assets/danang_hero.jpg" alt="Đà Nẵng" style={{"width": "100%", "height": "260px", "objectFit": "cover", "border": "3px solid var(--border-color)", "boxShadow": "5px 5px 0px var(--border-color)", "filter": "sepia(15%)"}} />
            </div>
          </div>
        </div>

        <div style={{"gridColumn": "span 6"}}>
          
          <div className="brutal-card" id="auth-box-login">
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "16px"}}>
              <h2 style={{"fontFamily": "var(--font-heading)", "fontSize": "26px", "textTransform": "uppercase"}}>ĐĂNG NHẬP TÀI KHOẢN</h2>
              
            </div>
            <p style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "marginBottom": "20px", "color": "#4E483F"}}>
              Nhập tài khoản để tiếp tục lưu lịch trình và tích điểm thử thách di sản.
            </p>

            <div style={{"marginBottom": "16px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "6px"}}>EMAIL HOẶC SỐ ĐIỆN THOẠI</label>
              <input type="text" id="login-email" className="brutal-input" defaultValue="traveler@danangacy.vn" />
            </div>

            <div style={{"marginBottom": "20px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "6px"}}>MẬT KHẨU</label>
              <input type="password" id="login-pass" className="brutal-input" defaultValue="••••••••••••" />
            </div>

            <div className="page-heading">
              <label style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700", "display": "flex", "alignItems": "center", "gap": "6px", "cursor": "pointer"}}>
                <input type="checkbox" defaultChecked style={{"width": "18px", "height": "18px", "accentColor": "var(--vintage-terracotta)"}} /> Ghi nhớ đăng nhập
              </label>
              <a onClick={(event) => { toggleAuthSub('forgot') }} style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700", "color": "var(--border-color)", "textDecoration": "underline"}}>Quên mật khẩu? </a>
            </div>

            <button className="brutal-btn brutal-btn-terracotta brutal-btn-lg" style={{"width": "100%", "marginBottom": "16px"}} onClick={(event) => { doLogin() }}>
              XÁC NHẬN ĐĂNG NHẬP ➜
            </button>

            <div style={{"display": "flex", "gap": "10px"}}>
              <button className="brutal-btn brutal-btn-white" style={{"flex": "1"}} onClick={(event) => { toggleAuthSub('register') }}>Đăng ký mới </button>
              <button className="brutal-btn brutal-btn-teal" style={{"flex": "1"}} onClick={(event) => { doQuickDemoLogin() }}>⚡ Đăng nhập 1-Click</button>
            </div>
          </div>

          
          <div className="brutal-card" id="auth-box-register" style={{"display": "none"}}>
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "16px"}}>
              <h2 style={{"fontFamily": "var(--font-heading)", "fontSize": "26px", "textTransform": "uppercase"}}>ĐĂNG KÝ TÀI KHOẢN</h2>
              
            </div>
            <div style={{"marginBottom": "14px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "6px"}}>HỌ VÀ TÊN</label>
              <input type="text" className="brutal-input" placeholder="Nguyễn Văn A" />
            </div>
            <div style={{"marginBottom": "14px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "6px"}}>EMAIL</label>
              <input type="email" className="brutal-input" placeholder="ban@gmail.com" />
            </div>
            <div style={{"marginBottom": "14px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "6px"}}>MẬT KHẨU</label>
              <input type="password" className="brutal-input" placeholder="Tối thiểu 8 ký tự" />
            </div>
            <button className="brutal-btn brutal-btn-sage brutal-btn-lg" style={{"width": "100%", "marginBottom": "12px"}} onClick={(event) => { showToast('Đăng ký thành công! Đang chuyển đăng nhập...'); toggleAuthSub('login'); }}>TẠO TÀI KHOẢN</button>
            <button className="brutal-btn brutal-btn-white" style={{"width": "100%"}} onClick={(event) => { toggleAuthSub('login') }}>Quay lại Đăng nhập</button>
          </div>

          
          <div className="brutal-card" id="auth-box-forgot" style={{"display": "none"}}>
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "16px"}}>
              <h2 style={{"fontFamily": "var(--font-heading)", "fontSize": "24px", "textTransform": "uppercase"}}>QUÊN MẬT KHẨU</h2>
              
            </div>
            <p style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "marginBottom": "14px"}}>Nhập email để nhận mã OTP xác thực 6 số .</p>
            <input type="email" className="brutal-input" defaultValue="traveler@danangacy.vn" style={{"marginBottom": "14px"}} />
            <div style={{"display": "flex", "gap": "8px", "marginBottom": "16px"}}>
              <input type="text" maxLength="1" className="brutal-input" style={{"textAlign": "center", "fontSize": "20px", "fontWeight": "900"}} defaultValue="8" />
              <input type="text" maxLength="1" className="brutal-input" style={{"textAlign": "center", "fontSize": "20px", "fontWeight": "900"}} defaultValue="2" />
              <input type="text" maxLength="1" className="brutal-input" style={{"textAlign": "center", "fontSize": "20px", "fontWeight": "900"}} defaultValue="9" />
              <input type="text" maxLength="1" className="brutal-input" style={{"textAlign": "center", "fontSize": "20px", "fontWeight": "900"}} defaultValue="1" />
              <input type="text" maxLength="1" className="brutal-input" style={{"textAlign": "center", "fontSize": "20px", "fontWeight": "900"}} defaultValue="5" />
              <input type="text" maxLength="1" className="brutal-input" style={{"textAlign": "center", "fontSize": "20px", "fontWeight": "900"}} defaultValue="4" />
            </div>
            <button className="brutal-btn brutal-btn-ochre" style={{"width": "100%", "marginBottom": "10px"}} onClick={(event) => { showToast('Xác thực OTP thành công! Đặt lại mật khẩu mới '); toggleAuthSub('login'); }}>XÁC MINH OTP &amp; ĐẶT LẠI MẬT KHẨU </button>
            <button className="brutal-btn brutal-btn-white" style={{"width": "100%"}} onClick={(event) => { toggleAuthSub('login') }}>Hủy bỏ</button>
          </div>
        </div>
      </div>
    </div>

    
    <div id="view-home" className="view-panel active">
      
      <div className="brutal-card" style={{"background": "var(--bg-card)", "marginBottom": "30px", "borderWidth": "4px"}}>
        <div className="brutal-grid" style={{"alignItems": "center"}}>
          <div style={{"gridColumn": "span 7"}}>
            <div style={{"display": "flex", "gap": "8px", "marginBottom": "12px"}}>
              <span className="brutal-badge badge-ochre">DANANGACY 2026</span>
              <span className="brutal-badge badge-teal">DI SẢN TRỰC QUAN</span>
              <span className="brutal-badge badge-rose">BẢN MÔ PHỎNG MVP</span>
            </div>
            <h1 className="hero-title">KHÁM PHÁ ĐÀ NẴNG KHÔNG RÀO CẢN.</h1>
            <p style={{"fontFamily": "var(--font-body)", "fontSize": "15px", "fontWeight": "600", "marginBottom": "24px", "maxWidth": "550px", "lineHeight": "1.6", "color": "#3D372E"}}>
              Hệ thống tổng hợp địa điểm di sản, tạo lịch trình mẫu theo nhịp độ của bạn, mô phỏng điều chỉnh địa điểm khi mưa bão và mini-game 3 câu hỏi di sản nhận ưu đãi mô phỏng.
            </p>
            <div style={{"display": "flex", "flexWrap": "wrap", "gap": "12px"}}>
              <button className="brutal-btn brutal-btn-ochre brutal-btn-lg" onClick={(event) => { switchView('itinerary-create') }}>
                + TẠO LỊCH TRÌNH MỚI 
              </button>
              <button className="brutal-btn brutal-btn-teal brutal-btn-lg" onClick={(event) => { switchView('game') }}>
                🎮 CHƠI MINI-GAME 3 CÂU 
              </button>
              <button className="brutal-btn brutal-btn-white brutal-btn-lg" onClick={(event) => { switchView('weather') }}>
                🌧 MÔ PHỎNG TRÁNH MƯA 
              </button>
            </div>
          </div>
          <div style={{"gridColumn": "span 5"}}>
            <div style={{"position": "relative"}}>
              <img src="assets/danang_hero.jpg" alt="Cầu Rồng Đà Nẵng" style={{"width": "100%", "height": "320px", "objectFit": "cover", "border": "4px solid var(--border-color)", "boxShadow": "8px 8px 0px var(--border-color)", "filter": "sepia(15%)"}} />
              <div style={{"position": "absolute", "bottom": "-12px", "right": "-12px", "background": "var(--vintage-terracotta)", "color": "#FFFDF5", "border": "3px solid var(--border-color)", "padding": "8px 14px", "fontFamily": "var(--font-heading)", "fontWeight": "900", "boxShadow": "4px 4px 0px var(--border-color)"}}>
                ✦ 28°C · NẮNG ĐẸP ĐÀ NẴNG (MÔ PHỎNG)
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="page-heading">
        <h2 className="section-title">DANH SÁCH ĐỊA ĐIỂM TIÊU BIỂU </h2>
        <div>
          <button className="brutal-btn brutal-btn-sm brutal-btn-white" onClick={(event) => { filterPlaces('all') }}>TẤT CẢ (4)</button>
          <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" onClick={(event) => { filterPlaces('nature') }}>THIÊN NHIÊN</button>
          <button className="brutal-btn brutal-btn-sm brutal-btn-teal" onClick={(event) => { filterPlaces('culture') }}>VĂN HÓA</button>
          <button className="brutal-btn brutal-btn-sm brutal-btn-terracotta" onClick={(event) => { filterPlaces('icon') }}>BIỂU TƯỢNG</button>
        </div>
      </div>

      
      <div className="brutal-grid" id="places-cards-container">
        
        <div className="place-card-item" style={{"gridColumn": "span 3"}} data-cat="nature">
          <div className="brutal-card" style={{"padding": "0", "overflow": "hidden"}}>
            <img src="assets/son_tra.jpg" alt="Bán đảo Sơn Trà" className="place-img" />
            <div className="place-body">
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "8px"}}>
                <span className="brutal-badge badge-sage">THIÊN NHIÊN</span>
                <span style={{"fontFamily": "var(--font-body)", "fontWeight": "700", "fontSize": "12px"}}>★ 4.8 (1.2k)</span>
              </div>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginBottom": "6px"}}>BÁN ĐẢO SƠN TRÀ</h3>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "marginBottom": "14px", "color": "#4E483F", "lineHeight": "1.5"}}>
                Lá phổi xanh của Đà Nẵng, chùa Linh Ứng, đỉnh Bàn Cờ, ngắm voọc chà vá chân nâu.
              </p>
              <div style={{"display": "flex", "gap": "6px"}}>
                <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" style={{"flex": "1"}} onClick={(event) => { openPlaceDetail('sontra') }}>CHI TIẾT </button>
                <button className="brutal-btn brutal-btn-sm brutal-btn-white" onClick={(event) => { savePlace('Bán đảo Sơn Trà') }}>❤ LƯU</button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="place-card-item" style={{"gridColumn": "span 3"}} data-cat="icon">
          <div className="brutal-card" style={{"padding": "0", "overflow": "hidden"}}>
            <img src="assets/cau_rong.jpg" alt="Cầu Rồng" className="place-img" />
            <div className="place-body">
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "8px"}}>
                <span className="brutal-badge badge-terracotta">BIỂU TƯỢNG</span>
                <span style={{"fontFamily": "var(--font-body)", "fontWeight": "700", "fontSize": "12px"}}>★ 4.9 (3.4k)</span>
              </div>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginBottom": "6px"}}>CẦU RỒNG ĐÀ NẴNG</h3>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "marginBottom": "14px", "color": "#4E483F", "lineHeight": "1.5"}}>
                Biểu tượng kiến trúc hiện đại vươn mình ra biển, trình diễn phun lửa &amp; phun nước cuối tuần.
              </p>
              <div style={{"display": "flex", "gap": "6px"}}>
                <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" style={{"flex": "1"}} onClick={(event) => { openPlaceDetail('caurong') }}>CHI TIẾT </button>
                <button className="brutal-btn brutal-btn-sm brutal-btn-white" onClick={(event) => { savePlace('Cầu Rồng Đà Nẵng') }}>❤ LƯU</button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="place-card-item" style={{"gridColumn": "span 3"}} data-cat="culture">
          <div className="brutal-card" style={{"padding": "0", "overflow": "hidden"}}>
            <img src="assets/ngu_hanh_son.jpg" alt="Ngũ Hành Sơn" className="place-img" />
            <div className="place-body">
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "8px"}}>
                <span className="brutal-badge badge-teal">DI TÍCH QG</span>
                <span style={{"fontFamily": "var(--font-body)", "fontWeight": "700", "fontSize": "12px"}}>★ 4.7 (2.1k)</span>
              </div>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginBottom": "6px"}}>NGŨ HÀNH SƠN</h3>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "marginBottom": "14px", "color": "#4E483F", "lineHeight": "1.5"}}>
                Quần thể 5 ngọn núi đá vôi Kim Mộc Thủy Hỏa Thổ, hệ thống hang động Huyền Không linh thiêng.
              </p>
              <div style={{"display": "flex", "gap": "6px"}}>
                <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" style={{"flex": "1"}} onClick={(event) => { openPlaceDetail('nguhanhson') }}>CHI TIẾT </button>
                <button className="brutal-btn brutal-btn-sm brutal-btn-white" onClick={(event) => { savePlace('Ngũ Hành Sơn') }}>❤ LƯU</button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="place-card-item" style={{"gridColumn": "span 3"}} data-cat="culture">
          <div className="brutal-card" style={{"padding": "0", "overflow": "hidden"}}>
            <img src="assets/bao_tang_dn.jpg" alt="Bảo tàng Đà Nẵng" className="place-img" />
            <div className="place-body">
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "8px"}}>
                <span className="brutal-badge badge-rose">LỊCH SỬ</span>
                <span style={{"fontFamily": "var(--font-body)", "fontWeight": "700", "fontSize": "12px"}}>★ 4.6 (980)</span>
              </div>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginBottom": "6px"}}>BẢO TÀNG ĐÀ NẴNG</h3>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "marginBottom": "14px", "color": "#4E483F", "lineHeight": "1.5"}}>
                Lưu giữ kỷ vật, tư liệu lịch sử phát triển đô thị, văn hóa Chăm pa và kháng chiến kiên cường.
              </p>
              <div style={{"display": "flex", "gap": "6px"}}>
                <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" style={{"flex": "1"}} onClick={(event) => { openPlaceDetail('baotang') }}>CHI TIẾT </button>
                <button className="brutal-btn brutal-btn-sm brutal-btn-white" onClick={(event) => { savePlace('Bảo tàng Đà Nẵng') }}>❤ LƯU</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div id="view-explore" className="view-panel">
      <div className="page-heading">
        <div>
          <h2 className="section-title">BẢN ĐỒ &amp; TÌM KIẾM ĐỊA ĐIỂM </h2>
          <p className="section-description">Tìm điểm đến và khám phá vị trí trên Google Maps.</p>
        </div>
        <div>
          <button className="brutal-btn brutal-btn-white" onClick={(event) => { resetExploreFilter() }}>LÀM MỚI TỌA ĐỘ</button>
        </div>
      </div>

      <div className="brutal-grid">
        <div style={{"gridColumn": "span 8"}}>
          <ExploreMap onPlaceSelect={openPlaceDetail} />
        </div>

        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card">
            <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "20px", "fontWeight": "900", "marginBottom": "14px"}}>BỘ LỌC TÌM KIẾM</h3>
            
            <input type="text" id="explore-search-input" className="brutal-input" placeholder="🔍 Tìm tên địa điểm, khu vực..." style={{"marginBottom": "16px"}} onInput={(event) => { searchFilter(event.currentTarget.value) }} />
            
            <div style={{"marginBottom": "16px"}} id="explore-area-chips">
              <div style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "marginBottom": "8px"}}>KHU VỰC:</div>
              <div className="chip-btn active" onClick={(event) => { selectExploreArea(event.currentTarget, 'Tất cả') }}>Tất cả</div>
              <div className="chip-btn" onClick={(event) => { selectExploreArea(event.currentTarget, 'Hải Châu') }}>Hải Châu</div>
              <div className="chip-btn" onClick={(event) => { selectExploreArea(event.currentTarget, 'Sơn Trà') }}>Sơn Trà</div>
              <div className="chip-btn" onClick={(event) => { selectExploreArea(event.currentTarget, 'Ngũ Hành Sơn') }}>Ngũ Hành Sơn</div>
            </div>

            <div style={{"marginBottom": "16px"}}>
              <div style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "marginBottom": "8px"}}>TRẠNG THÁI:</div>
              <div className="chip-btn active" onClick={(event) => { toggleChip(event.currentTarget) }}>Đang mở cửa</div>
              <div className="chip-btn" onClick={(event) => { toggleChip(event.currentTarget) }}>Miễn phí vé</div>
              <div className="chip-btn" onClick={(event) => { toggleChip(event.currentTarget) }}>Có tour HDV</div>
            </div>

            <div style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "marginBottom": "8px"}}>ĐỊA ĐIỂM:</div>
            <div id="explore-place-buttons" />

            <div id="explore-filtered-results" style={{"marginBottom": "14px", "fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700", "background": "#FFFDF0", "border": "2px solid var(--border-color)", "padding": "10px"}}>
              Đang hiển thị: <strong>4 / 4 địa điểm tiêu biểu</strong> trên bản đồ mô phỏng.
            </div>

            <button className="brutal-btn brutal-btn-ochre" id="explore-apply-btn" style={{"width": "100%"}} onClick={(event) => { applyExploreFilter() }}>ÁP DỤNG BỘ LỌC (4 ĐIỂM TIÊU BIỂU)</button>
          </div>
        </div>
      </div>
    </div>

    
    <div id="view-itinerary-create" className="view-panel">
      <div className="page-heading">
        <div>
          <h2 className="section-title">LẬP LỊCH TRÌNH CỦA BẠN </h2>
          <p style={{"fontFamily": "var(--font-body)", "fontSize": "14px", "fontWeight": "700"}}>Tạo kế hoạch du lịch Đà Nẵng tất định theo sở thích &amp; nhịp độ (Mô phỏng Client-side, không gọi Backend / Gemini).</p>
        </div>
        <button className="brutal-btn brutal-btn-white" onClick={(event) => { switchView('itinerary') }}>Xem danh sách lịch trình </button>
      </div>

      <div className="brutal-grid">
        
        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card" style={{"height": "100%"}}>
            <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "12px"}}>
              <span className="brutal-badge badge-ochre">BƯỚC 1</span>
              <span style={{"fontFamily": "var(--font-heading)", "fontSize": "11px", "fontWeight": "700"}}>THÔNG TIN CHUYẾN ĐI (MÔ PHỎNG)</span>
            </div>
            
            <div style={{"marginBottom": "14px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "4px"}}>TÊN LỊCH TRÌNH</label>
              <input type="text" id="it-title" className="brutal-input" defaultValue="Khám phá Di sản Đà Nẵng 1 Ngày" onInput={(event) => { updateItineraryPreview() }} />
            </div>

            <div style={{"marginBottom": "14px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "4px"}}>NGÀY KHỞI HÀNH</label>
              <input type="date" id="it-date" className="brutal-input" defaultValue="2026-11-20" onChange={(event) => { updateItineraryPreview() }} />
            </div>

            <div style={{"marginBottom": "14px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "4px"}}>SỐ NGƯỜI THAM GIA</label>
              <select id="it-people" defaultValue="2" className="brutal-input" onChange={(event) => { updateItineraryPreview() }}>
                <option value="1">1 Người (Solo)</option>
                <option value="2">2 Người (Cặp đôi / Bạn thân)</option>
                <option value="4">4-6 Người (Gia đình / Nhóm)</option>
              </select>
            </div>

            <div style={{"background": "#FFFDF0", "border": "2px solid var(--border-color)", "padding": "10px", "fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700", "color": "#3D372E"}} id="it-create-preview-box">
              ✦ <strong>Dự kiến mô phỏng:</strong> 3 điểm đến (Có điểm ngoài trời Sơn Trà lúc 14:00 - 16:30 để kiểm thử tránh mưa).
            </div>
          </div>
        </div>

        
        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card" style={{"height": "100%"}}>
            <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "12px"}}>
              <span className="brutal-badge badge-teal">BƯỚC 2</span>
              <span style={{"fontFamily": "var(--font-heading)", "fontSize": "11px", "fontWeight": "700"}}>SỞ THÍCH &amp; NHỊP ĐỘ</span>
            </div>

            <div style={{"marginBottom": "16px"}}>
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "6px"}}>NHỊP ĐỘ DI CHUYỂN:</label>
              <div style={{"display": "flex", "flexDirection": "column", "gap": "8px"}}>
                <label className="quiz-option" style={{"margin": "0", "padding": "10px"}} onClick={(event) => { selectPace(event.currentTarget, 'Thư thả') }}>
                  <input type="radio" name="pace" defaultValue="Thư thả" style={{"accentColor": "var(--vintage-terracotta)"}} /> 🌴 Thư thả (2 điểm/ngày)
                </label>
                <label className="quiz-option selected" style={{"margin": "0", "padding": "10px"}} onClick={(event) => { selectPace(event.currentTarget, 'Vừa phải') }}>
                  <input type="radio" name="pace" defaultValue="Vừa phải" defaultChecked style={{"accentColor": "var(--vintage-terracotta)"}} /> ⚡ Vừa phải (3 điểm/ngày · Khuyên dùng)
                </label>
                <label className="quiz-option" style={{"margin": "0", "padding": "10px"}} onClick={(event) => { selectPace(event.currentTarget, 'Khám phá tối đa') }}>
                  <input type="radio" name="pace" defaultValue="Khám phá tối đa" style={{"accentColor": "var(--vintage-terracotta)"}} /> 🚀 Khám phá tối đa (4 điểm/ngày)
                </label>
              </div>
            </div>

            <div id="it-pref-chips">
              <label style={{"fontFamily": "var(--font-heading)", "fontWeight": "700", "fontSize": "12px", "display": "block", "marginBottom": "6px"}}>ƯU TIÊN TRẢI NGHIỆM (CHỌN ĐỂ GỢI Ý TẤT ĐỊNH):</label>
              <div className="chip-btn active" data-pref="culture" onClick={(event) => { togglePreferenceChip(event.currentTarget) }}>Di sản &amp; Văn hóa</div>
              <div className="chip-btn active" data-pref="icon" onClick={(event) => { togglePreferenceChip(event.currentTarget) }}>Check-in Biểu tượng</div>
              <div className="chip-btn active" data-pref="nature" onClick={(event) => { togglePreferenceChip(event.currentTarget) }}>Thiên nhiên Sơn Trà</div>
              <div className="chip-btn" data-pref="food" onClick={(event) => { togglePreferenceChip(event.currentTarget) }}>Ẩm thực bản địa</div>
            </div>
          </div>
        </div>

        
        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card" style={{"height": "100%", "display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
            <div>
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "12px"}}>
                <span className="brutal-badge badge-sage">BƯỚC 3</span>
                <span style={{"fontFamily": "var(--font-heading)", "fontSize": "11px", "fontWeight": "700"}}>CHỌN ĐIỂM ĐẾN</span>
              </div>

              <div style={{"display": "flex", "flexDirection": "column", "gap": "8px", "marginBottom": "16px"}}>
                <label style={{"display": "flex", "alignItems": "center", "gap": "8px", "fontFamily": "var(--font-body)", "fontSize": "13px", "fontWeight": "700", "background": "var(--bg-card)", "padding": "8px", "border": "2px solid var(--border-color)", "cursor": "pointer"}}>
                  <input type="checkbox" id="pick-nguhanhson" defaultChecked onChange={(event) => { updateItineraryPreview() }} style={{"width": "18px", "height": "18px", "accentColor": "var(--vintage-terracotta)"}} />
                  Danh thắng Ngũ Hành Sơn (08:00 - 11:00)
                </label>
                <label style={{"display": "flex", "alignItems": "center", "gap": "8px", "fontFamily": "var(--font-body)", "fontSize": "13px", "fontWeight": "700", "background": "var(--bg-card)", "padding": "8px", "border": "2px solid var(--border-color)", "cursor": "pointer"}}>
                  <input type="checkbox" id="pick-sontra" defaultChecked onChange={(event) => { updateItineraryPreview() }} style={{"width": "18px", "height": "18px", "accentColor": "var(--vintage-terracotta)"}} />
                  Đỉnh Bàn Cờ - Bán đảo Sơn Trà (14:00 - 16:30 · Ngoài trời)
                </label>
                <label style={{"display": "flex", "alignItems": "center", "gap": "8px", "fontFamily": "var(--font-body)", "fontSize": "13px", "fontWeight": "700", "background": "var(--bg-card)", "padding": "8px", "border": "2px solid var(--border-color)", "cursor": "pointer"}}>
                  <input type="checkbox" id="pick-caurong" defaultChecked onChange={(event) => { updateItineraryPreview() }} style={{"width": "18px", "height": "18px", "accentColor": "var(--vintage-terracotta)"}} />
                  Cầu Rồng &amp; Phố đêm Sông Hàn (18:00 - 21:00)
                </label>
                <label style={{"display": "flex", "alignItems": "center", "gap": "8px", "fontFamily": "var(--font-body)", "fontSize": "13px", "fontWeight": "700", "background": "var(--bg-card)", "padding": "8px", "border": "2px solid var(--border-color)", "cursor": "pointer"}}>
                  <input type="checkbox" id="pick-baotang" onChange={(event) => { updateItineraryPreview() }} style={{"width": "18px", "height": "18px", "accentColor": "var(--vintage-terracotta)"}} />
                  Bảo tàng Đà Nẵng (11:30 - 13:30 · Trong nhà)
                </label>
              </div>
            </div>

            <div>
              <button className="brutal-btn brutal-btn-terracotta brutal-btn-lg" style={{"width": "100%", "marginBottom": "8px"}} onClick={(event) => { generateAndSaveItinerary() }}>
                XÁC NHẬN TẠO LỊCH  ➜
              </button>
              <div style={{"fontFamily": "var(--font-body)", "fontSize": "11px", "textAlign": "center", "color": "#5D564C"}}>Lịch trình mẫu: Tự động kiểm tra giờ mở cửa và tránh trùng giờ .</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div id="view-itinerary" className="view-panel">
      <div className="page-heading">
        <div>
          <h2 className="section-title">CHI TIẾT LỊCH TRÌNH CỦA BẠN </h2>
          <p style={{"fontFamily": "var(--font-body)", "fontSize": "14px", "fontWeight": "700"}}>Hành trình du lịch Đà Nẵng được lập tất định theo sở thích và hỗ trợ mô phỏng tránh mưa tự động.</p>
        </div>
        <div style={{"display": "flex", "gap": "10px"}}>
          <button className="brutal-btn brutal-btn-ochre" onClick={(event) => { switchView('itinerary-create') }}>+ Lập lịch mới</button>
          <button className="brutal-btn brutal-btn-rose" onClick={(event) => { simulateRainTrigger() }}>🌧 Mô phỏng cảnh báo mưa </button>
        </div>
      </div>

      <div className="brutal-grid">
        
        <div style={{"gridColumn": "span 8"}}>
          <div className="brutal-card">
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "3px solid var(--border-color)", "paddingBottom": "14px", "marginBottom": "20px"}}>
              <div>
                <span className="brutal-badge badge-ochre" id="active-itinerary-meta">NGÀY 1 · 20/11/2026 · NHỊP ĐỘ VỪA PHẢI</span>
                <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "24px", "fontWeight": "900", "marginTop": "6px"}} id="active-itinerary-title">KHÁM PHÁ DI SẢN ĐÀ NẴNG (3 ĐIỂM)</h3>
              </div>
              <div>
                <button className="brutal-btn brutal-btn-sm brutal-btn-white" onClick={(event) => { openTimeEditModal() }}>⏱ Chỉnh giờ </button>
              </div>
            </div>

            
            <div id="itinerary-weather-banner" style={{"background": "#FDF3E5", "border": "3px solid var(--vintage-terracotta)", "padding": "12px 16px", "marginBottom": "20px", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "12px"}}>
              <div style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "fontWeight": "700", "color": "#3D372E"}}>
                🌧 <strong>:</strong> Dự báo có mưa lớn 14:00 - 17:00 tại Bán đảo Sơn Trà (Ngoài trời).
              </div>
              <button className="brutal-btn brutal-btn-sm brutal-btn-terracotta" onClick={(event) => { simulateRainTrigger() }}>XEM ĐỀ XUẤT TRÁNH MƯA ➜</button>
            </div>

            
            <div className="timeline-container" id="timeline-list">
              
              <div className="timeline-item" id="timeline-item-1">
                <div className="timeline-dot">1</div>
                <div className="brutal-card" style={{"padding": "16px"}}>
                  <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "flex-start"}}>
                    <div>
                      <span className="brutal-badge badge-sage">08:00 - 11:00</span>
                      <h4 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginTop": "4px"}}>DANH THẮNG NGŨ HÀNH SƠN</h4>
                      <p style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "color": "#4E483F", "marginTop": "4px", "lineHeight": "1.5"}}>Khám phá ngọn Thủy Sơn, động Huyền Không và làng đá mỹ nghệ Non Nước hơn 400 năm tuổi.</p>
                    </div>
                    <img src="assets/ngu_hanh_son.jpg" style={{"width": "70px", "height": "70px", "objectFit": "cover", "border": "2px solid var(--border-color)", "boxShadow": "2px 2px 0px var(--border-color)", "filter": "sepia(15%)"}} />
                  </div>
                  <div style={{"marginTop": "10px", "display": "flex", "gap": "8px"}}>
                    <span className="brutal-badge badge-ochre">VÉ: 40.000 VNĐ</span>
                    <span className="brutal-badge badge-teal">DI TÍCH QUỐC GIA</span>
                  </div>
                </div>
              </div>

              
              <div className="timeline-item" id="timeline-item-2">
                <div className="timeline-dot" style={{"background": "var(--vintage-rose)"}}>2</div>
                <div className="brutal-card" style={{"padding": "16px"}} id="item-2-card">
                  <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "flex-start"}}>
                    <div>
                      <span className="brutal-badge badge-rose" id="item-2-time">14:00 - 16:30</span>
                      <h4 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginTop": "4px"}} id="item-2-title">ĐỈNH BÀN CỜ - BÁN ĐẢO SƠN TRÀ (NGOÀI TRỜI)</h4>
                      <p style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "color": "#4E483F", "marginTop": "4px", "lineHeight": "1.5"}} id="item-2-desc">Cung đường ven biển Sơn Trà, chùa Linh Ứng và đỉnh Bàn Cờ ngắm toàn cảnh vịnh Đà Nẵng (Điểm ngoài trời dễ bị ảnh hưởng khi mưa).</p>
                    </div>
                    <img src="assets/son_tra.jpg" id="item-2-img" style={{"width": "70px", "height": "70px", "objectFit": "cover", "border": "2px solid var(--border-color)", "boxShadow": "2px 2px 0px var(--border-color)", "filter": "sepia(15%)"}} />
                  </div>
                  <div style={{"marginTop": "10px", "display": "flex", "gap": "8px"}} id="item-2-badges">
                    <span className="brutal-badge badge-terracotta">NGOÀI TRỜI 100%</span>
                    <span className="brutal-badge badge-amber">⚠ CÓ DỰ BÁO MƯA 14:00 (MÔ PHỎNG)</span>
                  </div>
                </div>
              </div>

              
              <div className="timeline-item" id="timeline-item-3">
                <div className="timeline-dot" style={{"background": "var(--vintage-teal)"}}>3</div>
                <div className="brutal-card" style={{"padding": "16px"}}>
                  <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "flex-start"}}>
                    <div>
                      <span className="brutal-badge badge-teal">18:00 - 21:00</span>
                      <h4 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginTop": "4px"}}>CẦU RỒNG &amp; CHỢ ĐÊM SƠN TRÀ</h4>
                      <p style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "color": "#4E483F", "marginTop": "4px", "lineHeight": "1.5"}}>Dạo bộ bờ sông Hàn, ăn hải sản vỉa hè và thưởng thức phố đêm nhộn nhịp.</p>
                    </div>
                    <img src="assets/cau_rong.jpg" style={{"width": "70px", "height": "70px", "objectFit": "cover", "border": "2px solid var(--border-color)", "boxShadow": "2px 2px 0px var(--border-color)", "filter": "sepia(15%)"}} />
                  </div>
                  <div style={{"marginTop": "10px", "display": "flex", "gap": "8px"}}>
                    <span className="brutal-badge badge-ochre">MIỄN PHÍ</span>
                    <span className="brutal-badge badge-teal">BIỂU TƯỢNG ĐÀ NẴNG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card" style={{"marginBottom": "20px"}}>
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "12px"}}>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900"}}>TỔNG QUAN CHUYẾN ĐI</h3>
              <span className="brutal-badge badge-sage" id="itinerary-saved-badge">ĐÃ LƯU </span>
            </div>
            <div style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "lineHeight": "1.8"}} id="itinerary-overview-stats">
              <div>• Số điểm tham quan: <strong>3 địa điểm</strong></div>
              <div>• Nhịp độ &amp; Quy mô: <strong>Vừa phải · 2 người</strong></div>
              <div>• Tổng cự ly dự kiến: <strong>22.5 km (Mô phỏng)</strong></div>
              <div>• Thời gian hoạt động: <strong>8 giờ 30 phút</strong></div>
              <div>• Ngân sách vé tham quan: <strong>40.000 VNĐ / người</strong></div>
              <div>• Trạng thái thời tiết: <strong style={{"color": "var(--vintage-terracotta)"}}>Chưa áp dụng tránh mưa</strong></div>
            </div>
            <hr style={{"border": "1.5px solid var(--border-color)", "margin": "16px 0"}} />
            <button className="brutal-btn brutal-btn-ochre" style={{"width": "100%", "marginBottom": "8px"}} onClick={(event) => { openEditScreenC07() }}>
              ✏ Chỉnh sửa khung giờ 
            </button>
            <button className="brutal-btn brutal-btn-teal" style={{"width": "100%"}} onClick={(event) => { openBookingTicketModal() }}>
              🎟 Đặt vé tham quan mô phỏng 
            </button>
          </div>

          
          <div className="brutal-card" style={{"background": "#FDF3E5"}}>
            <span className="brutal-badge badge-amber" style={{"marginBottom": "8px"}}>MÔ PHỎNG DỰ BÁO MƯA </span>
            <h4 style={{"fontFamily": "var(--font-heading)", "fontSize": "16px", "fontWeight": "900", "marginBottom": "6px"}}>MÔ PHỎNG TRÁNH MƯA TỰ ĐỘNG</h4>
            <p style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "marginBottom": "12px", "color": "#4E483F", "lineHeight": "1.5"}}>
              Kịch bản mô phỏng: Khi xuất hiện mưa rào chiều nay (14:00 - 17:00), hệ thống đề xuất đổi điểm ngoài trời (Sơn Trà) sang điểm trong nhà (Bảo tàng Đà Nẵng) mà vẫn giữ nguyên khung giờ.
            </p>
            <button className="brutal-btn brutal-btn-sm brutal-btn-dark" onClick={(event) => { simulateRainTrigger() }}>Kích hoạt mô phỏng mưa </button>
          </div>
        </div>
      </div>
    </div>

    
    <div id="view-weather" className="view-panel">
      <div className="page-heading">
        <div>
          <h2 className="section-title">THỜI TIẾT &amp; HÀNH TRÌNH</h2>
          <p className="section-description">Theo dõi dự báo và chuẩn bị phương án tham quan phù hợp.</p>
        </div>
        <button className="brutal-btn brutal-btn-white" onClick={(event) => { switchView('itinerary') }}>Quay lại Lịch trình </button>
      </div>

      <WeatherForecast />
      <div className="weather-demo-heading"><span className="brutal-badge badge-ochre">KỊCH BẢN TRẢI NGHIỆM</span><h3>Thử đổi điểm đến khi trời mưa</h3><p className="section-description">Phần bên dưới dùng tình huống mẫu để bạn thử tính năng đổi điểm, độc lập với dự báo thực tế ở trên.</p></div>
      <div className="weather-alert-box" id="weather-alert-card">
        <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "flex-start", "flexWrap": "wrap", "gap": "12px"}}>
          <div>
            <span className="brutal-badge badge-terracotta" style={{"marginBottom": "8px"}}>CẢNH BÁO MƯA RÀO MÔ PHỎNG ()</span>
            <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "24px", "fontWeight": "900", "color": "var(--vintage-terracotta)", "margin": "8px 0"}} id="weather-alert-heading">
              🌧 [MÔ PHỎNG] DỰ BÁO CÓ MƯA LỚN LÚC 14:00 - 17:00 TẠI KHU VỰC SƠN TRÀ!
            </h3>
            <p style={{"fontFamily": "var(--font-body)", "fontSize": "14px", "fontWeight": "700", "maxWidth": "700px", "color": "#3D372E", "lineHeight": "1.6"}} id="weather-alert-subtext">
              Địa điểm ngoài trời của bạn (Bán đảo Sơn Trà / Đỉnh Bàn Cờ) có nguy cơ sương mù dày và đường trơn trượt. Hệ thống gợi ý chuyển sang điểm tham quan văn hóa trong nhà cùng khung giờ 14:00 - 16:30.
            </p>
          </div>
          <div style={{"background": "var(--border-color)", "color": "#FFFDF5", "fontFamily": "var(--font-heading)", "fontWeight": "900", "padding": "10px 14px", "textAlign": "center"}}>
            XÁC SUẤT MƯA (MÔ PHỎNG)<br /><span style={{"fontSize": "24px", "color": "var(--vintage-ochre)"}}>85%</span>
          </div>
        </div>
      </div>

      <div className="brutal-grid">
        
        <div style={{"gridColumn": "span 6"}}>
          <div className="brutal-card" style={{"borderColor": "var(--vintage-terracotta)", "height": "100%"}}>
            <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "12px"}}>
              <span className="brutal-badge badge-terracotta">ĐỊA ĐIỂM BỊ ẢNH HƯỞNG (NGOÀI TRỜI)</span>
              <span className="brutal-badge badge-dark">14:00 - 16:30</span>
            </div>
            <img src="assets/son_tra.jpg" style={{"width": "100%", "height": "200px", "objectFit": "cover", "border": "3px solid var(--border-color)", "marginBottom": "14px", "filter": "sepia(15%)"}} />
            <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "20px", "fontWeight": "900", "marginBottom": "6px"}}>ĐỈNH BÀN CỜ - BÁN ĐẢO SƠN TRÀ</h3>
            <p style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "color": "#4E483F", "marginBottom": "16px", "lineHeight": "1.5"}}>
              Đặc điểm: Ngoài trời 100%, đường dốc hiểm trở, nguy cơ sương mù cản tầm nhìn khi mưa lớn.
            </p>
            <div style={{"background": "#FFF0F0", "border": "2px solid var(--vintage-terracotta)", "padding": "10px", "fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700", "color": "var(--vintage-terracotta)"}}>
              ⚠ Khuyến cáo mô phỏng: Không nên di chuyển xe máy lên bán đảo Sơn Trà trong khung giờ mưa 14:00 - 17:00.
            </div>
          </div>
        </div>

        
        <div style={{"gridColumn": "span 6"}}>
          <div className="brutal-card" style={{"borderColor": "var(--vintage-sage)", "background": "#F4F8F4", "height": "100%", "display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
            <div>
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "12px"}}>
                <span className="brutal-badge badge-sage">ĐỀ XUẤT THAY THẾ MÔ PHỎNG </span>
                <span className="brutal-badge badge-dark">TRONG NHÀ 100%</span>
              </div>
              <img src="assets/bao_tang_dn.jpg" id="weather-replace-img" style={{"width": "100%", "height": "200px", "objectFit": "cover", "border": "3px solid var(--border-color)", "marginBottom": "14px", "filter": "sepia(15%)"}} />
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "20px", "fontWeight": "900", "marginBottom": "6px"}} id="weather-replace-title">BẢO TÀNG ĐÀ NẴNG &amp; KHÔNG GIAN DI SẢN</h3>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "color": "#3D372E", "marginBottom": "12px", "lineHeight": "1.5"}} id="weather-replace-desc">
                Vị trí trung tâm thành phố, có bãi đậu xe có mái che, máy lạnh mát mẻ, trưng bày sinh động hơn 2.500 hiện vật lịch sử &amp; văn hóa Chăm Pa.
              </p>

              
              <div style={{"marginBottom": "12px"}}>
                <div style={{"fontFamily": "var(--font-heading)", "fontSize": "11px", "fontWeight": "800", "marginBottom": "6px"}}>CHỌN PHƯƠNG ÁN TRONG NHÀ THAY THẾ :</div>
                <div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap"}}>
                  <button type="button" className="chip-btn active" id="rep-opt-baotang" onClick={(event) => { selectReplacementOption('baotang') }}>🏛 Bảo tàng Đà Nẵng (20.000đ)</button>
                  <button type="button" className="chip-btn" id="rep-opt-cham" onClick={(event) => { selectReplacementOption('cham') }}>🗿 Bảo tàng Điêu khắc Chăm (60.000đ)</button>
                </div>
              </div>

              <div style={{"background": "#EBF3EB", "border": "2px solid var(--border-color)", "padding": "10px", "fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700"}} id="weather-replace-benefit">
                ✓ Giữ nguyên khung giờ 14:00 - 16:30 · Tiết kiệm 45 phút di chuyển · Không ảnh hưởng 2 điểm còn lại.
              </div>
            </div>

            
            <div style={{"marginTop": "20px"}}>
              <button className="brutal-btn brutal-btn-sage brutal-btn-lg" id="btn-confirm-weather-replace" style={{"width": "100%", "marginBottom": "8px"}} onClick={(event) => { confirmWeatherReplacement() }}>
                ÁP DỤNG THAY THẾ NÀY () ➜
              </button>
              <div style={{"display": "flex", "gap": "8px"}}>
                <button className="brutal-btn brutal-btn-white" style={{"flex": "1"}} onClick={(event) => { skipWeatherReplacement() }}>
                  Giữ nguyên điểm cũ
                </button>
                <button className="brutal-btn brutal-btn-ochre" id="btn-reset-weather" style={{"flex": "1", "display": "none"}} onClick={(event) => { resetWeatherSimulation() }}>
                  ↺ Hoàn tác mô phỏng mưa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div id="view-game" className="view-panel">
      <div className="page-heading">
        <div>
          <h2 className="section-title">THỬ THÁCH DI SẢN ĐÀ NẴNG (3 CÂU HỎI) </h2>
          <p style={{"fontFamily": "var(--font-body)", "fontSize": "14px", "fontWeight": "700"}}>Trả lời 3 câu hỏi di sản Đà Nẵng để nhận 500 Xu Di Sản (Dữ liệu mô phỏng Client-side đổi voucher trải nghiệm).</p>
        </div>
        <div style={{"display": "flex", "alignItems": "center", "gap": "10px"}}>
          <div style={{"background": "var(--vintage-ochre)", "border": "3px solid var(--border-color)", "padding": "6px 14px", "fontFamily": "var(--font-heading)", "fontWeight": "900", "boxShadow": "3px 3px 0px var(--border-color)"}}>
            💰 XU MÔ PHỎNG: <span id="game-coin-display">350</span> XU
          </div>
        </div>
      </div>

      
      <div className="brutal-grid">
        <div style={{"gridColumn": "span 8"}}>
          <div className="brutal-card" id="quiz-main-card">
            
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "3px solid var(--border-color)", "paddingBottom": "12px", "marginBottom": "12px"}}>
              <div>
                <span className="brutal-badge badge-rose" id="quiz-question-number">CÂU HỎI 1 / 3 ()</span>
                <span className="brutal-badge badge-teal" style={{"marginLeft": "6px"}}>THỬ THÁCH 3 CÂU DI SẢN (MÔ PHỎNG)</span>
              </div>
              <div style={{"fontFamily": "var(--font-heading)", "fontWeight": "900", "fontSize": "14px"}}>
                ĐÚNG: <span id="quiz-score-badge" style={{"color": "var(--vintage-sage)"}}>0</span>/3
              </div>
            </div>

            
            <div style={{"display": "grid", "gridTemplateColumns": "repeat(3, 1fr)", "gap": "8px", "marginBottom": "18px"}} id="quiz-progress-bar">
              <div style={{"height": "10px", "border": "2px solid var(--border-color)", "background": "var(--vintage-ochre)"}}></div>
              <div style={{"height": "10px", "border": "2px solid var(--border-color)", "background": "var(--bg-card-alt)"}}></div>
              <div style={{"height": "10px", "border": "2px solid var(--border-color)", "background": "var(--bg-card-alt)"}}></div>
            </div>

            
            <h3 id="quiz-question-title" style={{"fontFamily": "var(--font-heading)", "fontSize": "22px", "fontWeight": "900", "marginBottom": "20px", "lineHeight": "1.4"}}>
              Cầu Rồng Đà Nẵng chính thức được khánh thành vào năm nào và thường phun lửa, nước vào thời gian nào?
            </h3>

            
            <div id="quiz-options-container">
              
            </div>

            <div style={{"marginTop": "20px", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "12px", "flexWrap": "wrap"}}>
              <div id="quiz-feedback-box" style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "fontWeight": "700", "flex": "1"}}>
                Hãy chọn 1 đáp án để tiếp tục (Câu 1/3)
              </div>
              <button className="brutal-btn brutal-btn-ochre brutal-btn-lg" id="quiz-action-btn" onClick={(event) => { submitQuizAnswer() }}>
                XÁC NHẬN ĐÁP ÁN 
              </button>
            </div>
          </div>

          
          <div className="brutal-card" id="quiz-result-card" style={{"display": "none", "background": "var(--bg-card)", "textAlign": "center", "padding": "40px 20px"}}>
            <span className="brutal-badge badge-sage" style={{"fontSize": "13px", "padding": "6px 14px"}}>HOÀN THÀNH THỬ THÁCH 3 CÂU </span>
            <h2 style={{"fontFamily": "var(--font-heading)", "fontSize": "34px", "fontWeight": "900", "margin": "16px 0"}} id="quiz-result-headline">XUẤT SẮC! BẠN ĐÃ HOÀN THÀNH 3 CÂU HỎI DI SẢN!</h2>
            <div style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginBottom": "12px"}} id="quiz-result-score-line">
              KẾT QUẢ: ĐÚNG 3/3 CÂU HỎI
            </div>
            <div style={{"fontFamily": "var(--font-heading)", "fontSize": "20px", "fontWeight": "900", "marginBottom": "20px"}}>
              PHẦN THƯỞNG MÔ PHỎNG: <span style={{"background": "var(--vintage-ochre)", "padding": "3px 12px", "border": "2px solid var(--border-color)"}} id="quiz-result-reward-badge">+500 XU DI SẢN (MÔ PHỎNG)</span>
            </div>
            <p style={{"fontFamily": "var(--font-body)", "fontSize": "14px", "maxWidth": "540px", "margin": "0 auto 24px", "lineHeight": "1.6"}}>
              Số xu mô phỏng đã được cộng vào ví tài khoản của bạn. Bạn có thể xem lại lời giải chi tiết cả 3 câu hỏi hoặc đổi voucher mô phỏng ngay!
            </p>
            <div style={{"display": "flex", "justifyContent": "center", "gap": "12px", "flexWrap": "wrap"}}>
              <button className="brutal-btn brutal-btn-terracotta brutal-btn-lg" onClick={(event) => { switchView('rewards') }}>ĐỔI QUÀ MÔ PHỎNG  🎁</button>
              <button className="brutal-btn brutal-btn-white brutal-btn-lg" onClick={(event) => { reviewQuizAnswers() }}>XEM LẠI 3 ĐÁP ÁN </button>
              <button className="brutal-btn brutal-btn-teal brutal-btn-lg" onClick={(event) => { resetQuiz() }}>CHƠI LẠI (3 CÂU)</button>
            </div>
          </div>

          
          <div className="brutal-card" id="quiz-review-card" style={{"display": "none", "marginTop": "20px"}}>
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "3px solid var(--border-color)", "paddingBottom": "12px", "marginBottom": "16px"}}>
              <div>
                
                <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "22px", "fontWeight": "900", "marginTop": "4px"}}>XEM LẠI ĐÁP ÁN &amp; GIẢI THÍCH (3 CÂU HỎI DI SẢN)</h3>
              </div>
              <button className="brutal-btn brutal-btn-sm brutal-btn-dark" onClick={(event) => { document.getElementById('quiz-review-card').style.display='none' }}>ĐÓNG  ✕</button>
            </div>
            <div id="quiz-review-list" style={{"display": "flex", "flexDirection": "column", "gap": "14px"}}>
              
            </div>
          </div>
        </div>

        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card" style={{"background": "var(--vintage-ochre)", "height": "100%"}}>
            <span className="brutal-badge badge-dark">THÔNG TIN THỬ THÁCH </span>
            <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "20px", "fontWeight": "900", "margin": "12px 0"}}>THỬ THÁCH DI SẢN 3 CÂU</h3>
            <img src="assets/quest_banner.png" style={{"width": "100%", "height": "180px", "objectFit": "cover", "border": "3px solid var(--border-color)", "boxShadow": "4px 4px 0px var(--border-color)", "marginBottom": "14px", "filter": "sepia(10%)"}} />
            <ul style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700", "lineHeight": "1.8", "paddingLeft": "18px"}}>
              <li>Gồm <strong>3 câu hỏi trắc nghiệm</strong> về văn hóa, kiến trúc &amp; thiên nhiên Đà Nẵng</li>
              <li>Giải thích kiến thức di sản ngay sau mỗi lần xác nhận đáp án</li>
              <li>Hoàn thành nhận <strong>500 Xu Di Sản (Mô phỏng)</strong> để đổi mã ưu đãi trải nghiệm</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    
    <div id="view-rewards" className="view-panel">
      <div className="page-heading">
        <div>
          <h2 className="section-title">PHẦN THƯỞNG &amp; ƯU ĐÃI MÔ PHỎNG </h2>
          <p style={{"fontFamily": "var(--font-body)", "fontSize": "14px", "fontWeight": "700"}}>Đổi xu di sản lấy mã ưu đãi mô phỏng (Chỉ dùng trải nghiệm MVP, không có giá trị thanh toán thực tế).</p>
        </div>
        <div style={{"display": "flex", "gap": "10px"}}>
          <button className="brutal-btn brutal-btn-white" onClick={(event) => { showMyRewardsTab() }}>🎟 Ưu đãi của tôi (<span id="my-vouchers-count">1</span>) </button>
        </div>
      </div>

      <div className="brutal-grid">
        
        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card" style={{"height": "100%", "display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
            <div>
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "8px"}}>
                <span className="brutal-badge badge-ochre">VÉ THAM QUAN (MÔ PHỎNG)</span>
                <span className="brutal-badge badge-dark">200 XU</span>
              </div>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginBottom": "6px"}}>VÉ BẢO TÀNG ĐÀ NẴNG MIỄN PHÍ</h3>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "color": "#4E483F", "marginBottom": "14px", "lineHeight": "1.5"}}>
                Miễn 100% giá vé vào cổng Bảo tàng Đà Nẵng (Ưu đãi mô phỏng trải nghiệm ứng dụng).
              </p>
            </div>
            <button className="brutal-btn brutal-btn-sage" style={{"width": "100%"}} onClick={(event) => { redeemVoucher('Vé Bảo Tàng Đà Nẵng (Mô phỏng)', 200, 'DN-MUSEUM-FREE') }}>
              ĐỔI ƯU ĐÃI MÔ PHỎNG  ➜
            </button>
          </div>
        </div>

        
        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card" style={{"height": "100%", "display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
            <div>
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "8px"}}>
                <span className="brutal-badge badge-rose">ẨM THỰC (MÔ PHỎNG)</span>
                <span className="brutal-badge badge-dark">350 XU</span>
              </div>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginBottom": "6px"}}>VOUCHER 50K CÀ PHÊ MUỐI ĐÀ THÀNH</h3>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "color": "#4E483F", "marginBottom": "14px", "lineHeight": "1.5"}}>
                Giảm 50.000 VNĐ cho hóa đơn đồ uống tại chuỗi quán cà phê di sản ven sông Hàn (Mã mô phỏng).
              </p>
            </div>
            <button className="brutal-btn brutal-btn-terracotta" style={{"width": "100%"}} onClick={(event) => { redeemVoucher('Voucher 50k Cà Phê Muối (Mô phỏng)', 350, 'DN-COFFEE-50K') }}>
              ĐỔI ƯU ĐÃI MÔ PHỎNG  ➜
            </button>
          </div>
        </div>

        
        <div style={{"gridColumn": "span 4"}}>
          <div className="brutal-card" style={{"height": "100%", "display": "flex", "flexDirection": "column", "justifyContent": "space-between"}}>
            <div>
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "8px"}}>
                <span className="brutal-badge badge-teal">TOUR TRẢI NGHIỆM (MÔ PHỎNG)</span>
                <span className="brutal-badge badge-dark">500 XU</span>
              </div>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "18px", "fontWeight": "900", "marginBottom": "6px"}}>GIẢM 20% TOUR BÁN ĐẢO SƠN TRÀ</h3>
              <p style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "color": "#4E483F", "marginBottom": "14px", "lineHeight": "1.5"}}>
                Áp dụng cho tour ngắm hoàng hôn và lặn ngắm san hô Bãi Bụt (Ưu đãi mô phỏng không có giá trị thanh toán).
              </p>
            </div>
            <button className="brutal-btn brutal-btn-ochre" style={{"width": "100%"}} onClick={(event) => { redeemVoucher('Giảm 20% Tour Sơn Trà (Mô phỏng)', 500, 'DN-SONTRA-20OFF') }}>
              ĐỔI ƯU ĐÃI MÔ PHỎNG  ➜
            </button>
          </div>
        </div>
      </div>

      
      <div style={{"marginTop": "30px"}} id="my-vouchers-section">
        <h3 className="section-title">ƯU ĐÃI CỦA TÔI <span className="screen-tag">MÔ PHỎNG</span></h3>
        <div id="vouchers-list-container" className="brutal-grid">
          <div style={{"gridColumn": "span 6"}}>
            <div className="brutal-card" style={{"background": "#FFFDF0", "borderStyle": "dashed"}}>
              <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center"}}>
                <div>
                  <span className="brutal-badge badge-sage">MÃ MÔ PHỎNG ĐANG HOẠT ĐỘNG</span>
                  <h4 style={{"fontFamily": "var(--font-heading)", "fontSize": "17px", "fontWeight": "900", "marginTop": "6px"}}>VÉ BẢO TÀNG ĐÀ NẴNG MIỄN PHÍ</h4>
                  <div style={{"fontFamily": "var(--font-heading)", "fontSize": "15px", "fontWeight": "900", "color": "var(--vintage-terracotta)", "marginTop": "4px"}}>
                    MÃ: DN-WELCOME-2026
                  </div>
                </div>
                <div style={{"textAlign": "right"}}>
                  <button className="brutal-btn brutal-btn-sm brutal-btn-dark" onClick={(event) => { showToast('Đã sao chép mã mô phỏng DN-WELCOME-2026 vào bộ nhớ!') }}>COPY MÃ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div id="view-profile" className="view-panel">
      <div className="page-heading">
        <div>
          <h2 className="section-title">HỒ SƠ CÁ NHÂN &amp; LƯU TRỮ </h2>
          <p style={{"fontFamily": "var(--font-body)", "fontSize": "14px", "fontWeight": "700"}}>Quản lý tài khoản cục bộ, danh sách địa điểm đã lưu và lịch sử di sản.</p>
        </div>
        <button className="brutal-btn brutal-btn-white" onClick={(event) => { switchView('home') }}>Trở về Trang chủ</button>
      </div>

      <div className="brutal-grid">
        
        <div style={{"gridColumn": "span 5"}}>
          <div className="brutal-card">
            <div style={{"textAlign": "center", "marginBottom": "20px"}}>
              <div style={{"width": "90px", "height": "90px", "margin": "0 auto 12px", "background": "var(--vintage-ochre)", "border": "3px solid var(--border-color)", "boxShadow": "4px 4px 0px var(--border-color)", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "40px"}}>
                😎
              </div>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "22px", "fontWeight": "900"}} id="profile-name-val">NGUYỄN VĂN AN</h3>
              <div style={{"fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700", "color": "#5D564C"}}>Thành viên Danangacy Heritage Club (Mô phỏng)</div>
              <div style={{"marginTop": "8px"}}>
                <span className="brutal-badge badge-sage">CẤP ĐỘ 3: KHÁM PHÁ VIÊN</span>
              </div>
            </div>

            <div style={{"borderTop": "2px solid var(--border-color)", "paddingTop": "16px", "marginBottom": "16px"}}>
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "10px", "fontFamily": "var(--font-body)", "fontSize": "13px"}}>
                <span>EMAIL:</span> <strong id="profile-email-val">traveler@danangacy.vn</strong>
              </div>
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "10px", "fontFamily": "var(--font-body)", "fontSize": "13px"}}>
                <span>SỐ ĐIỆN THOẠI:</span> <strong id="profile-phone-val">0905 123 456</strong>
              </div>
              <div style={{"display": "flex", "justifyContent": "space-between", "marginBottom": "10px", "fontFamily": "var(--font-body)", "fontSize": "13px"}}>
                <span>XU TÍCH LŨY (MÔ PHỎNG):</span> <strong id="profile-coins-val">350 XU</strong>
              </div>
              <div style={{"display": "flex", "justifyContent": "space-between", "fontFamily": "var(--font-body)", "fontSize": "13px"}}>
                <span>LỊCH TRÌNH ĐÃ TẠO:</span> <strong id="profile-itineraries-val">1 Lịch trình </strong>
              </div>
            </div>

            <button className="brutal-btn brutal-btn-ochre" style={{"width": "100%", "marginBottom": "8px"}} onClick={(event) => { openProfileEditModal() }}>
              ✏ CHỈNH SỬA HỒ SƠ 
            </button>
            <button className="brutal-btn brutal-btn-dark" style={{"width": "100%"}} onClick={(event) => { doLogout() }}>
              ĐĂNG XUẤT TÀI KHOẢN
            </button>
          </div>
        </div>

        
        <div style={{"gridColumn": "span 7"}}>
          <div className="brutal-card">
            <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "16px"}}>
              <h3 style={{"fontFamily": "var(--font-heading)", "fontSize": "20px", "fontWeight": "900"}}>ĐỊA ĐIỂM YÊU THÍCH </h3>
              <span className="brutal-badge badge-rose" id="saved-count-badge">3 ĐÃ LƯU</span>
            </div>

            <div id="saved-places-list" style={{"display": "flex", "flexDirection": "column", "gap": "12px"}}>
              <div className="brutal-card" style={{"padding": "12px", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "background": "#FFFDF0"}}>
                <div style={{"display": "flex", "alignItems": "center", "gap": "12px"}}>
                  <img src="assets/son_tra.jpg" style={{"width": "50px", "height": "50px", "objectFit": "cover", "border": "2px solid var(--border-color)", "filter": "sepia(15%)"}} />
                  <div>
                    <h4 style={{"fontFamily": "var(--font-heading)", "fontSize": "16px", "fontWeight": "900"}}>BÁN ĐẢO SƠN TRÀ</h4>
                    <div style={{"fontFamily": "var(--font-body)", "fontSize": "11px", "color": "#5D564C"}}>Đã lưu ngày 14/11/2026</div>
                  </div>
                </div>
                <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" onClick={(event) => { openPlaceDetail('sontra') }}>XEM </button>
              </div>

              <div className="brutal-card" style={{"padding": "12px", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "background": "#FFFDF0"}}>
                <div style={{"display": "flex", "alignItems": "center", "gap": "12px"}}>
                  <img src="assets/cau_rong.jpg" style={{"width": "50px", "height": "50px", "objectFit": "cover", "border": "2px solid var(--border-color)", "filter": "sepia(15%)"}} />
                  <div>
                    <h4 style={{"fontFamily": "var(--font-heading)", "fontSize": "16px", "fontWeight": "900"}}>CẦU RỒNG ĐÀ NẴNG</h4>
                    <div style={{"fontFamily": "var(--font-body)", "fontSize": "11px", "color": "#5D564C"}}>Đã lưu ngày 14/11/2026</div>
                  </div>
                </div>
                <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" onClick={(event) => { openPlaceDetail('caurong') }}>XEM </button>
              </div>

              <div className="brutal-card" style={{"padding": "12px", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "background": "#FFFDF0"}}>
                <div style={{"display": "flex", "alignItems": "center", "gap": "12px"}}>
                  <img src="assets/ngu_hanh_son.jpg" style={{"width": "50px", "height": "50px", "objectFit": "cover", "border": "2px solid var(--border-color)", "filter": "sepia(15%)"}} />
                  <div>
                    <h4 style={{"fontFamily": "var(--font-heading)", "fontSize": "16px", "fontWeight": "900"}}>NGŨ HÀNH SƠN</h4>
                    <div style={{"fontFamily": "var(--font-body)", "fontSize": "11px", "color": "#5D564C"}}>Đã lưu ngày 14/11/2026</div>
                  </div>
                </div>
                <button className="brutal-btn brutal-btn-sm brutal-btn-ochre" onClick={(event) => { openPlaceDetail('nguhanhson') }}>XEM </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>

  

  
  <div id="modal-place-detail" className="brutal-modal-overlay" style={{"display": "none"}} onClick={(event) => { if(event.target===event.currentTarget)closeModal('modal-place-detail') }}>
    <div className="brutal-modal">
      <div className="modal-header">
        <div>
          <span className="brutal-badge badge-ochre" id="modal-place-tag">CHI TIẾT ĐỊA ĐIỂM</span>
          <h2 id="modal-place-name" style={{"fontFamily": "var(--font-heading)", "fontSize": "24px", "fontWeight": "900", "marginTop": "4px"}}>TÊN ĐỊA ĐIỂM</h2>
        </div>
        <button className="brutal-btn brutal-btn-sm brutal-btn-dark" onClick={(event) => { closeModal('modal-place-detail') }}>✕ ĐÓNG</button>
      </div>
      <img id="modal-place-img" src="assets/son_tra.jpg" style={{"width": "100%", "height": "240px", "objectFit": "cover", "border": "3px solid var(--border-color)", "marginBottom": "16px", "filter": "sepia(15%)"}} />
      <p id="modal-place-desc" style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "lineHeight": "1.6", "marginBottom": "16px", "color": "#3D372E"}}>
        Nội dung mô tả chi tiết địa điểm...
      </p>
      <div style={{"display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "10px", "marginBottom": "20px", "fontFamily": "var(--font-body)", "fontSize": "12px"}}>
        <div style={{"border": "2px solid var(--border-color)", "padding": "8px", "background": "var(--bg-card)"}}>
          <strong>GIỜ MỞ CỬA:</strong> <span id="modal-place-hours">06:00 - 18:00</span>
        </div>
        <div style={{"border": "2px solid var(--border-color)", "padding": "8px", "background": "var(--bg-card)"}}>
          <strong>VÉ VÀO CỔNG:</strong> <span id="modal-place-ticket">Miễn phí</span>
        </div>
      </div>
      <div style={{"display": "flex", "gap": "10px"}}>
        <button className="brutal-btn brutal-btn-ochre" style={{"flex": "1"}} onClick={(event) => { addCurrentPlaceToItinerary() }}>+ THÊM VÀO LỊCH TRÌNH</button>
        <button className="brutal-btn brutal-btn-teal" style={{"flex": "1"}} onClick={(event) => { openBookingTicketModal() }}>ĐẶT VÉ MÔ PHỎNG </button>
      </div>
    </div>
  </div>

  
  <div id="modal-booking" className="brutal-modal-overlay" style={{"display": "none"}} onClick={(event) => { if(event.target===event.currentTarget)closeModal('modal-booking') }}>
    <div className="brutal-modal">
      <div className="modal-header">
        <div>
          <span className="brutal-badge badge-amber">MÔ PHỎNG</span>
          <h2 style={{"fontFamily": "var(--font-heading)", "fontSize": "22px", "fontWeight": "900"}}>TÙY CHỌN ĐẶT VÉ MÔ PHỎNG</h2>
        </div>
        <button className="brutal-btn brutal-btn-sm brutal-btn-dark" onClick={(event) => { closeModal('modal-booking') }}>✕</button>
      </div>
      <div style={{"marginBottom": "14px"}}>
        <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>LOẠI VÉ / DỊCH VỤ (MÔ PHỎNG):</label>
        <select className="brutal-input" id="book-ticket-type">
          <option value="museum">Vé tham quan Bảo tàng Đà Nẵng (20.000 VNĐ · Mô phỏng)</option>
          <option value="cave">Vé thang máy &amp; Thủy Sơn Ngũ Hành Sơn (40.000 VNĐ · Mô phỏng)</option>
          <option value="boat">Vé du thuyền Sông Hàn ngắm Cầu Rồng (150.000 VNĐ · Mô phỏng)</option>
        </select>
      </div>
      <div style={{"display": "flex", "gap": "12px", "marginBottom": "16px"}}>
        <div style={{"flex": "1"}}>
          <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>SỐ LƯỢNG:</label>
          <input type="number" className="brutal-input" defaultValue="2" min="1" max="10" />
        </div>
        <div style={{"flex": "1"}}>
          <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>NGÀY ĐẾN:</label>
          <input type="date" className="brutal-input" defaultValue="2026-11-20" />
        </div>
      </div>
      <button className="brutal-btn brutal-btn-sage brutal-btn-lg" style={{"width": "100%"}} onClick={(event) => { confirmTicketBooking() }}>
        XÁC NHẬN ĐẶT VÉ MÔ PHỎNG ➜
      </button>
    </div>
  </div>

  
  <div id="modal-time-edit" className="brutal-modal-overlay" style={{"display": "none"}} onClick={(event) => { if(event.target===event.currentTarget)closeModal('modal-time-edit') }}>
    <div className="brutal-modal">
      <div className="modal-header">
        <div>
          <span className="brutal-badge badge-rose">MÔ PHỎNG</span>
          <h2 style={{"fontFamily": "var(--font-heading)", "fontSize": "22px", "fontWeight": "900"}}>CHỈNH SỬA KHUNG GIỜ</h2>
        </div>
        <button className="brutal-btn brutal-btn-sm brutal-btn-dark" onClick={(event) => { closeModal('modal-time-edit') }}>✕</button>
      </div>
      <p style={{"fontFamily": "var(--font-body)", "fontSize": "13px", "marginBottom": "14px", "color": "#4E483F"}}>
        Chọn điểm đến và chỉnh khung giờ. Hệ thống kiểm tra tự động nếu trùng giờ với điểm khác  hoặc ngoài giờ mở cửa 06:00 - 22:00 .
      </p>
      <div style={{"marginBottom": "14px"}}>
        <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>ĐIỂM ĐẾN TRONG LỊCH TRÌNH</label>
        <select id="edit-stop-index" className="brutal-input" onChange={(event) => { onSelectStopToEdit() }}></select>
      </div>
      <div style={{"marginBottom": "14px"}}>
        <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>GIỜ BẮT ĐẦU</label>
        <input type="time" id="edit-time-start" className="brutal-input" defaultValue="14:00" onChange={(event) => { checkTimeConflict() }} />
      </div>
      <div style={{"marginBottom": "16px"}}>
        <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>GIỜ KẾT THÚC</label>
        <input type="time" id="edit-time-end" className="brutal-input" defaultValue="16:30" onChange={(event) => { checkTimeConflict() }} />
      </div>
      <div id="conflict-alert-box" style={{"display": "none", "background": "#FFF0F0", "border": "2px solid var(--vintage-terracotta)", "padding": "10px", "fontFamily": "var(--font-body)", "fontSize": "12px", "fontWeight": "700", "marginBottom": "16px", "color": "var(--vintage-terracotta)"}}>
        ⚠ Cảnh báo: Khung giờ trùng lặp hoặc không hợp lệ!
      </div>
      <button className="brutal-btn brutal-btn-ochre brutal-btn-lg" style={{"width": "100%"}} onClick={(event) => { saveNewTimeSlot() }}>
        LƯU THAY ĐỔI GIỜ 
      </button>
    </div>
  </div>

  
  <div id="modal-profile-edit" className="brutal-modal-overlay" style={{"display": "none"}} onClick={(event) => { if(event.target===event.currentTarget)closeModal('modal-profile-edit') }}>
    <div className="brutal-modal">
      <div className="modal-header">
        <div>
          <span className="brutal-badge badge-ochre">MÔ PHỎNG</span>
          <h2 style={{"fontFamily": "var(--font-heading)", "fontSize": "22px", "fontWeight": "900"}}>CHỈNH SỬA HỒ SƠ CÁ NHÂN</h2>
        </div>
        <button className="brutal-btn brutal-btn-sm brutal-btn-dark" onClick={(event) => { closeModal('modal-profile-edit') }}>✕</button>
      </div>
      <div style={{"marginBottom": "14px"}}>
        <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>HỌ VÀ TÊN</label>
        <input type="text" id="edit-profile-name" className="brutal-input" defaultValue="Nguyễn Văn An" />
      </div>
      <div style={{"marginBottom": "14px"}}>
        <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>EMAIL</label>
        <input type="email" id="edit-profile-email" className="brutal-input" defaultValue="traveler@danangacy.vn" />
      </div>
      <div style={{"marginBottom": "18px"}}>
        <label style={{"fontFamily": "var(--font-heading)", "fontSize": "12px", "fontWeight": "700", "display": "block", "marginBottom": "4px"}}>SỐ ĐIỆN THOẠI</label>
        <input type="text" id="edit-profile-phone" className="brutal-input" defaultValue="0905 123 456" />
      </div>
      <button className="brutal-btn brutal-btn-sage brutal-btn-lg" style={{"width": "100%"}} onClick={(event) => { saveProfileEdit() }}>
        LƯU HỒ SƠ  ➜
      </button>
    </div>
  </div>
  </>);
}
