/* ============================================
   Scroll-triggered Animations
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initNavigation();
  initTypingEffect();
  initSmoothScroll();
  initActiveNavTracking();
});

/* ============================================
   Intersection Observer — Reveal on Scroll
   ============================================ */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ============================================
   Navigation — Scroll & Mobile
   ============================================ */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (!nav) return;

  // Scroll behavior — add background when scrolled
  let lastScroll = 0;
  window.addEventListener(
    'scroll',
    () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    },
    { passive: true }
  );

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    links.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ============================================
   Typing Effect — Hero Motto
   ============================================ */
function initTypingEffect() {
  const mottoEl = document.getElementById('hero-motto-text');
  if (!mottoEl) return;

  const fullText = mottoEl.getAttribute('data-text');
  if (!fullText) return;

  mottoEl.textContent = '';

  // Create cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  mottoEl.parentNode.appendChild(cursor);

  // Wait for the fade-in animation to complete before starting typing
  setTimeout(() => {
    let index = 0;
    const speed = 40;

    function type() {
      if (index < fullText.length) {
        mottoEl.textContent += fullText.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        // Remove cursor after typing is done (with a small delay)
        setTimeout(() => {
          cursor.style.animation = 'none';
          cursor.style.opacity = '0';
          cursor.style.transition = 'opacity 0.5s ease';
        }, 2000);
      }
    }

    type();
  }, 1200);
}

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/* ============================================
   Active Nav Link Tracking
   ============================================ */
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -40% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}
