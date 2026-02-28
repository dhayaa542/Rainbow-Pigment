/* ======================================================
   Rainbow Pigment – Shared JavaScript
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initTestimonialCarousel();
  initForms();
  initCounters();
});

/* ---------- NAVIGATION ---------- */
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');
  const navbar = document.querySelector('.navbar');
  const links = document.querySelectorAll('.nav-links a');

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close on link click (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Sticky nav scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- TESTIMONIAL CAROUSEL ---------- */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.testimonial-dots .dot');

  if (!track || dots.length === 0) return;

  let current = 0;
  const total = dots.length;

  function goToSlide(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-play
  setInterval(() => {
    goToSlide((current + 1) % total);
  }, 5000);

  // Initialize
  goToSlide(0);
}

/* ---------- FORMS ---------- */
function initForms() {
  const forms = document.querySelectorAll('form[data-form]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate sending
      setTimeout(() => {
        form.style.display = 'none';
        const success = form.parentElement.querySelector('.form-success');
        if (success) {
          success.classList.add('show');
        }

        // Reset after 5 seconds
        setTimeout(() => {
          form.style.display = '';
          form.reset();
          btn.textContent = originalText;
          btn.disabled = false;
          if (success) success.classList.remove('show');
        }, 5000);
      }, 1500);
    });
  });
}

/* ---------- COUNTER ANIMATION ---------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');

  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        animateCounter(entry.target, target, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, suffix) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 25);
}

/* ---------- SMOOTH SCROLL for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 90;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});
