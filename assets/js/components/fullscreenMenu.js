import { pages } from '../data/pages.js';

export function createFullscreenMenu() {
  const currentPath = window.location.pathname;
  let menuHTML = `<div id="fullscreen-menu" class="fullscreen-menu"><nav class="fullscreen-nav"><ul>`;

  pages.forEach(page => {
    const isHome = page.href === '/';
    const isActive = isHome
      ? (currentPath === '/' || currentPath === '/index.html')
      : currentPath.startsWith(page.href);

    menuHTML += `<li><a href="${page.href}" ${isActive ? 'class="active"' : ''}>${page.name}</a></li>`;
  });

  menuHTML += `</ul></nav></div>`;

  const placeholder = document.getElementById('fullscreen-menu-placeholder');
  if (placeholder) placeholder.outerHTML = menuHTML;
}