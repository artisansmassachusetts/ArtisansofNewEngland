/* Small progressive enhancements; the site remains navigable without JavaScript. */
(() => {
  'use strict';

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
      const subject = `Massachusetts Artisans — ${fields.get('interest')}`;
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
