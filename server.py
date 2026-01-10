from flask import Flask, request, jsonify, session, send_from_directory, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import os
import io
from datetime import datetime

app = Flask(__name__, static_folder='public', static_url_path='/')
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET', 'change_this')

# Use DATABASE_URL environment var for PostgreSQL, fallback to sqlite for convenience
env_db = os.environ.get('DATABASE_URL')
if env_db:
    app.config['SQLALCHEMY_DATABASE_URI'] = env_db
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(BASE_DIR, 'data')
    os.makedirs(data_dir, exist_ok=True)
    db_path = os.path.join(data_dir, 'feedback.db')
    # ensure sqlite absolute path (use forward slashes)
    db_uri = 'sqlite:///' + db_path.replace('\\', '/')
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# initialize SQLAlchemy after ensuring data directory exists
# try to enable CORS if available; allow server to run without it
try:
    from flask_cors import CORS
    _cors_available = True
except Exception:
    _cors_available = False

db = SQLAlchemy(app)
if _cors_available:
    # enable CORS for all routes (restrict in production if desired)
    CORS(app, resources={r"/*": {"origins": "*"}})
else:
    print('Warning: flask_cors not installed — CORS disabled. Install with: pip install flask-cors')


class Feedback(db.Model):
    __tablename__ = 'feedbacks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    email = db.Column(db.String(256))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


RIDDLES = [
    # DSA
    { 'q': 'What is the time complexity of binary search on a sorted array?', 'a': 'log n' },
    { 'q': 'What data structure uses LIFO ordering?', 'a': 'stack' },
    { 'q': 'Which traversal visits root-left-right on a binary tree?', 'a': 'preorder' },
    { 'q': 'What is the average time complexity of quicksort?', 'a': 'n log n' },
    { 'q': 'Which data structure supports O(1) average time for insert and lookup?', 'a': 'hash table' },

    # Operating Systems
    { 'q': 'Which component translates virtual addresses to physical addresses?', 'a': 'mmu' },
    { 'q': 'What scheduling algorithm assigns the CPU to the shortest next job?', 'a': 'sjf' },
    { 'q': 'Which synchronization primitive can be used for mutual exclusion?', 'a': 'mutex' },

    # Computer Networks
    { 'q': 'What does TCP stand for?', 'a': 'transmission control protocol' },
    { 'q': 'Which protocol is used to get an IP address automatically via DHCP?', 'a': 'dhcp' },
    { 'q': 'Which layer in the OSI model handles routing between networks?', 'a': 'network' },

    # DBMS
    { 'q': 'Which SQL command removes a table and its data?', 'a': 'drop table' },
    { 'q': 'Which normal form eliminates repeating groups and makes a primary key?', 'a': 'first normal form' },
    { 'q': 'What kind of index allows fast lookup by a key?', 'a': 'b tree' },

    # Mathematics
    { 'q': 'What is the derivative of x^2?', 'a': '2x' },
    { 'q': 'What is the value of pi (approx) to two decimal places?', 'a': '3.14' },
    { 'q': 'What is 7 factorial (7!)?', 'a': '5040' },

    # Machine Learning
    { 'q': 'Which algorithm is a large-margin classifier often used for classification?', 'a': 'svm' },
    { 'q': 'What measure is used to evaluate binary classification (area under ROC)?', 'a': 'auc' },
    { 'q': 'Which optimization method uses gradients to update parameters?', 'a': 'gradient descent' },

    # Logic and Aptitude
    { 'q': 'If 5 machines take 5 minutes to make 5 widgets, how long does 1 machine take to make 1 widget (minutes)?', 'a': '5' },
    { 'q': 'I am an odd number. Take away one letter and I become even. What number am I?', 'a': 'seven' },
    { 'q': 'Find the next number in sequence: 2, 4, 8, 16, ?', 'a': '32' },

    # simple/general
    { 'q': 'What is 2 + 2?', 'a': '4' },
    { 'q': 'What is the reverse of "abc"?', 'a': 'cba' }
]


def random_riddle():
    import random
    return random.choice(RIDDLES)


