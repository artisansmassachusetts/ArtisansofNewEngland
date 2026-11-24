/* Matching requests are sent only when the visitor reviews and sends an email draft. */
(() => {
  'use strict';
  const form = document.querySelector('[data-pairing-form]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const subject = `Artisans of New England — Learning match: ${values.get('interest')}`;
    const body = [
      `Name: ${values.get('name')}`,
      `Email: ${values.get('email')}`,
      `Interested in: ${values.get('role')}`,
      `Craft or trade: ${values.get('interest')}`,
      `Region: ${values.get('region')}`,
      `Preferred format: ${values.get('format')}`,
      '', 'Goals and details:', values.get('goals'), '',
      'The requester agreed that this information may be used to respond to this matching request.'
    ].join('\n');
    const status = document.querySelector('[data-pairing-status]');
    if (status) status.textContent = 'Your email app should open with a draft. Review it and send it to request an introduction.';
    window.location.href = `mailto:${encodeURIComponent(form.dataset.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
