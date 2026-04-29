import { lockScroll, unlockScroll } from '../core/utils.js';

export function createLightbox() {
  const placeholder = document.getElementById('lightbox-placeholder');
  if (!placeholder) return;

  const el = document.createElement('div');
  el.className = 'lightbox';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <img class="lightbox-img" src="" alt="">
    <p class="lightbox-caption"></p>
  `;

  placeholder.replaceWith(el);
}

export function setupLightbox(gridSelector) {
  const grid = document.querySelector(gridSelector);
  const lightbox = document.querySelector('.lightbox');
  if (!grid || !lightbox) return;

  const img = lightbox.querySelector('.lightbox-img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  function open(src, alt, cap) {
    img.src = src;
    img.alt = alt || '';
    caption.textContent = cap || '';
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('active');
    lockScroll();
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    img.src = '';
    unlockScroll();
  }

  grid.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const i = item.querySelector('img');
    const cap = item.querySelector('figcaption')?.textContent || '';
    open(i.src.replace('400/300', '1200/900').replace('600/400', '1200/800'), i.alt, cap);
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('active')) close(); });
}