@app.route('/riddle')
def riddle():
    r = random_riddle()
    session['answer'] = str(r.get('a','')).strip().lower()
    session['unlocked'] = False
    return jsonify({'question': r.get('q')})


@app.route('/solve', methods=['POST'])
def solve():
    guess = (request.json.get('answer','') if request.is_json else request.form.get('answer',''))
    guess = str(guess).strip().lower()
    if 'answer' not in session:
        return jsonify({'ok': False, 'error': 'no-riddle'})
    if guess == session.get('answer'):
        session['unlocked'] = True
        return jsonify({'ok': True})
    return jsonify({'ok': False})


@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json() or request.form
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    message = (data.get('message') or '').strip()
    if not message:
        return jsonify({'ok': False, 'error': 'empty-message'}), 400
    fb = Feedback(name=name or None, email=email or None, message=message)
    db.session.add(fb)
    db.session.commit()
    return jsonify({'ok': True, 'id': fb.id})


@app.route('/api/feedbacks')
def list_feedbacks():
    try:
        page = max(1, int(request.args.get('page', '1')))
    except ValueError:
        page = 1
    try:
        pageSize = max(1, min(500, int(request.args.get('pageSize', '20'))))
    except ValueError:
        pageSize = 20
    total = db.session.query(func.count(Feedback.id)).scalar()
    rows = Feedback.query.order_by(Feedback.created_at.desc()).limit(pageSize).offset((page-1)*pageSize).all()
    feedbacks = [ { 'id': r.id, 'name': r.name, 'email': r.email, 'message': r.message, 'created_at': r.created_at.isoformat() } for r in rows ]
    return jsonify({'ok': True, 'total': total, 'page': page, 'pageSize': pageSize, 'feedbacks': feedbacks})


@app.route('/api/feedbacks.csv')
def export_csv():
    all_rows = request.args.get('all','').lower() in ('1','true','yes')
    def generate():
        out = io.StringIO()
        out.write('id,name,email,message,created_at\n')
        yield out.getvalue()
        out.seek(0)
        out.truncate(0)
        query = Feedback.query.order_by(Feedback.created_at.desc())
        if not all_rows:
            try:
                page = max(1, int(request.args.get('page', '1')))
            except ValueError:
                page = 1
            try:
                pageSize = max(1, min(5000, int(request.args.get('pageSize', '1000'))))
            except ValueError:
                pageSize = 1000
            query = query.limit(pageSize).offset((page-1)*pageSize)
        for r in query:
            # escape double quotes
            row = '"{}","{}","{}","{}","{}"\n'.format(r.id, (r.name or '').replace('"','""'), (r.email or '').replace('"','""'), (r.message or '').replace('"','""'), r.created_at.isoformat())
            yield row

    headers = {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename=feedbacks.csv'
    }
    return Response(generate(), headers=headers)


# Serve index and static files from public/ (Flask static is already configured)
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# simple config endpoint used by the front-end to populate links
LINKS = {
    'projects': 'https://github.com/mohitgitgeek',
    'youtube': 'https://www.youtube.com/c/MohitTheTechGeek/',
    'instagram': 'https://www.instagram.com/mohitvuyala2021/',
    'linkedin': 'https://www.linkedin.com/in/mohit-vuyala/',
    'blog': '/blog.html'
}

@app.route('/config')
def config():
    return jsonify({'links': LINKS})


# Debug helper: reveal the current riddle answer for local troubleshooting when enabled
@app.route('/_debug_answer')
def debug_answer():
    if os.environ.get('DEBUG_SHOW_ANSWER','0') != '1':
        return jsonify({'ok': False, 'error': 'disabled'}), 403
    return jsonify({'ok': True, 'answer': session.get('answer')})


if __name__ == '__main__':
    # Create tables if they don't exist (safe with PostgreSQL via SQLAlchemy)
    os.makedirs('data', exist_ok=True)
    with app.app_context():
        db.create_all()
    port = int(os.environ.get('PORT', '3000'))
    app.run(host='0.0.0.0', port=port, debug=True)
