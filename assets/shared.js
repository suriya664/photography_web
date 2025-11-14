(function () {
  const root = document.documentElement;
  const body = document.body;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const downloadPortfolio = document.getElementById('downloadPortfolio');
  const yearEl = document.getElementById('year');
  const animationTargets = document.querySelectorAll('.animate-on-scroll');

  const updateThemeIcon = () => {
    if (!themeIcon) return;
    const isDark = root.classList.contains('dark');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
  };

  const applyTheme = (theme, { persist = true } = {}) => {
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('bg-gray-950', 'text-gray-100');
    } else {
      root.classList.remove('dark');
      body.classList.remove('bg-gray-950', 'text-gray-100');
    }

    if (persist) {
      localStorage.setItem('theme', theme);
    }

    updateThemeIcon();
  };

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    applyTheme(storedTheme, { persist: false });
  } else {
    applyTheme(prefersDarkScheme.matches ? 'dark' : 'light', { persist: false });
  }

  prefersDarkScheme.addEventListener('change', (event) => {
    if (localStorage.getItem('theme')) return;
    applyTheme(event.matches ? 'dark' : 'light', { persist: false });
  });

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  downloadPortfolio?.addEventListener('click', () => {
    window.print();
  });

  if (animationTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    animationTargets.forEach((el) => observer.observe(el));
  }
})();

