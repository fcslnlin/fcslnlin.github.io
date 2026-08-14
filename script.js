// ============ NAV SCROLL ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ============ MOBILE MENU ============
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ============ HERO NAME — re-animate on scroll back ============
const heroName = document.getElementById('heroName');
const hero = document.querySelector('.hero');
let heroNameVisible = true;

if (heroName && hero) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!heroNameVisible) {
          heroName.classList.remove('hidden');
          heroName.classList.add('visible-again');
          heroNameVisible = true;
        }
      } else {
        heroName.classList.add('hidden');
        heroName.classList.remove('visible-again');
        heroNameVisible = false;
      }
    });
  }, { threshold: 0.3 });
  heroObserver.observe(hero);
}

// ============ HERO IMAGE — unblur on scroll into view ============
const heroImg = document.getElementById('heroImg');
const heroImageWrap = document.getElementById('heroImageWrap');

if (heroImg && heroImageWrap) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => heroImg.classList.add('unblurred'), 100);
        imgObserver.unobserve(heroImageWrap);
      }
    });
  }, { threshold: 0.2 });
  imgObserver.observe(heroImageWrap);
}

// ============ PARALLAX HERO IMAGE ============
const heroParallax = document.getElementById('heroParallax');
if (heroParallax && heroImageWrap) {
  window.addEventListener('scroll', () => {
    const rect = heroImageWrap.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const progress = -rect.top / (rect.height + window.innerHeight);
    heroParallax.style.transform = `translateY(${progress * 120}px)`;
  }, { passive: true });
}

// ============ SCROLL REVEAL ============
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// ============ SLIDE FROM RIGHT ============
function initSlideFromRight() {
  const els = document.querySelectorAll('.slide-from-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  els.forEach(el => observer.observe(el));
}

// ============ STAGGER IMAGE GRID ============
function initGridStagger() {
  document.querySelectorAll('.case-grid').forEach(grid => {
    grid.querySelectorAll('.case-grid-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.case-grid-item').forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, i * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    observer.observe(grid);
  });
}

// ============ STATS ANIMATION ============
function initStats() {
  document.querySelectorAll('.stat-num').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(12px)';
    stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(stat);
  });
}

// ============ WORK CARD SLIDESHOWS ============
function initSlideshows() {
  document.querySelectorAll('.work-card-slideshow').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    const prev = slideshow.querySelector('.slide-prev');
    const next = slideshow.querySelector('.slide-next');
    if (!slides.length) return;
    let current = 0;
    const go = (n) => {
      slides[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
    };
    if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); go(current - 1); });
    if (next) next.addEventListener('click', (e) => { e.stopPropagation(); go(current + 1); });
  });
}

// ============ LIGHTBOX ============
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const content = document.getElementById('lightboxContent');
  if (!lightbox) return;

  document.querySelectorAll('.case-grid-item:not(.grid-video-link)').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.dataset.caption;
      if (img && content) {
        content.innerHTML = `<img src="${img.src}" alt="${img.alt}" />${caption ? `<p class="lightbox-caption">${caption}</p>` : ''}`;
        lightbox.classList.add('open');
      }
    });
  });

  closeBtn?.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}

// ============ BRAND PILLS — scroll to grid ============
function initBrandPills() {
  document.querySelectorAll('.case-brands span').forEach(pill => {
    pill.style.cursor = 'pointer';
    pill.addEventListener('click', () => {
      const grid = document.getElementById('case-grid-openroad');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============ ACTIVE NAV ============
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--ink)' : '';
    });
  }, { passive: true });
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============ DEFIANT ONE VIDEO PLAYER ============
function initDefiantPlayer() {
  const video = document.getElementById('defiantVideo');
  const tracks = document.querySelectorAll('.defiant-track');
  const prev = document.getElementById('defiantPrev');
  const next = document.getElementById('defiantNext');
  if (!video || !tracks.length) return;

  let current = 0;

  const loadTrack = (index) => {
    tracks[current].classList.remove('active');
    current = (index + tracks.length) % tracks.length;
    tracks[current].classList.add('active');
    video.src = tracks[current].dataset.src;
    video.load();
    video.play().catch(() => {});
  };

  tracks.forEach((track, i) => {
    track.addEventListener('click', () => loadTrack(i));
  });

  prev?.addEventListener('click', () => loadTrack(current - 1));
  next?.addEventListener('click', () => loadTrack(current + 1));
}

// ============ REDUCED MOTION ============
function checkReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .slide-from-right').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('visible');
    });
    if (heroImg) heroImg.classList.add('unblurred');
  }
}

// ============ INIT ALL ============
document.addEventListener('DOMContentLoaded', () => {
  checkReducedMotion();
  initReveal();
  initSlideFromRight();
  initGridStagger();
  initStats();
  initSlideshows();
  initLightbox();
  initBrandPills();
  initActiveNav();
  initSmoothScroll();
  initDefiantPlayer();
});
