// elementos
const body         = document.body;
const themeToggle  = document.getElementById('theme-toggle');
const toggleBtn    = document.getElementById('menu-toggle');
const navbar       = document.getElementById('navbar');
const backToTopBtn = document.getElementById('back-to-top');
const links        = document.querySelectorAll('.nav-link');
const counters     = document.querySelectorAll('.counter-value');
const contactForm  = document.getElementById('contact-form');

// 1. Tema (light/dark) + persistência
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

function applyTheme(theme) {
  body.classList.toggle('dark-mode', theme === 'dark');
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
applyTheme(currentTheme);
themeToggle.addEventListener('click', () => {
  currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(currentTheme);
});

// 2. Mobile menu toggle
toggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

// 3. Scroll-spy e Back-to-Top
window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 80;

  // scroll-spy
  links.forEach(link => {
    const section = document.querySelector(link.hash);
    if (!section) return;
    link.classList.toggle('active',
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    );
  });

  // back-to-top
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// scroll-to-top
backToTopBtn.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// 4. Contadores animados on view
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;
      const step = Math.ceil(target / 100);
      const timer = setInterval(() => {
        count += step;
        el.textContent = count > target ? target : count;
        if (count >= target) clearInterval(timer);
      }, 20);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

counters.forEach(el => counterObserver.observe(el));

// 5. Formulário de contato
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Obrigado! Sua mensagem foi recebida e entraremos em contato em breve.');
  contactForm.reset();
});