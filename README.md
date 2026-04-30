# Portfolio — Mohit Vuyala

## 🌐 Live GitHub Pages Site
**URL:** `https://mohitgitgeek.github.io/portfolio-personal/`

### One-time setup (repository owner only)
1. Go to **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/docs`**, then click **Save**.

The site will be live within ~60 seconds. After that, any push to `public/` automatically syncs `docs/` and re-deploys via the [publish-docs workflow](.github/workflows/publish-docs.yml). You can also trigger it manually from the **Actions** tab → *Publish docs to GitHub Pages* → **Run workflow**.

---

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

Dev troubleshooting
- If you experience issues with the UI, check the browser console and the server logs.

Notes
- The riddle unlock feature has been removed from this branch. The site now displays main content by default.
