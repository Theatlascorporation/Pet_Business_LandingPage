'use strict';

/* ================================================
   PawVita Care — Premium Pet Business Website
   script.js | Version 1.0.0
   ================================================
   TABLE OF CONTENTS
   ------------------
    1. Utility Functions (sanitizeText, isValidEmail, isValidPhone)
    2. Loading Screen Controller
    3. Header / Navigation Controller
    4. Scroll Reveal (Intersection Observer)
    5. Statistics Counter Animation
    6. FAQ Accordion
    7. Contact Form Validation & Submission
    8. Button Ripple Effect
    9. Footer Year
   10. Init (DOMContentLoaded)
   ================================================ */


/* ================================================
   1. UTILITY FUNCTIONS
   ================================================ */

/**
 * Sanitize a string to prevent XSS / HTML injection.
 * Never used with innerHTML — only with textContent.
 * Provided here as an extra safety layer for future extensibility.
 */
function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

/**
 * Validate an email address with a conservative RFC5322-like pattern.
 */
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(String(email).toLowerCase());
}

/**
 * Validate an optional phone number.
 * Accepts digits, spaces, dashes, dots, plus signs, and parentheses.
 */
function isValidPhone(phone) {
  if (!phone || phone.trim() === '') return true;
  const pattern = /^[\d\s\-\+\(\)\.]{7,20}$/;
  return pattern.test(phone.trim());
}


/* ================================================
   2. LOADING SCREEN CONTROLLER
   ================================================ */
const LoadingController = (() => {
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');

  if (!loader || !loaderBar) return { init: () => {} };

  let progress   = 0;
  let intervalId = null;

  function advanceBar() {
    if (progress >= 100) {
      clearInterval(intervalId);
      return;
    }
    progress = Math.min(progress + 2, 100);
    loaderBar.style.width = progress + '%';
  }

  function hideLoader() {
    setTimeout(() => {
      loader.classList.add('loader--hidden');
      document.body.style.overflow = '';
      triggerHeroReveal();
      loader.addEventListener('transitionend', () => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, { once: true });
    }, 350);
  }

  function triggerHeroReveal() {
    const heroElements = document.querySelectorAll('.hero-reveal');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('hero-reveal--visible');
      }, index * 140);
    });
  }

  function init() {
    document.body.style.overflow = 'hidden';

    intervalId = setInterval(advanceBar, 30);

    window.addEventListener('load', () => {
      clearInterval(intervalId);
      progress = 100;
      loaderBar.style.width = '100%';
      hideLoader();
    }, { once: true });

    // Safety fallback: force-hide after 4 seconds
    setTimeout(() => {
      if (loader && !loader.classList.contains('loader--hidden')) {
        clearInterval(intervalId);
        progress = 100;
        loaderBar.style.width = '100%';
        hideLoader();
      }
    }, 4000);
  }

  return { init };
})();


/* ================================================
   3. HEADER / NAVIGATION CONTROLLER
   ================================================ */
const NavigationController = (() => {
  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const headerNav = document.getElementById('headerNav');
  const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

  if (!header) return { init: () => {} };

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    updateActiveLink();
  }

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('hamburger--open');
    headerNav.classList.add('header__nav--open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('hamburger--open');
    headerNav.classList.remove('header__nav--open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (hamburger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentId   = '';

    document.querySelectorAll('main section[id]').forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('nav__link--active');
      }
    });
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });

    if (hamburger && headerNav) {
      hamburger.addEventListener('click', toggleMenu);

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });

      // Close menu on outside click
      document.addEventListener('click', (e) => {
        if (
          headerNav.classList.contains('header__nav--open') &&
          !headerNav.contains(e.target) &&
          !hamburger.contains(e.target)
        ) {
          closeMenu();
        }
      });

      // Close menu on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && headerNav.classList.contains('header__nav--open')) {
          closeMenu();
          hamburger.focus();
        }
      });
    }

    onScroll(); // Run on init
  }

  return { init };
})();


/* ================================================
   4. SCROLL REVEAL (Intersection Observer)
   ================================================ */
const ScrollRevealController = (() => {
  const elements = document.querySelectorAll('.reveal');

  function init() {
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.10,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(el => observer.observe(el));
  }

  return { init };
})();


/* ================================================
   5. STATISTICS COUNTER ANIMATION
   ================================================ */
const StatsController = (() => {
  const statNumbers = document.querySelectorAll('.stat-item__number[data-target]');
  let hasAnimated   = false;

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    function tick(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(tick);
  }

  function init() {
    if (!statNumbers.length) return;

    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach(el => animateCounter(el));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.40 }
    );

    observer.observe(statsSection);
  }

  return { init };
})();


/* ================================================
   6. FAQ ACCORDION
   ================================================ */
