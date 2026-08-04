/* ==========================================
   MANAV NIMESH MULTI-PAGE PORTFOLIO JAVASCRIPT
   Interactivity, Theme Switcher & Clean Route Handler
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarActiveLink();
  initMobileMenu();
  initSkillsFilter();
  initContactForm();
  initCanvasAnimation();
  initPdfDownloadHandler();
});

/* 1. Theme Switcher (Default: Light Mode) */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  const savedTheme = localStorage.getItem('manav_portfolio_theme') || 'light';

  if (savedTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('manav_portfolio_theme', 'light');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('manav_portfolio_theme', 'dark');
      }
    });
  }
}

/* 2. Navbar Active Link Highlighting for Clean Routes (/about, /services, /contact) */
function initNavbarActiveLink() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');

  navLinks.forEach(link => {
    const href = link.getAttribute('href').toLowerCase().replace(/\/$/, '');
    
    if (pathname.endsWith('/about') || pathname.endsWith('about.html')) {
      if (href.endsWith('about')) link.classList.add('active');
      else link.classList.remove('active');
    } else if (pathname.endsWith('/services') || pathname.endsWith('services.html')) {
      if (href.endsWith('services')) link.classList.add('active');
      else link.classList.remove('active');
    } else if (pathname.endsWith('/contact') || pathname.endsWith('contact.html')) {
      if (href.endsWith('contact')) link.classList.add('active');
      else link.classList.remove('active');
    } else {
      // Home page
      if (href === '.' || href === './' || href === '../' || href.endsWith('index.html') || href === '') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

/* 3. Mobile Menu Toggle */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle.querySelector('i')) {
          mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        }
      });
    });
  }
}

/* 4. Skills Filter */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const categoryBlocks = document.querySelectorAll('.skill-category-block');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      categoryBlocks.forEach(block => {
        const category = block.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });
}

/* 5. Contact & Hiring Details Form Handling */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const spinner = submitBtn ? submitBtn.querySelector('.spinner') : null;
  const formAlert = document.getElementById('form-alert');
  const inquirySelect = document.getElementById('inquiry-type');

  if (inquirySelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      if (serviceParam === 'educational-consultancy') {
        inquirySelect.value = 'educational-consultancy';
      } else if (serviceParam === 'private-tutoring') {
        inquirySelect.value = 'private-tutoring';
      } else if (serviceParam === 'board-prep') {
        inquirySelect.value = 'board-prep';
      } else if (serviceParam === 'school-faculty') {
        inquirySelect.value = 'school-faculty';
      }
    }
  }

  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: val => val.trim().length >= 2
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
    },
    phone: {
      input: document.getElementById('phone'),
      error: document.getElementById('phone-error'),
      validate: val => val.trim().length >= 8
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: val => val.trim().length >= 4
    }
  };

  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (field.input) {
      field.input.addEventListener('input', () => {
        if (field.validate(field.input.value)) {
          field.input.parentElement.classList.remove('error');
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field.input && !field.validate(field.input.value)) {
        field.input.parentElement.classList.add('error');
        isValid = false;
      } else if (field.input) {
        field.input.parentElement.classList.remove('error');
      }
    });

    if (!isValid) return;

    if (btnText) btnText.classList.add('hidden');
    if (spinner) spinner.classList.remove('hidden');
    submitBtn.disabled = true;

    setTimeout(() => {
      if (btnText) btnText.classList.remove('hidden');
      if (spinner) spinner.classList.add('hidden');
      submitBtn.disabled = false;

      if (formAlert) {
        formAlert.className = 'form-alert';
        formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your details have been submitted successfully. Manav Nimesh will get in touch with you shortly.';
        formAlert.classList.remove('hidden');
      }

      form.reset();

      setTimeout(() => {
        if (formAlert) formAlert.classList.add('hidden');
      }, 7000);
    }, 1200);
  });
}

/* 6. Forced PDF Download Handler */
function initPdfDownloadHandler() {
  const pdfLinks = document.querySelectorAll('a[download][href$=".pdf"]');
  pdfLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pdfUrl = link.getAttribute('href');
      const filename = link.getAttribute('download') || 'MANAV_NIMESH_RESUME.pdf';

      fetch(pdfUrl)
        .then(response => {
          if (!response.ok) throw new Error('PDF Network response was not ok');
          return response.blob();
        })
        .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const tempAnchor = document.createElement('a');
          tempAnchor.style.display = 'none';
          tempAnchor.href = blobUrl;
          tempAnchor.download = filename;
          document.body.appendChild(tempAnchor);
          tempAnchor.click();
          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(tempAnchor);
        })
        .catch(err => {
          console.warn('Blob download failed, falling back to direct location download:', err);
          window.location.href = pdfUrl;
        });
    });
  });
}

/* 7. Subtle Monochrome Background Particles Canvas */
function initCanvasAnimation() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, particles;

  function getParticleRgb() {
    return document.body.classList.contains('dark-theme') ? '255, 255, 255' : '17, 17, 17';
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.floor(width / 35);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.35 + 0.1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const rgb = getParticleRgb();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist / 100) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}
