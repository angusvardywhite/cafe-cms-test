const navButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (navButton && nav) {
  navButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navButton.setAttribute('aria-expanded', String(isOpen));
    navButton.textContent = isOpen ? 'Close' : 'Menu';
  });
}
