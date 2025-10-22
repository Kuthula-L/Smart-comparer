const templateURL = new URL('./sort-popup.html', import.meta.url).href;

async function loadTemplate() {
  if (document.getElementById('sort-popup-template')) return;

  const res = await fetch(templateURL);
  const html = await res.text();

  const container = document.createElement('div');
  container.innerHTML = html;
  const template = container.querySelector('template');

  document.body.appendChild(template);
}

await loadTemplate();

class SortPopup extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('sort-popup-template');
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    this.sortBtn = shadow.querySelector('.sort-btn');
    this.popup = shadow.querySelector('.popup');
    this.confirmBtn = shadow.querySelector('.confirm-btn');
  }

  connectedCallback() {
    this.sortBtn.addEventListener('click', () => {
      this.popup.classList.toggle('show');
    });

    this.confirmBtn.addEventListener('click', () => {
      const selected = [...this.shadowRoot.querySelectorAll('input[name="sort"]:checked')]
        .map(input => input.value);
      console.log('Selected sort:', selected);
      this.popup.classList.remove('show');
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.popup.classList.remove('show');
      }
    });
  }
}

customElements.define('sort-popup', SortPopup);
