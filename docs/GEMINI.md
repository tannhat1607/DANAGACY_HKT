# Bật tạo lịch bằng Gemini

1. Mở `.env` tại thư mục gốc (đã tạo sẵn nếu chưa có).
2. Điền `GEMINI_API_KEY` và `GEMINI_MODEL`, rồi lưu file.
3. Khởi động lại FastAPI. Nếu đổi `.env`, cần khởi động lại kể cả khi dùng `--reload`.

```dotenv
GEMINI_API_KEY=YOUR_KEY
GEMINI_MODEL=gemini-2.5-flash
```

```powershell
.venv/Scripts/python -m uvicorn app.main:app --app-dir backend --reload --port 8080
```

Mở `/api/health`: `planner: gemini` nghĩa là đã chọn provider Gemini (chưa xác nhận key hợp lệ). Trên giao diện, chọn điểm đến và nhấn tạo lịch để kiểm tra lời gọi thực tế. Không có key thì ứng dụng dùng lịch mẫu. Key sai, model không khả dụng, hết quota hoặc timeout sẽ có thông báo lỗi. Có thể đổi model trong `.env` sang model hỗ trợ structured output và khả dụng trong tài khoản.

Backend dùng REST qua httpx đã có trong requirements, không cần SDK riêng. Tham khảo [generateContent](https://ai.google.dev/api/generate-content). Ngày, số người, nhịp độ và điểm đã chọn được gửi tới Gemini; không gửi hồ sơ/email. Kết quả được kiểm tra theo catalog, khung giờ 07:00–22:00, thời lượng tham quan và ít nhất 30 phút giữa các điểm. Giờ mở cửa và thời gian di chuyển thực tế chưa được xác minh. Thời tiết đã dùng Open-Meteo trực tiếp qua backend, không cần key. Các màn hình mô phỏng tránh mưa riêng vẫn được ghi nhãn mô phỏng.

Nếu nhận lỗi `SERVICE_DISABLED`, bật **Generative Language API** trong Google Cloud project sở hữu key. Sau khi bật, đợi cấu hình có hiệu lực rồi thử lại. Có thể kiểm tra thủ công (gọi API thật): `cd backend` rồi `../.venv/Scripts/python check_live.py`.

Cloud Run không nhận `.env` từ máy local: dùng Secret Manager gắn `GEMINI_API_KEY`, đặt `GEMINI_MODEL` trong cấu hình biến môi trường rồi tạo revision mới. Không đưa key vào frontend hoặc `VITE_*`.
