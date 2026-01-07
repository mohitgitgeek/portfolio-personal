#!/usr/bin/env python3
"""
Simple convenience script to submit feedback to the local server.
Usage: python scripts/submit_feedback.py
Requires: requests (pip install requests)
"""
import sys
try:
    import requests
except Exception:
    print('This script requires the requests package. Install with: pip install requests')
    sys.exit(1)

import os
API = os.environ.get('FEEDBACK_API') or 'http://localhost:3000/api/feedback'

def prompt(prompt_text):
    try:
        return input(prompt_text)
    except EOFError:
        return ''

if __name__ == '__main__':
    print('Submit feedback to', API)
    name = prompt('Name (optional): ').strip()
    email = prompt('Email (optional): ').strip()
    print('Enter message, finish with an empty line:')
    lines = []
    while True:
        try:
            line = input()
        except EOFError:
            break
        if line.strip() == '':
            break
        lines.append(line)
    message = '\n'.join(lines).strip()
    if not message:
        print('No message provided, aborting.')
        sys.exit(1)
    payload = {'name': name, 'email': email, 'message': message}
    try:
        r = requests.post(API, json=payload, timeout=10)
        r.raise_for_status()
        j = r.json()
        if j.get('ok'):
            print('Feedback submitted, id=', j.get('id'))
        else:
            print('Server returned error:', j)
    except Exception as e:
        print('Failed to submit feedback:', e)
