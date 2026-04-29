import { createHeader } from './components/header.js';
import { createFooter } from './components/footer.js';
import { createFullscreenMenu } from './components/fullscreenMenu.js';
import { createLightbox, setupLightbox } from './components/lightbox.js';
import { toggleMenu } from './core/menu.js';
import { lockScroll, unlockScroll } from './core/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('header-placeholder')) createHeader();
  if (document.getElementById('footer-placeholder')) createFooter();
  if (document.getElementById('fullscreen-menu-placeholder')) createFullscreenMenu();

  if (document.getElementById('lightbox-placeholder')) {
    createLightbox();
    setupLightbox('.gallery-grid');
  }

  document.addEventListener('click', e => {
    if (e.target.closest('#menu-toggle')) {
      toggleMenu();
      return;
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const fullscreenMenu = document.getElementById('fullscreen-menu');
      if (fullscreenMenu?.classList.contains('active')) toggleMenu();
    }
  });
});