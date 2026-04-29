export function lockScroll() {
  const scrollY = window.scrollY;
  document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
  document.documentElement.classList.add('scroll-lock');
  document.documentElement.style.top = `-${scrollY}px`;
}

export function unlockScroll() {
  const fullscreenMenu = document.getElementById('fullscreen-menu');
  const lightbox = document.querySelector('.lightbox');

  const anyOpen = [fullscreenMenu, lightbox].some(el => el?.classList.contains('active'));

  if (anyOpen) return;

  const scrollY = parseInt(document.documentElement.style.getPropertyValue('--scroll-y') || '0');
  document.documentElement.classList.remove('scroll-lock');
  document.documentElement.style.top = '';
  document.documentElement.style.removeProperty('--scroll-y');
  window.scrollTo(0, scrollY);
}