const FAQController = (() => {
  const faqItems = document.querySelectorAll('.faq-item');

  function openItem(item) {
    const question = item.querySelector('.faq-item__question');
    const answer   = item.querySelector('.faq-item__answer');
    item.classList.add('faq-item--open');
    if (question) question.setAttribute('aria-expanded', 'true');
    if (answer)   answer.setAttribute('aria-hidden', 'false');
  }

  function closeItem(item) {
    const question = item.querySelector('.faq-item__question');
    const answer   = item.querySelector('.faq-item__answer');
    item.classList.remove('faq-item--open');
    if (question) question.setAttribute('aria-expanded', 'false');
    if (answer)   answer.setAttribute('aria-hidden', 'true');
  }

  function toggleItem(item) {
    const isOpen = item.classList.contains('faq-item--open');

    // Close all other items (accordion behaviour)
    faqItems.forEach(other => {
      if (other !== item) closeItem(other);
    });

    if (isOpen) {
      closeItem(item);
    } else {
      openItem(item);
    }
  }

  function init() {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-item__question');
      if (!question) return;

      // click covers both mouse and keyboard (Enter/Space) on <button>
      question.addEventListener('click', () => toggleItem(item));
    });
  }

  return { init };
})();


/* ================================================
   7. CONTACT FORM VALIDATION & SUBMISSION
   ================================================ */
const FormController = (() => {
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('formSubmit');

  if (!form) return { init: () => {} };

  const fields = {
    name:    {
      input:   document.getElementById('contact-name'),
      errorEl: document.getElementById('name-error'),
    },
    email:   {
      input:   document.getElementById('contact-email'),
      errorEl: document.getElementById('email-error'),
    },
    phone:   {
      input:   document.getElementById('contact-phone'),
      errorEl: document.getElementById('phone-error'),
    },
    message: {
      input:   document.getElementById('contact-message'),
      errorEl: document.getElementById('message-error'),
    },
  };

  function setError(key, message) {
    const field = fields[key];
    if (!field) return;
    if (field.input)   field.input.classList.add('form-input--error');
    if (field.errorEl) field.errorEl.textContent = message;
  }

  function clearError(key) {
    const field = fields[key];
    if (!field) return;
    if (field.input)   field.input.classList.remove('form-input--error');
    if (field.errorEl) field.errorEl.textContent = '';
  }

  function clearAllErrors() {
    Object.keys(fields).forEach(key => clearError(key));
  }

  function validate() {
    let isValid = true;
    clearAllErrors();

    // Name
    const nameVal = fields.name.input ? fields.name.input.value.trim() : '';
    if (!nameVal) {
      setError('name', 'Please enter your full name.');
      isValid = false;
    } else if (nameVal.length < 2 || nameVal.length > 100) {
      setError('name', 'Name must be between 2 and 100 characters.');
      isValid = false;
    }

    // Email
    const emailVal = fields.email.input ? fields.email.input.value.trim() : '';
    if (!emailVal) {
      setError('email', 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(emailVal)) {
      setError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    // Phone (optional)
    const phoneVal = fields.phone.input ? fields.phone.input.value.trim() : '';
    if (phoneVal && !isValidPhone(phoneVal)) {
      setError('phone', 'Please enter a valid phone number.');
      isValid = false;
    }

    // Message
    const msgVal = fields.message.input ? fields.message.input.value.trim() : '';
    if (!msgVal) {
      setError('message', 'Please write a message.');
      isValid = false;
    } else if (msgVal.length < 10) {
      setError('message', 'Message must be at least 10 characters.');
      isValid = false;
    } else if (msgVal.length > 2000) {
      setError('message', 'Message must not exceed 2000 characters.');
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      const firstError = form.querySelector('.form-input--error');
      if (firstError) firstError.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      // Use textContent — never innerHTML with user data
      submitBtn.textContent = 'Sending…';
    }

    // Simulate async form submission (demo)
    setTimeout(() => {
      form.setAttribute('aria-hidden', 'true');
      form.style.display = 'none';

      if (formSuccess) {
        formSuccess.setAttribute('aria-hidden', 'false');
        formSuccess.classList.add('form-success--visible');
        formSuccess.focus();
      }
    }, 1400);
  }

  function handleInput(e) {
    const name = e.target.getAttribute('name');
    if (name && fields[name]) {
      clearError(name);
    }
  }

  function init() {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input',  handleInput);
  }

  return { init };
})();


/* ================================================
   8. BUTTON RIPPLE EFFECT
   ================================================ */
const RippleController = (() => {
  function createRipple(e) {
    const button = e.currentTarget;
    const rect   = button.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.width  = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left   = x + 'px';
    ripple.style.top    = y + 'px';

    // Remove any leftover ripples before appending
    const oldRipples = button.querySelectorAll('.ripple');
    oldRipples.forEach(r => r.parentNode && r.parentNode.removeChild(r));

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, { once: true });
  }

  function init() {
    const rippleButtons = document.querySelectorAll('.btn--ripple');
    rippleButtons.forEach(btn => {
      btn.addEventListener('click', createRipple);
    });
  }

  return { init };
})();


/* ================================================
   9. FOOTER YEAR
   ================================================ */
function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) {
    el.textContent = String(new Date().getFullYear());
  }
}


/* ================================================
   10. INIT
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  LoadingController.init();
  NavigationController.init();
  ScrollRevealController.init();
  StatsController.init();
  FAQController.init();
  FormController.init();
  RippleController.init();
  setFooterYear();
});
