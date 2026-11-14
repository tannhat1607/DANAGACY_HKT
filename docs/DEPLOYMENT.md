# Chạy và triển khai DANANGACY

**Quiz để test:** câu hỏi, đáp án, chấm điểm, giải thích và chơi lại hiện xử lý bằng mock data trong `web/src/controller.js`, không gọi `/api/quiz` hoặc `/api/quiz/answer`. Các endpoint quiz backend vẫn giữ sẵn nhưng giao diện không sử dụng.

**Cập nhật Gemini:** đã tích hợp. Chỉ cần điền `.env` rồi khởi động lại backend; xem [hướng dẫn Gemini](GEMINI.md). Phần hướng dẫn provider mẫu phía dưới chỉ còn áp dụng cho thời tiết.
**Cập nhật thời tiết:** đã gọi `https://api.open-meteo.com/v1/forecast` trực tiếp từ backend, không cần key. Hiển thị nhiệt độ và khả năng mưa theo giờ Việt Nam. Giới hạn ngày từ hôm nay đến 15 ngày tiếp theo; ngày ngoài phạm vi báo lỗi thay vì giả lập số liệu. Xem [tài liệu Open-Meteo](https://open-meteo.com/en/docs). Màn hình mô phỏng thay điểm tránh mưa vẫn là luồng demo riêng.

Kiến trúc: React + Vite + Tailwind → FastAPI → JSON / provider Gemini / provider thời tiết.

## Local

Yêu cầu Node.js 22.12+ và Python 3.11+. Terminal 1 tại thư mục gốc:

```powershell
python -m venv .venv
.venv/Scripts/python -m pip install -r backend/requirements-dev.txt
.venv/Scripts/python -m uvicorn app.main:app --app-dir backend --reload --host 127.0.0.1 --port 8080
```

Terminal 2:

```powershell
cd web
npm ci
npm run dev
```

Mở http://127.0.0.1:5173. Cần cả hai tiến trình; Vite proxy `/api` về FastAPI. API docs tại http://127.0.0.1:8080/docs.

## Kiểm tra và build

```powershell
cd backend
../.venv/Scripts/python -m pytest tests -q
cd ../web
npm run build
```

Sau build, FastAPI tự phục vụ `web/dist` tại http://127.0.0.1:8080. `npm run preview` chỉ phục vụ frontend; dùng FastAPI hoặc Docker cho full stack.

## API và dữ liệu

| Endpoint | Chức năng |
| --- | --- |
| `GET /api/health` | Trạng thái provider |
| `GET /api/catalog` | Điểm đến, khung giờ, điểm thay thế trong nhà |
| `POST /api/itineraries` | Kiểm tra điểm đến, sắp lịch, tính tổng vé |
| `GET /api/weather?day=2026-11-20` | 24 giờ dự báo mẫu |
| `GET /api/quiz` | Câu hỏi không kèm đáp án |
| `POST /api/quiz/answer` | Chấm đáp án và trả giải thích |

Body lịch: `{"date":"2026-11-20","destinations":["nguhanhson","sontra","caurong"],"people":2}`.
Body quiz: `{"question":0,"answer":0}`.

JSON nằm ở `backend/app/data/catalog.json`. Hồ sơ, lịch, xu/voucher và điểm đã lưu ở localStorage (`danangacy:v1`); dữ liệu không đồng bộ giữa thiết bị. Đăng nhập, đặt vé, phần thưởng vẫn là demo, không có database, xác thực production hoặc chống gian lận.

## Thêm Gemini và thời tiết

Gemini đã tích hợp trong `backend/app/providers.py`: có API key thì gọi Gemini, không có key thì dùng lịch mẫu. Kết quả được kiểm tra trước khi trả cho giao diện. Thời tiết vẫn là dữ liệu mẫu; thay `SampleWeatherProvider` khi bổ sung Open-Meteo.

Điền `GEMINI_API_KEY` và `GEMINI_MODEL` trong `.env` tại gốc, khởi động lại backend. Cloud Run: lưu key trong Secret Manager, gắn vào `GEMINI_API_KEY`, cấp quyền đọc secret cho runtime service account; đặt `GEMINI_MODEL` trong biến môi trường. Không đưa key vào `VITE_*` hoặc commit `.env`. `WEATHER_API_KEY` vẫn dành sẵn cho tích hợp thời tiết sau.

## Docker và Cloud Run

Khi Docker Engine đang chạy, tại gốc:

```powershell
docker compose up --build
```

Mở http://localhost:8080. Container non-root phục vụ frontend và API, lắng nghe `0.0.0.0:$PORT` theo [Cloud Run container contract](https://docs.cloud.google.com/run/docs/container-contract).

Cài Google Cloud CLI, chuẩn bị project có billing và quyền deploy source:

```powershell
gcloud auth login
./deploy/cloud-run.ps1 -ProjectId YOUR_PROJECT_ID
```

Script bật Run, Cloud Build và Artifact Registry; dùng Dockerfile deploy tới `asia-southeast1`, service công khai, 0–3 instance, RAM 512 MiB. Cấp quyền deploy/build theo [hướng dẫn Google Cloud](https://docs.cloud.google.com/run/docs/deploying-source-code). Nếu organization cấm public service, điều chỉnh IAM theo chính sách. Script không tạo database/secret và chưa được chạy để deploy trong lần phát triển này.

Kiểm tra URL trả về, `/api/health`, `/docs`, tạo lịch và quiz. Không ghi dữ liệu người dùng lên filesystem Cloud Run. JSON được đóng gói cùng image; người dùng lưu trạng thái ở trình duyệt.

Tailwind dùng plugin Vite theo [tài liệu chính thức](https://tailwindcss.com/docs/installation/using-vite). CSS gốc được giữ để bảo toàn giao diện.
