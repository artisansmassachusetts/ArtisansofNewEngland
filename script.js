/* Small progressive enhancements; the site remains navigable without JavaScript. */
(() => {
  'use strict';

  // Apply the Artisans of New England brand across every page.
  document.title = document.title.replace(/Massachusetts Artisans/g, 'Artisans of New England');

  document.querySelectorAll('meta[name="description"]').forEach((meta) => {
    meta.content = meta.content
      .replace(/Massachusetts Artisans/g, 'Artisans of New England')
      .replace(/Massachusetts makers/g, 'New England makers')
      .replace(/across Massachusetts/g, 'across New England');
  });

  document.querySelectorAll('.brand').forEach((brand) => {
    const mark = brand.querySelector('.brand-mark');
    const name = brand.querySelector(':scope > span:last-child');
    if (mark) mark.textContent = 'ANE';
    if (name) name.innerHTML = 'Artisans of<br><b>New England</b>';
    if (brand.classList.contains('brand-footer')) {
      brand.removeAttribute('aria-label');
    } else {
      brand.setAttribute('aria-label', 'Artisans of New England home');
    }
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    node.textContent = node.textContent
      .replace(/Massachusetts Artisans/g, 'Artisans of New England')
      .replace(/Artisans Massachusetts/g, 'Artisans of New England');
  });

  // Apply self-hosted repository photos and artwork across all pages.
  const imageStyles = document.createElement('link');
  imageStyles.rel = 'stylesheet';
  imageStyles.href = 'repository-images.css';
  document.head.appendChild(imageStyles);

  // Style the Google Forms cards on the home page.
  if (document.querySelector('.get-involved .card-grid')) {
    const involvedCardStyles = document.createElement('link');
    involvedCardStyles.rel = 'stylesheet';
    involvedCardStyles.href = 'involved-cards.css';
    document.head.appendChild(involvedCardStyles);
  }

  // Add the larger brand logo before Home in the bottom navigation.
  const bottomNav = document.querySelector('.bottom-nav');
  if (bottomNav && !bottomNav.querySelector('.bottom-nav-brand')) {
    const logoLink = document.createElement('a');
    logoLink.className = 'bottom-nav-brand';
    logoLink.href = 'index.html';
    logoLink.setAttribute('aria-label', 'Artisans of New England home');

    const logo = document.createElement('img');
    logo.src = 'LOGO.png';
    logo.alt = '';
    logoLink.appendChild(logo);
    bottomNav.insertBefore(logoLink, bottomNav.firstChild);
  }

  // Professional mobile bottom navigation sizing and border.
  const bottomNavStyles = document.createElement('link');
  bottomNavStyles.rel = 'stylesheet';
  bottomNavStyles.href = 'bottom-navigation.css';
  document.head.appendChild(bottomNavStyles);

  const pageName = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.bottom-nav a[data-page]').forEach((link) => {
    if (link.dataset.page === pageName) {
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const interestField = document.querySelector('#interest');
  if (interestField) {
    const requestedInterest = new URLSearchParams(window.location.search).get('interest');
    const options = {
      mentoring: 'Finding a mentor',
      mentor: 'Becoming a mentor',
      skills: 'Skills and workshops',
      resources: 'Grants and resources',
    };
    if (requestedInterest && options[requestedInterest]) {
      interestField.value = options[requestedInterest];
    }
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const fields = new FormData(form);
      const recipient = form.dataset.email;
      const subject = `Artisans of New England — ${fields.get('interest')}`;
      const body = [
        `Name: ${fields.get('name')}`,
        `Email: ${fields.get('email')}`,
        `Interested in: ${fields.get('interest')}`,
        '',
        fields.get('message'),
      ].join('\n');
      const status = document.querySelector('[data-form-status]');
      if (status) status.textContent = 'Your email app should open with the message prepared. Please send it from there.';
      window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
