# Portfolio — Mohit Vuyala

## 🌐 Live GitHub Pages Site
**URL:** `https://mohitgitgeek.github.io/portfolio-personal/`

---

This repository contains a static frontend (originally in `public/`) and a Flask backend (`server.py`) with a feedback system backed by SQL (Postgres recommended; sqlite fallback included). The `docs/` folder is prepared for GitHub Pages hosting of the frontend.

Summary
- Frontend: `public/` (also copied to `docs/` for GitHub Pages)
- Backend: `server.py` (Flask + SQLAlchemy)
- DB: PostgreSQL recommended (set `DATABASE_URL`), sqlite fallback at `data/feedback.db`
- Admin UI: `public/admin.html` (or `docs/admin.html` on Pages) — paginated list and CSV export
- Feedback API: `POST /api/feedback` and listing `GET /api/feedbacks`

Dev troubleshooting
- If you experience issues with the UI, check the browser console and the server logs.

Notes
- The riddle unlock feature has been removed from this branch. The site now displays main content by default.
