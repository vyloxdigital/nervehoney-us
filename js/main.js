/* ═══════════════════════════════════════════════════════
   NerveHoney USA — main.js
   Features: Nav scroll, hamburger, scroll-reveal,
             stat counters, rating bars, FAQ accordion,
             scroll-to-top, lazy polyfill, ticker pause
═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  const header = document.getElementById('site-header');
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
    toggleScrollTop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      navLinks.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // close on nav link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV LINK ── */
  const sections = Array.from(document.querySelectorAll('section[id], div[id]'));
  const navItems = Array.from(document.querySelectorAll('.nav-link'));
  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(s => {
      if (s.offsetTop <= scrollY) current = s.id;
    });
    navItems.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => revealObs.observe(el));
  } else {
    // fallback: show all
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ── STAT COUNTERS ── */
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if ('IntersectionObserver' in window) {
    const statObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          statObs.unobserve(e.target);
          const el = e.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const start = performance.now();
          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            const value = target * eased;
            const display = Number.isInteger(target)
              ? Math.round(value).toLocaleString()
              : value.toFixed(1);
            el.textContent = display + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    statNums.forEach(el => statObs.observe(el));
  }

  /* ── RATING BARS ── */
  const rbFills = document.querySelectorAll('.rb-fill[data-width]');
  if ('IntersectionObserver' in window) {
    const rbObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          rbObs.unobserve(e.target);
          const pct = parseInt(e.target.dataset.width, 10) || 0;
          e.target.style.width = pct + '%';
        });
      },
      { threshold: 0.3 }
    );
    rbFills.forEach(el => rbObs.observe(el));
  } else {
    rbFills.forEach(el => { el.style.width = (el.dataset.width || 0) + '%'; });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // close all
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.closest('.faq-item').classList.remove('open');
        const a = document.getElementById(b.getAttribute('aria-controls'));
        if (a) a.hidden = true;
      });
      // open this if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.closest('.faq-item').classList.add('open');
        const answer = document.getElementById(btn.getAttribute('aria-controls'));
        if (answer) answer.hidden = false;
      }
    });
  });

  /* ── SCROLL-TO-TOP ── */
  const scrollTopBtn = document.getElementById('scrollTop');
  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 500) {
      scrollTopBtn.hidden = false;
    } else {
      scrollTopBtn.hidden = true;
    }
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── TICKER PAUSE ON HOVER ── */
  const tickerWrap = document.querySelector('.ticker-wrap');
  if (tickerWrap) {
    const track = tickerWrap.querySelector('.ticker-track');
    tickerWrap.addEventListener('mouseenter', () => { if (track) track.style.animationPlayState = 'paused'; });
    tickerWrap.addEventListener('mouseleave', () => { if (track) track.style.animationPlayState = 'running'; });
    tickerWrap.addEventListener('focusin', () => { if (track) track.style.animationPlayState = 'paused'; });
    tickerWrap.addEventListener('focusout', () => { if (track) track.style.animationPlayState = 'running'; });
  }

  /* ── LAZY IMAGE POLYFILL ── */
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const lazyObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const img = e.target;
            img.src = img.dataset.src || img.src;
            lazyObs.unobserve(img);
          }
        });
      });
      lazyImgs.forEach(img => lazyObs.observe(img));
    } else {
      lazyImgs.forEach(img => { img.src = img.dataset.src || img.src; });
    }
  }

  /* ── INIT ── */
  onScroll();
})();
