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

Environment variables
- `DATABASE_URL` — optional; PostgreSQL URI (e.g. `postgresql://user:pass@host:5432/dbname`). If not set, sqlite at `data/feedback.db` is used.
- `FLASK_SECRET` — optional; Flask secret key (default in code is `change_this`).
- `PORT` — optional; default `3000`.

Using GitHub Pages (frontend)
1. Configure a backend public URL (deploy backend elsewhere — see below). Example backend URL: `https://my-backend.example`.
2. Edit `docs/config.client.js` (or `public/config.client.js` before copying) and set:

```js
window.API_BASE = 'https://my-backend.example';
```

3. Commit and push `docs/` to your `main` branch and enable GitHub Pages (branch: `main`, folder: `/docs`) in repository settings.

Notes about CORS
- The Flask app includes an optional `flask-cors` integration. For testing it's configured to allow all origins. In production, restrict CORS to your GitHub Pages domain (e.g. `https://<your-user>.github.io`).

Backend hosting options (short guide)
- Render (recommended quick deploy):
	- Create new Web Service, connect GitHub repo, set Build/Start commands (no build step required): `python server.py`.
	- Set environment variables in Render: `DATABASE_URL` (Postgres), `FLASK_SECRET`.
- Heroku / Railway / Fly: similar steps — create app, set `DATABASE_URL` and start command `python server.py`.

Preparing the repo for Pages (automation)
- You can update `public/config.client.js` then copy `public/` to `docs/` and push. Example:

```powershell
# update config.client.js
cp -r public docs
git add docs
git commit -m "Prepare docs for GitHub Pages"
git push
```

Python convenience script
- `scripts/submit_feedback.py` posts to `window.API_BASE` if you set `FEEDBACK_API` env var, otherwise uses `http://localhost:3000/api/feedback`.
	- Example: `FEEDBACK_API=https://my-backend.example python scripts/submit_feedback.py`

Security notes
- The admin UI is intentionally simple and has no authentication. If you deploy publicly, add authentication or restrict access (IP, basic auth, or an admin token) before exposing admin endpoints.

Troubleshooting
- If `flask-cors` is missing: `python -m pip install flask-cors` or reinstall `requirements.txt`.
- If SQLAlchemy cannot open the sqlite file, ensure the `data/` directory exists and is writable. The code creates `data/` automatically when using sqlite.

What I changed for you
- Added Flask backend (`server.py`) and SQLAlchemy models for feedback.
- Added `init_db.py` and `requirements.txt` with Python dependencies.
- Updated front-end to use `window.API_BASE` via `public/config.client.js`.
- Added CORS support (optional) and prepared `docs/` for GitHub Pages.

If you want, I can:
- Add authentication to the admin UI,
- Add a GitHub Actions workflow to auto-build `docs/` and publish to Pages,
- Add a step-by-step deploy script for Render/Heroku.

---
If you plan to push this to GitHub now, you can run the commands in the Quick start section and then push.

# Portfolio with Riddle Lock

This is a small full-stack portfolio starter that locks the homepage behind a very easy riddle. Each page load (refresh) generates a new riddle.

Quick start

Windows / macOS / Linux

```bash
cd workspace/portfolio-riddle
npm install
npm start
```

Open http://localhost:3000

 - Blog : included within the portfolio at `/blog.html` (see `public/blog.html`).

How it works

- `GET /riddle` returns a short question and stores the answer in the server-side session.
- `POST /solve` checks the provided answer and unlocks the page for that session.

If you want, I can:

- Add admin config to change links from a dashboard.
- Replace the simple riddle pool with generated/ML-based or programmatic puzzles.
- Deploy to Vercel/Heroku and add CI.
