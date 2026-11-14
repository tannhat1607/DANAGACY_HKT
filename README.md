# DANANGACY

React + Vite + Tailwind CSS, FastAPI v? d? li?u JSON. ?? chu?n b? Docker/Cloud Run v? provider m?u ?? t?ch h?p Gemini, th?i ti?t sau.

Xem [h??ng d?n ch?y, API v? deploy](docs/DEPLOYMENT.md).

- `web/src`: giao di?n, HTTP client, localStorage v? logic t??ng t?c.
- `web/public/assets`: h?nh ?nh.
- `backend/app/main.py`: API v? ph?c v? frontend production.
- `backend/app/providers.py`: provider l?ch tr?nh v? th?i ti?t m?u.
- `backend/app/data/catalog.json`: ?i?m ??n, khung gi?, quiz.
- `backend/tests`: ki?m tra API.
- `Dockerfile`, `compose.yaml`, `deploy/cloud-run.ps1`: ??ng g?i v? tri?n khai.

Controller hi?n c?n c?p nh?t DOM tr?c ti?p; component th?i ti?t m?i d?ng React state. ??ng nh?p/??i qu? v?n l? demo. API Gemini v? th?i ti?t th?c t? ch?a k?t n?i.
