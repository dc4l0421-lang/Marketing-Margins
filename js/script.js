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
});
