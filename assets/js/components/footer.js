import { pages } from '../data/pages.js';

export function createFooter() {
  const placeholder = document.getElementById('footer-placeholder');
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

  const currentYear = new Date().getFullYear();
  const footerElement = document.createElement('footer');
  footerElement.className = 'footer';

  footerElement.innerHTML = `
    <div class="footer-content-wrapper">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-logo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M3 9a2 2 0 0 1 2-2h.5L7 5h10l1.5 2H21a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9z"></path>
            </svg>
          </span>
          <span class="footer-title">Photography</span>
        </div>
        <p class="footer-description">A practical guide to understanding light, exposure, and creative control in photography.</p>
      </div>

      <div class="footer-container">
        <div class="footer-section">
          <h3>Topics</h3>
          <ul>${navItems}</ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p><span class="copyright">&copy;</span> ${currentYear} Gabriel Longshaw. All rights reserved.</p>
      <p class="meta">"The heavens declare the glory of God; and the firmament shows His handiwork." — Psalm 19:1</p>
      <p>
        Website designed and developed by
        <a class="name" href="https://www.gabriellongshaw.co.uk/" target="_blank" rel="noopener">Gabriel Longshaw</a>.
      </p>
    </div>
  `;

  placeholder.replaceWith(footerElement);
}