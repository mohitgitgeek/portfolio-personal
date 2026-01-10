import requests
s=requests.Session()
base='http://127.0.0.1:3000'
print('GET /riddle')
r=s.get(base+'/riddle')
print(r.status_code, r.text)
print('Cookies after riddle:', s.cookies.get_dict())
resp=s.post(base+'/solve', json={'answer':'wrong'})
print('POST wrong ->', resp.status_code, resp.text)
