const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.6);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

const toggle = document.getElementById('navToggle'), mm = document.getElementById('mobileMenu');
if (toggle && mm) {
  toggle.addEventListener('click', () => mm.classList.toggle('open'));
  mm.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mm.classList.remove('open')));
}

// video: make sure it plays, and hide it if the file is missing
const vid = document.querySelector('.ev-video');
if (vid) { vid.play?.().catch(() => {}); vid.addEventListener('error', () => {}, true); }

// slide-up reveal
const sec = document.querySelector('.ev-slideshow-section');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { sec.classList.add('visible'); io.disconnect(); } }), { threshold: 0.1 });
  io.observe(sec);
} else sec.classList.add('visible');

// slideshow
const track = document.getElementById('evTrack'), dots = document.getElementById('evDots'), count = document.getElementById('evCount');
let slides = Array.from(track.querySelectorAll('.ev-slide')), cur = 0, timer;

function build() {
  dots.innerHTML = '';
  slides.forEach((_, i) => { const b = document.createElement('button'); b.setAttribute('aria-label', 'Photo ' + (i + 1)); b.onclick = () => { go(i); restart(); }; dots.appendChild(b); });
  const none = slides.length === 0;
  document.getElementById('evSlideshow').hidden = none;
  document.getElementById('evEmpty').hidden = !none;
  if (slides.length) go(0);
}
function go(i) {
  cur = (i + slides.length) % slides.length;
  track.style.transform = `translateX(${-cur * 100}%)`;
  count.textContent = (cur + 1) + ' / ' + slides.length;
  dots.querySelectorAll('button').forEach((d, k) => d.classList.toggle('active', k === cur));
}
function restart() { clearInterval(timer); timer = setInterval(() => go(cur + 1), 4500); }

// drop slides whose image file is missing
const checks = slides.map(s => new Promise(res => {
  const img = s.querySelector('img');
  const fail = () => { s.remove(); res(); };
  if (img.complete) img.naturalWidth ? res() : fail();
  else { img.onload = res; img.onerror = fail; }
}));
Promise.all(checks).then(() => { slides = Array.from(track.querySelectorAll('.ev-slide')); build(); if (slides.length > 1) restart(); });

document.getElementById('evPrev').onclick = () => { go(cur - 1); restart(); };
document.getElementById('evNext').onclick = () => { go(cur + 1); restart(); };
const ss = document.getElementById('evSlideshow');
ss.addEventListener('mouseenter', () => clearInterval(timer));
ss.addEventListener('mouseleave', () => slides.length > 1 && restart());
let tx = null;
ss.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
ss.addEventListener('touchend', e => { if (tx === null) return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) { go(cur + (d < 0 ? 1 : -1)); restart(); } tx = null; });
document.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'ArrowRight') go(cur + 1); });

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
}));
