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
# badge assets removed as part of rollback
print('\nRiddle endpoints removed; skipping riddle flow checks.')

ok_overall = all(r[1] for r in results if isinstance(r[2], int))
print('\nSummary:')
for p,ok,code in results:
    print(f'- {p}:', 'OK' if ok else f'FAIL ({code})')
print('\nOverall:', 'PASS' if ok_overall else 'FAIL')
