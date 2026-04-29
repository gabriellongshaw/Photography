import { pages } from '../data/pages.js';

export function createHeader() {
  const placeholder = document.getElementById('header-placeholder');
  const currentPath = window.location.pathname;

  if (!placeholder) return;

  const pathParts = currentPath.split('/');
  const isProject = pathParts[1] === 'projects' && pathParts[2];
  const projectBase = isProject ? `/projects/${pathParts[2]}/` : '/';

  const navItems = pages.map(page => {
    const absoluteHref = (page.href === './' || page.href === '/') 
      ? projectBase 
      : `${projectBase}${page.href}`;

    const isHomeItem = page.name === 'Home';
    const isActive = isHomeItem
      ? (currentPath === projectBase || currentPath === projectBase + 'index.html')
      : currentPath.startsWith(absoluteHref);

    return `<li><a href="${absoluteHref}" ${isActive ? 'class="active"' : ''}>${page.name}</a></li>`;
  }).join('');

  const headerElement = document.createElement('header');
  headerElement.className = 'header';
  headerElement.innerHTML = `
    <div class="header-container">
      <a href="${projectBase}" class="header-logo" aria-label="Photography Home">
        <span class="header-logo-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="13" r="4"></circle>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          </svg>
        </span>
        <span class="header-logo-text">Photography</span>
      </a>
      <nav class="header-nav" id="main-nav">
        <ul>
          ${navItems}
        </ul>
      </nav>
      <div class="header-actions">
        <button id="menu-toggle" class="header-toggle menu-toggle" aria-label="Toggle navigation menu">
          <div class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </button>
      </div>
    </div>
  `;

  placeholder.replaceWith(headerElement);
}