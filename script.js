/* Progressive enhancement: the content and FAQ remain usable without JavaScript. */
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileViewport = window.matchMedia('(max-width: 900px)');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
}

menuButton.hidden = false;
document.documentElement.classList.add('js-enabled');
menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header-inner')) setMenu(false);
});
mobileViewport.addEventListener('change', () => setMenu(false));

const form = document.querySelector('#sample-form');
const formStatus = document.querySelector('#form-status');
const interest = document.querySelector('#interest');
const message = document.querySelector('#message');

// Attach the safe submit handler before enabling fields. Inputs intentionally
// have no name attributes, so even an accidental native submit contains no data.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  formStatus.textContent = 'Demo request completed. No request has been sent.';
  formStatus.classList.add('is-visible');
  form.reset();
});

// Native validation does not reject whitespace-only text; handle that locally.
for (const input of form.querySelectorAll('input[required]')) {
  input.addEventListener('input', () => {
    input.setCustomValidity(input.value.trim() ? '' : 'Please enter a value, not just spaces.');
  });
}
form.addEventListener('input', () => {
  formStatus.textContent = '';
  formStatus.classList.remove('is-visible');
});
document.querySelector('#sample-fields').disabled = false;

// Each product link carries its context into the demonstration form.
for (const link of document.querySelectorAll('[data-interest]')) {
  link.addEventListener('click', () => {
    interest.value = link.dataset.interest;
    if (!message.value || message.dataset.prefilled === message.value) {
      message.value = `I would like to explore ${link.dataset.coffee}.`;
      message.dataset.prefilled = message.value;
    }
    formStatus.textContent = '';
    formStatus.classList.remove('is-visible');
  });
}
