document.addEventListener('astro:page-load', () => {
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();

  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  theme && window.localStorage.setItem('theme', theme);

  const btnSunMoo = document.getElementById('themeToggle');

  btnSunMoo?.addEventListener('click', () => {
    const element = document.documentElement;
    // // element.classList.toggle('dark')

    // const isDark = element.classList.contains('dark')
    const isDark = element.getAttribute('data-theme');

    element.setAttribute('data-theme', isDark ? 'light' : 'dark');

    localStorage.setItem('theme', isDark ? 'light' : 'dark');

    // e.target.setAttribute('data-state', isDark ? 'moon' : 'sun')
  });
});
