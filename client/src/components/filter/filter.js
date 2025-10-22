const filterTemplateURL = new URL('./filter.html', import.meta.url).href;

async function loadFilterTemplate() {
  if (document.getElementById('filter-popup-template')) return;

  const res = await fetch(filterTemplateURL);
  const html = await res.text();

  const container = document.createElement('div');
  container.innerHTML = html;
  const template = container.querySelector('template');

  document.body.appendChild(template);
}

await loadFilterTemplate();

class FilterPopup extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('filter-popup-template');
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    this.filterBtn = shadow.querySelector('.filter-btn');
    this.popup = shadow.querySelector('.popup');
    this.confirmBtn = shadow.querySelector('.confirm-btn');
  }

  connectedCallback() {
    this.filterBtn.addEventListener('click', () => {
      this.popup.classList.toggle('show');
    });

    this.confirmBtn.addEventListener('click', () => {
      const selectedShops = [...this.shadowRoot.querySelectorAll('input[name="filter"]:checked')]
        .map(input => input.value);
      console.log('Selected shops:', selectedShops);
      this.popup.classList.remove('show');
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.popup.classList.remove('show');
      }
    });
  }
}

customElements.define('filter-popup', FilterPopup);
