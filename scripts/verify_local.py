import requests

base = 'http://127.0.0.1:3000'
s = requests.Session()
results = []

def check(path, expect=200, desc=None):
    url = base + path
    try:
        r = s.get(url, timeout=10)
        ok = (r.status_code == expect)
        results.append((path, ok, r.status_code))
        print(f'{path}: {r.status_code} (expected {expect})')
        return r
    except Exception as e:
        results.append((path, False, str(e)))
        print(f'{path}: ERROR {e}')
        return None

print('Checking site and assets...')
check('/')
check('/style.css')
check('/app.js')
check('/config')
check('/assets/github_foundations_thumb.png')
check('/assets/aws_generative_ai_thumb.png')

print('\nTesting riddle flow (session-based)')
r = check('/riddle')
if r and r.status_code==200:
    # try debug endpoint
    dbg = check('/_debug_answer', expect=200)
    if dbg and dbg.status_code==200:
        try:
            ans = dbg.json().get('answer')
            print('Server answer (debug):', ans)
            if ans:
                sol = s.post(base + '/solve', json={'answer': ans})
                print('/solve POST ->', sol.status_code, sol.text)
                results.append(('/solve', sol.status_code==200, sol.status_code))
        except Exception as e:
            print('Debug parse error', e)
    else:
        print('Debug endpoint disabled; cannot auto-solve')

ok_overall = all(r[1] for r in results if isinstance(r[2], int))
print('\nSummary:')
for p,ok,code in results:
    print(f'- {p}:', 'OK' if ok else f'FAIL ({code})')
print('\nOverall:', 'PASS' if ok_overall else 'FAIL')
