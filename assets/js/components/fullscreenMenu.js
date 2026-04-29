import { pages } from '../data/pages.js';

export function createFullscreenMenu() {
  const currentPath = window.location.pathname;
  
  const pathParts = currentPath.split('/');
  const isProject = pathParts[1] === 'projects' && pathParts[2];
  const projectBase = isProject ? `/projects/${pathParts[2]}/` : '/';

  let menuHTML = `<div id="fullscreen-menu" class="fullscreen-menu"><nav class="fullscreen-nav"><ul>`;

  pages.forEach(page => {
    const absoluteHref = (page.href === './' || page.href === '/') 
      ? projectBase 
      : `${projectBase}${page.href}`;

    const isHomeItem = page.name === 'Home';
    const isActive = isHomeItem
      ? (currentPath === projectBase || currentPath === projectBase + 'index.html')
      : currentPath.startsWith(absoluteHref);

    menuHTML += `<li><a href="${absoluteHref}" ${isActive ? 'class="active"' : ''}>${page.name}</a></li>`;
  });

  menuHTML += `</ul></nav></div>`;

  const placeholder = document.getElementById('fullscreen-menu-placeholder');
  if (placeholder) placeholder.outerHTML = menuHTML;
}