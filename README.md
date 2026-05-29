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

Features
- Riddle lock screen: a fresh random riddle is assigned each browser session before the portfolio unlocks. Categories: Math, Logical & Analytical Reasoning, DBMS, OS, Networks, DSA, AI/ML. The riddle bank lives in `riddles.js` and runs fully client-side (works on GitHub Pages with no backend). Hint and "new riddle" buttons are available.
- Blog: `blog.html` includes a built-in editor to write, edit, and delete posts. Posts are persisted in the browser via localStorage.
- Deployed projects showcase: a data-driven grid on the home page. Edit the `PROJECTS` array in `content.js`.
- YouTube preview: a channel card plus optional embedded featured videos. Configure via the `YOUTUBE` object in `content.js` (add video IDs to `featuredVideos`).

Notes
- The lock screen is now enforced client-side in `index.html`; the legacy server-side `/riddle` and `/solve` endpoints remain in `server.py` for API use but the `/` route serves `index.html` directly.
