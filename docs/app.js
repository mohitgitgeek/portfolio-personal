async function loadConfig(){
  try{
    const API_BASE = window.API_BASE || '';
    const r = await fetch(API_BASE + '/config');
    if(r.ok) return r.json();
  }catch(e){}
  return { links: {} };
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const main = document.getElementById('main-content');

  const links = await loadConfig();
  // populate links
  const setIf = (id, val)=>{ const el = document.getElementById(id); if(el) el.href = val || '#'; };
  setIf('link-projects', links.links.projects);
  setIf('link-youtube', links.links.youtube);
  setIf('link-instagram', links.links.instagram);
  setIf('link-linkedin', links.links.linkedin);
  setIf('link-blog', links.links.blog);


  // Riddle feature removed for docs build
  if(main) main.style.display = '';

  const photoInput = document.getElementById('photo-input');
  const preview = document.getElementById('photo-preview');
  const saved = localStorage.getItem('profile-photo');
  if(saved) preview.src = saved;
  if(photoInput){
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
  }
});

