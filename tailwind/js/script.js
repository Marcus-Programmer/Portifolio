document.addEventListener('DOMContentLoaded',()=>{initTheme();initScroll();initNav();initActiveLink()});
function initTheme(){
  const btn=document.getElementById('themeToggle');
  const icon=document.getElementById('themeIcon');
  const html=document.documentElement;
  const saved=localStorage.getItem('portfolio-theme')||'light';
  apply(saved);
  btn.addEventListener('click',()=>{
    const next=html.classList.contains('dark')?'light':'dark';
    apply(next);localStorage.setItem('portfolio-theme',next);
  });
  function apply(t){
    if(t==='dark'){html.classList.add('dark');icon.textContent='☀️';}
    else{html.classList.remove('dark');icon.textContent='🌙';}
  }
}
function initScroll(){
  const els=document.querySelectorAll('.anim');
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*60);obs.unobserve(e.target);}});
  },{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
  els.forEach(el=>obs.observe(el));
}
function initNav(){
  const nav=document.getElementById('mainNav');
  window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>50)});
  // Mobile menu
  const btn=document.getElementById('menuBtn');
  const menu=document.getElementById('mobileMenu');
  if(btn&&menu){
    btn.addEventListener('click',()=>menu.classList.toggle('hidden'));
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.add('hidden')));
  }
}
function initActiveLink(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
    });
  });
}
function handleFormSubmit(e){
  e.preventDefault();
  const btn=document.getElementById('btnSubmit');
  btn.textContent='✅ Enviado!';btn.disabled=true;
  setTimeout(()=>{btn.textContent='Enviar Mensagem';btn.disabled=false;e.target.reset();},3000);
  return false;
}
