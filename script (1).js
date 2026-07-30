// ============ NAV SCROLL ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ============ MOBILE MENU ============
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ============ PARALLAX HERO IMAGE ============
const heroParallax = document.getElementById('heroParallax');
if (heroParallax) {
  const heroWrap = heroParallax.parentElement;
  window.addEventListener('scroll', () => {
    const rect = heroWrap.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const progress = -rect.top / (rect.height + window.innerHeight);
    const offset = progress * 120;
    heroParallax.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}

// ============ SCROLL REVEAL ============
// Use a short delay to ensure DOM is ready
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    revealEls.forEach(el => el.classList.add('visible'));
  }
}

// ============ STAGGER IMAGE GRID ============
function initGridStagger() {
  const grids = document.querySelectorAll('.case-grid');
  if (!grids.length) return;

  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.case-grid-item');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, i * 100);
        });
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  grids.forEach(grid => {
    grid.querySelectorAll('.case-grid-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    gridObserver.observe(grid);
  });
}

// ============ HERO TEXT COUNTER ============
function initStats() {
  const stats = document.querySelectorAll('.stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(12px)';
    stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    statObserver.observe(stat);
  });
}

// ============ ACTIVE NAV ============
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.color = href === current ? 'var(--ink)' : '';
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

// ============ REDUCED MOTION ============
function checkReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('visible');
    });
  }
}

// ============ INIT ALL ============
document.addEventListener('DOMContentLoaded', () => {
  checkReducedMotion();
  initReveal();
  initGridStagger();
  initStats();
  initActiveNav();
  initSmoothScroll();
});
