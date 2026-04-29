import { lockScroll, unlockScroll } from './utils.js';

export function toggleMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const fullscreenMenu = document.getElementById('fullscreen-menu');

  if (!menuToggle || !fullscreenMenu) return;

  const isMenuOpen = fullscreenMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');

  if (isMenuOpen) {
    lockScroll();
  } else {
    unlockScroll();
  }
}