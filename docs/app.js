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
  document.getElementById('link-projects').href = links.links.projects || '#';
  document.getElementById('link-youtube').href = links.links.youtube || '#';
  document.getElementById('link-instagram').href = links.links.instagram || '#';
  document.getElementById('link-linkedin').href = links.links.linkedin || '#';
  document.getElementById('link-blog').href = links.links.blog || '#';


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

