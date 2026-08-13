document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('.nav-item__link, .nav-mobile-ctas a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile accordion for dropdown nav items
  document.querySelectorAll('.nav-item.has-dropdown').forEach((item) => {
    const btn = item.querySelector('.nav-item__btn');
    btn.addEventListener('click', () => {
      if (window.innerWidth > 900) return;
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Sticky navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  const setNavbarShadow = () => {
    navbar.style.boxShadow = window.scrollY > 8 ? '0 4px 20px rgba(20,19,31,.06)' : 'none';
  };
  window.addEventListener('scroll', setNavbarShadow, { passive: true });
  setNavbarShadow();

  // Scroll-reveal animation
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  const freedomHero = document.querySelector('.hero--freedom');
  const freedomVisual = document.getElementById('freedomVisual');
  const freedomPhoto = document.querySelector('.hero__photo--freedom');
  const freedomCards = document.querySelectorAll('.hero-float-card');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateHeroCounters = () => {
    document.querySelectorAll('.hero-counter').forEach((counter) => {
      const target = Number(counter.dataset.counter || 0);
      const duration = 950;
      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  };

  if (freedomHero && !reduceMotion) {
    window.setTimeout(animateHeroCounters, 950);

    if (window.matchMedia('(min-width: 1121px)').matches && freedomVisual) {
      freedomVisual.addEventListener('pointermove', (event) => {
        const rect = freedomVisual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        if (freedomPhoto) {
          freedomPhoto.style.transform =
            `scale(1.055) translate3d(${x * -8}px, ${y * -6}px, 0)`;
        }

        freedomCards.forEach((card) => {
          const depth = Number(card.dataset.depth || 10);
          card.style.translate = `${x * depth}px ${y * depth}px`;
        });
      });

      freedomVisual.addEventListener('pointerleave', () => {
        if (freedomPhoto) {
          freedomPhoto.style.transform = 'scale(1.035) translate3d(0,0,0)';
        }

        freedomCards.forEach((card) => {
          card.style.translate = '0 0';
        });
      });
    }
  } else if (freedomHero) {
    document.querySelectorAll('.hero-counter').forEach((counter) => {
      counter.textContent = counter.dataset.counter || '0';
    });
  }
});
