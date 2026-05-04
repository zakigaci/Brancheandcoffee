/* =============================================
   BRANCH & CAFFÈ — JavaScript
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVIGATION ────────────────────────── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll-based nav transparency
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── MENU TABS ─────────────────────────── */
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('.menu__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── REVIEWS CAROUSEL ──────────────────── */
  const track = document.getElementById('reviewTrack');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');
  const dotsContainer = document.getElementById('reviewDots');

  if (track) {
    const cards = track.querySelectorAll('.review-card');
    let current = 0;

    const getVisible = () => {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    };

    const totalSlides = () => Math.ceil(cards.length / getVisible());

    // Build dots
    const buildDots = () => {
      dotsContainer.innerHTML = '';
      const count = totalSlides();
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = `reviews__dot${i === current ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    };

    const updateDots = () => {
      dotsContainer.querySelectorAll('.reviews__dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    };

    const goTo = (index) => {
      const vis = getVisible();
      const max = totalSlides() - 1;
      current = Math.max(0, Math.min(index, max));

      // Calculate how far to shift
      const cardWidth = cards[0].offsetWidth;
      const gap = 24; // 1.5rem gap
      const offset = current * vis * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      updateDots();
    };

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-advance
    let autoplay = setInterval(() => goTo(current + 1 >= totalSlides() ? 0 : current + 1), 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1 >= totalSlides() ? 0 : current + 1), 5000);
    });

    // Touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
      }
    }, { passive: true });

    buildDots();
    window.addEventListener('resize', () => {
      buildDots();
      goTo(0);
    });
  }

  /* ── SCROLL ANIMATIONS ─────────────────── */
  const observeEls = document.querySelectorAll(
    '.about__text, .about__visual, .menu__container, .visit__info, .visit__map, .gallery__item, .review-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  observeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.05}s, transform 0.7s ease ${i * 0.05}s`;
    observer.observe(el);
  });

  /* ── SMOOTH ACTIVE NAV LINK ────────────── */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinkEls = document.querySelectorAll('.nav__link[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--cream)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── GALLERY LIGHTBOX ──────────────────── */
  const galleryItems = document.querySelectorAll('.gallery__item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(26,15,7,0.95);
        display: flex; align-items: center; justify-content: center;
        cursor: zoom-out; animation: fade-in 0.3s ease;
      `;

      const image = document.createElement('img');
      image.src = img.src;
      image.style.cssText = `
        max-width: 90vw; max-height: 90vh;
        object-fit: contain; width: auto; height: auto;
        box-shadow: 0 0 60px rgba(0,0,0,0.5);
      `;

      const close = document.createElement('button');
      close.innerHTML = '×';
      close.style.cssText = `
        position: absolute; top: 1.5rem; right: 2rem;
        font-size: 2.5rem; color: var(--cream); background: none;
        border: none; cursor: pointer; line-height: 1;
        font-family: var(--font-display);
      `;

      overlay.appendChild(image);
      overlay.appendChild(close);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const closeLightbox = () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      };

      close.addEventListener('click', closeLightbox);
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeLightbox();
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
      }, { once: true });
    });
  });

  /* ── HERO PARALLAX ─────────────────────── */
  const heroBg = document.querySelector('.hero__bg');
  window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    }
  }, { passive: true });

});
