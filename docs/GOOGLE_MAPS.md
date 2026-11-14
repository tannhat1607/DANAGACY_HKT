# Google Maps nhúng

1. Trong project Google Cloud có billing, bật **Maps Embed API**.
2. Tạo key riêng cho bản đồ. API restrictions: chỉ **Maps Embed API**. Application restrictions: **Websites (HTTP referrers)**; thêm `http://localhost:5173/*`, `http://127.0.0.1:5173/*` và domain Cloud Run/domain riêng thực tế. Nếu chạy FastAPI/preview, thêm origin tương ứng.
3. Điền `GOOGLE_MAPS_EMBED_KEY=...` trong `.env`, khởi động lại backend. Không dùng chung key Gemini.
4. Cloud Run: thêm biến `GOOGLE_MAPS_EMBED_KEY` rồi deploy revision mới. Không cần build lại frontend vì key được đọc từ `/api/config`.

Key Maps Embed được trình duyệt nhìn thấy theo thiết kế; phải giới hạn API và HTTP referrer. Gemini key vẫn chỉ ở backend, không trả qua endpoint config.

Khi chưa có key, hiển thị nút mở Google Maps thay vì bản đồ giả. Chọn địa điểm để bản đồ hiển thị một địa điểm, đồng thời mở chi tiết. Bộ lọc hiện lọc các nút địa điểm của ứng dụng, không lọc các POI bên trong iframe. Embed không hiển thị đồng thời bộ marker tùy chỉnh; nếu cần đồng bộ nhiều marker và tương tác sâu hơn thì dùng Maps JavaScript API.

Nguồn: [Maps Embed setup](https://developers.google.com/maps/documentation/embed/get-api-key), [iframe parameters](https://developers.google.com/maps/documentation/embed/embedding-map).
