export default class ProductCompare extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // You can define defaults if you want (like product title, price)
    this.title = this.getAttribute('title') || 'Product Name';
    this.price = this.getAttribute('price') || 'N/A';
    this.image = this.getAttribute('image') || 'download.png';
  }

  static get observedAttributes() {
    return ['title', 'price', 'image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.render();
    }
  }

  async connectedCallback() {
    try {
      // match how example.js loads its template
      const res = await fetch('./src/components/productCompare/productCompare.html');
      if (!res.ok) {
        console.error('Failed to fetch template:', res.status, res.statusText);
        return;
      }

      const htmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const template = doc.querySelector('template#CompareProductComponent');

      if (!template) {
        console.error('No <template> found with id="CompareProductComponent"');
        return;
      }

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.render(); // fill data after loading
    } catch (err) {
      console.error('Error loading productCompare template:', err);
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const titleEl = this.shadowRoot.querySelector('.title');
    const priceEl = this.shadowRoot.querySelector('.price');
    const imgEl = this.shadowRoot.querySelector('.image-container img');
    const heartEl = this.shadowRoot.querySelector('#heart');

    if (titleEl) titleEl.textContent = this.title;
    if (priceEl) priceEl.textContent = this.price;
    if (imgEl) imgEl.src = this.image;

    // Handle favourite toggle
    if (heartEl && !heartEl.dataset.bound) {
      heartEl.addEventListener('click', () => {
        heartEl.classList.toggle('active');
      });
      heartEl.dataset.bound = 'true';
    }
  }
}

customElements.define('product-compare', ProductCompare);
