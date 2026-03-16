// Navbar: transparent over hero, solid when scrolled
const navbar = document.getElementById('navbar');
const heroHeight = () => document.getElementById('home').offsetHeight * 0.15;

function updateNav() {
  if (window.scrollY > heroHeight()) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// Smooth scroll for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Mobile accordion for Experience timeline
function setupAccordion() {
  const isMobile = window.innerWidth <= 768;
  document.querySelectorAll('.tl-card').forEach(card => {
    const existing = card.querySelector('.tl-toggle');
    if (isMobile) {
      if (existing) return; // already wired up
      const ul = card.querySelector('ul');
      if (!ul) return;
      const btn = document.createElement('button');
      btn.className = 'tl-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = 'Show Details <span class="tl-arrow">▾</span>';
      btn.addEventListener('click', () => {
        const isOpen = card.classList.toggle('tl-open');
        btn.setAttribute('aria-expanded', String(isOpen));
        btn.innerHTML = isOpen
          ? 'Hide Details <span class="tl-arrow">▾</span>'
          : 'Show Details <span class="tl-arrow">▾</span>';
      });
      card.appendChild(btn);
    } else {
      // On desktop, remove any toggle buttons and ensure bullets are visible
      if (existing) existing.remove();
      card.classList.remove('tl-open');
    }
  });
}

setupAccordion();
// Re-evaluate on resize (e.g. rotating device)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setupAccordion, 200);
}, { passive: true });

// Fade-in sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.tl-card, .cred-card, .skill-cat, .pub-item, .contact-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
