/* Small progressive enhancements; the site remains navigable without JavaScript. */
(() => {
  'use strict';

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

  // Bring the craft cards into the open space beside the skills-page hero copy.
  const skillsHero = document.querySelector('.page-hero-skills');
  const skillsGrid = document.querySelector('.skills-grid');
  const skillsSection = skillsGrid?.closest('section');
  const skillsHeading = skillsSection?.querySelector('.section-heading');
  if (skillsHero && skillsGrid && skillsSection && skillsHeading) {
    const skillsPanel = document.createElement('div');
    skillsPanel.className = 'skills-hero-panel';
    skillsPanel.append(skillsHeading, skillsGrid);
    skillsHero.appendChild(skillsPanel);
    skillsSection.remove();

    const skillsStyles = document.createElement('link');
    skillsStyles.rel = 'stylesheet';
    skillsStyles.href = 'skills-layout.css';
    document.head.appendChild(skillsStyles);
  }

  // Surface a few key resource links in the open space beside the resources hero copy.
  const resourcesHero = document.querySelector('.page-hero-resources');
  const resourcesList = document.querySelector('.resource-list');
  if (resourcesHero && resourcesList) {
    const featuredResources = Array.from(resourcesList.querySelectorAll('.resource-item')).slice(0, 3);
    if (featuredResources.length) {
      const resourcesPanel = document.createElement('section');
      resourcesPanel.className = 'resources-hero-panel';
      resourcesPanel.setAttribute('aria-labelledby', 'resources-hero-heading');
      resourcesPanel.innerHTML = '<div class="resources-hero-heading"><p class="eyebrow">A useful place to begin</p><h2 id="resources-hero-heading">Support for your next step.</h2><p>Explore trusted organizations offering funding, business guidance, and preservation support.</p></div><div class="resources-hero-grid"></div>';
      const resourcesGrid = resourcesPanel.querySelector('.resources-hero-grid');
      featuredResources.forEach((resource) => resourcesGrid.appendChild(resource));
      resourcesHero.appendChild(resourcesPanel);

      const resourcesStyles = document.createElement('link');
      resourcesStyles.rel = 'stylesheet';
      resourcesStyles.href = 'resources-layout.css';
      document.head.appendChild(resourcesStyles);
    }
  }

  // Use the circular logo as the Home item in the bottom navigation.
  const bottomNav = document.querySelector('.bottom-nav');
  const homeLink = bottomNav?.querySelector('a[data-page="index.html"]');
  if (homeLink && !homeLink.querySelector('img')) {
    const logo = document.createElement('img');
    logo.src = 'LOGO.png';
    logo.alt = 'Artisans of New England';
    homeLink.replaceChildren(logo);
    homeLink.classList.add('bottom-nav-home');
    homeLink.setAttribute('aria-label', 'Artisans of New England Home');
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
