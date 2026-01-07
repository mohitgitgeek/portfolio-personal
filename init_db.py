"""
Run this script to initialize the database tables.
Set DATABASE_URL environment variable to your PostgreSQL URI, e.g.: 
  postgresql://user:pass@localhost:5432/portfolio
If DATABASE_URL is not set, a local sqlite DB at data/feedback.db will be used.
"""
import os
from server import app, db

if __name__ == '__main__':
  os.makedirs('data', exist_ok=True)
  with app.app_context():
    db.create_all()
  print('Database initialized.')
