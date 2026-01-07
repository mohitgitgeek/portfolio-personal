async function fetchRiddle(){
  const API_BASE = window.API_BASE || '';
  const res = await fetch(API_BASE + '/riddle');
  if(!res.ok) throw new Error('riddle fetch failed');
  return res.json();
}

async function loadConfig(){
  try{
    const API_BASE = window.API_BASE || '';
    const r = await fetch(API_BASE + '/config');
    if(r.ok) return r.json();
  }catch(e){}
  return { links: {} };
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const modal = document.getElementById('riddle-modal');
  const qEl = document.getElementById('riddle-question');
  const ansEl = document.getElementById('riddle-answer');
  const submit = document.getElementById('submit-answer');
  const refresh = document.getElementById('refresh-riddle');
  const feedback = document.getElementById('riddle-feedback');
  const main = document.getElementById('main-content');

  const links = await loadConfig();
  // populate links
  document.getElementById('link-projects').href = links.links.projects || '#';
  document.getElementById('link-youtube').href = links.links.youtube || '#';
  document.getElementById('link-instagram').href = links.links.instagram || '#';
  document.getElementById('link-linkedin').href = links.links.linkedin || '#';
  document.getElementById('link-blog').href = links.links.blog || '#';

  async function newRiddle(){
    feedback.textContent = '';
    ansEl.value = '';
    qEl.textContent = 'Loading...';
    try{
      const r = await fetchRiddle();
      qEl.textContent = r.question;
    }catch(e){
      qEl.textContent = 'Failed to load riddle';
    }
  }

  refresh.addEventListener('click', newRiddle);

  submit.addEventListener('click', async ()=>{
    const answer = ansEl.value.trim();
    if(!answer){ feedback.textContent = 'Please type an answer.'; return; }
    feedback.textContent = 'Checking…';
    try{
      const API_BASE = window.API_BASE || '';
      const res = await fetch(API_BASE + '/solve',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answer})});
      const j = await res.json();
      if(j.ok){
        feedback.textContent = 'Correct — unlocked!';
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
        main.classList.remove('hidden');
        try{ main.querySelector('h1')?.focus(); }catch(e){}
      }else{
        feedback.textContent = 'Incorrect — try again or get a new riddle.';
      }
    }catch(e){
      feedback.textContent = 'Network error.';
    }
  });

  const photoInput = document.getElementById('photo-input');
  const preview = document.getElementById('photo-preview');
  const saved = localStorage.getItem('profile-photo');
  if(saved) preview.src = saved;
  photoInput.addEventListener('change', ()=>{
    const f = photoInput.files && photoInput.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      preview.src = reader.result;
      localStorage.setItem('profile-photo', reader.result);
    };
    reader.readAsDataURL(f);
  });

  await newRiddle();
});
