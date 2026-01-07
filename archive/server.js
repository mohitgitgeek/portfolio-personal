const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

// A small pool of very-easy riddles/questions. Answers are simple strings.
const RIDDLES = [
  { q: 'What is 2 + 2?', a: '4' },
  { q: 'What is the reverse of "abc"?', a: 'cba' },
  { q: 'If you have one apple and get one more, how many apples?', a: '2' },
  { q: 'What is 3 * 3?', a: '9' },
  { q: 'The binary for decimal 1 is?', a: '1' },
  { q: 'What comes next in sequence 1,2,3, ? ', a: '4' },
  { q: 'What is the length of the string "hi"?', a: '2' },
  { q: 'If f(0)=0 and f(n)=n for small n, f(2)=?', a: '2' },
  { q: 'Simple logic: True AND False is?', a: 'false' },
  { q: 'What is 10 divided by 2?', a: '5' }
];

function randomRiddle() {
  return RIDDLES[Math.floor(Math.random() * RIDDLES.length)];
}

// Provide a new riddle on every request (so refresh gives a new riddle)
app.get('/riddle', (req, res) => {
  const r = randomRiddle();
  // store normalized answer in session
  req.session.answer = (r.a || '').toString().trim().toLowerCase();
  req.session.unlocked = false;
  res.json({ question: r.q });
});

app.post('/solve', (req, res) => {
  const guess = (req.body.answer || '').toString().trim().toLowerCase();
  if (!req.session.answer) return res.json({ ok: false, error: 'no-riddle' });
  if (guess === req.session.answer) {
    req.session.unlocked = true;
    return res.json({ ok: true });
  }
  return res.json({ ok: false });
});

// ensure data directory exists and open sqlite DB for feedback
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, 'feedback.db');
const db = new sqlite3.Database(dbPath);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// API endpoint to submit feedback
app.post('/api/feedback', (req, res) => {
  const name = (req.body.name || '').toString().trim();
  const email = (req.body.email || '').toString().trim();
  const message = (req.body.message || '').toString().trim();
  if (!message) return res.status(400).json({ ok: false, error: 'empty-message' });
  const stmt = db.prepare('INSERT INTO feedbacks (name, email, message) VALUES (?,?,?)');
  stmt.run(name, email, message, function (err) {
    if (err) return res.status(500).json({ ok: false, error: 'db-error' });
    res.json({ ok: true, id: this.lastID });
  });
  stmt.finalize();
});

// Optional: list feedbacks (for local admin/testing)
app.get('/api/feedbacks', (req, res) => {
  db.all('SELECT id, name, email, message, created_at FROM feedbacks ORDER BY created_at DESC LIMIT 200', (err, rows) => {
    if (err) return res.status(500).json({ ok: false, error: 'db-error' });
    res.json({ ok: true, feedbacks: rows });
  });
});

// Simple config of links — edit these or provide via env later
const LINKS = {
  projects: 'https://github.com/mohitgitgeek',
  youtube: 'https://www.youtube.com/c/MohitTheTechGeek/',
  instagram: 'https://www.instagram.com/mohitvuyala2021/',
  linkedin: 'https://www.linkedin.com/in/mohit-vuyala/',
  blog: '/blog.html'
};

app.get('/config', (req, res) => {
  res.json({ links: LINKS });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
