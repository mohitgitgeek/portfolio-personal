# Portfolio Riddle — Full‑Stack (Flask) Version

This repository contains a static frontend (originally in `public/`) and a Flask backend (`server.py`) with a feedback system backed by SQL (Postgres recommended; sqlite fallback included). The `docs/` folder is prepared for GitHub Pages hosting of the frontend.

Summary
- Frontend: `public/` (also copied to `docs/` for GitHub Pages)
- Backend: `server.py` (Flask + SQLAlchemy)
- DB: PostgreSQL recommended (set `DATABASE_URL`), sqlite fallback at `data/feedback.db`
- Admin UI: `public/admin.html` (or `docs/admin.html` on Pages) — paginated list and CSV export
- Feedback API: `POST /api/feedback` and listing `GET /api/feedbacks`

Quick start (local)
1. Create a Python venv (recommended):

```powershell
cd C:\workspace\portfolio-riddle
python -m venv .venv
.\.venv\Scripts\activate
```

2. Install Python dependencies:

```powershell
python -m pip install -r requirements.txt
```

3. Initialize the database (uses `DATABASE_URL` if set, otherwise creates `data/feedback.db`):

```powershell
python init_db.py
```

4. Run the server:

```powershell
python server.py
```

5. Open the site:
- Frontend: http://localhost:3000/
- Feedback page: http://localhost:3000/feedback.html
- Admin page: http://localhost:3000/admin.html

Some more featues : 
- `GET /riddle` returns a short question and stores the answer in the server-side session.
- `POST /solve` checks the provided answer and unlocks the page for that session.
 
Certifications and local assets
 - A `Certifications` section was added to the homepage. Badge thumbnails are stored locally in `public/assets/` to avoid external requests at page load.
 - To (re)generate badge images and thumbnails run:

```powershell
python scripts/download_badges.py
```

Dev troubleshooting
 - If the riddle modal doesn't disappear after a correct answer, the server stores the expected answer in the session when you call `GET /riddle`.
 - For local debugging you can enable a debug helper that reveals the current answer by setting the environment variable `DEBUG_SHOW_ANSWER=1` before starting the server. When enabled, visit `/_debug_answer` to see the server-stored answer for your session.

```powershell
set "DEBUG_SHOW_ANSWER=1"
python server.py
# then open http://127.0.0.1:3000/_debug_answer
```

Notes
 - The debug endpoint is intended for local troubleshooting only — do not enable it in production.
 - If you prefer, the badge images can be hosted remotely; storing thumbnails locally improves page load and avoids third-party requests.
