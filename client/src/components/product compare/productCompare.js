// ./src/components/CompareProductComponent/CompareProductComponent.js
export default class CompareProductComponent extends HTMLElement {
  constructor() {
    super(); // do NOT accept args in a custom element constructor
    this.attachShadow({ mode: 'open' });

    // internal properties (initial values will be taken from attributes when available)
    this.image = this.getAttribute('image') || 'download.png';
    this.titleText = this.getAttribute('title') || 'Product';
    this.avgpriceText = this.getAttribute('avgprice') || 'AVG. Price';
    this.priceText = this.getAttribute('price') || null;
    this.compareHref = this.getAttribute('comparehref') || '';
    this.favourited = this.hasAttribute('favourited') && this.getAttribute('favourited') !== 'false';
  }

  static get observedAttributes() {
    // attributes to watch for changes
    return ['image', 'title', 'avgprice', 'price', 'comparehref', 'favourited'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // update internal state and re-render
    switch (name) {
      case 'image':
        this.image = newValue;
        break;
      case 'title':
        this.titleText = newValue;
        break;
      case 'avgprice':
        this.avgpriceText = newValue;
        break;
      case 'price':
        this.priceText = newValue;
        break;
      case 'comparehref':
        this.compareHref = newValue;
        break;
      case 'favourited':
        // treat presence or "true" as truthy, "false" as false
        this.favourited = (newValue !== null && newValue !== 'false');
        break;
    }
    this.render();
  }

  async connectedCallback() {
    // load template file containing <template id="CompareProductComponent">...</template>
    // **Adjust the path below if your HTML template file is located elsewhere**
    const templatePath = 'client/src/components/product compare/productCompare.js'

    try {
      const res = await fetch(templatePath);
      if (!res.ok) {
        console.error('Failed to fetch template:', res.status, res.statusText, templatePath);
        return;
      }
      const htmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // find the specific template by id
      const template = doc.querySelector('#CompareProductComponent') || doc.querySelector('template');
      if (!template) {
        console.error('No <template id="CompareProductComponent"> found in', templatePath);
        return;
      }

      // attach template content to shadow root
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // cache element references inside shadow DOM
      this._imgEl = this.shadowRoot.querySelector('.image-container img');
      this._titleEl = this.shadowRoot.querySelector('.title');
      this._avgpriceEl = this.shadowRoot.querySelector('.avgprice');
      this._priceEl = this.shadowRoot.querySelector('.price');
      this._heartWrapper = this.shadowRoot.querySelector('#heart'); // template uses id="heart"
      this._heartImg = this._heartWrapper ? this._heartWrapper.querySelector('img') : null;
      this._compareAnchor = this.shadowRoot.querySelector('a');
      this._compareButton = this.shadowRoot.querySelector('.CompareButton');

      // safety checks
      if (!this._imgEl || !this._titleEl || !this._avgpriceEl || !this._priceEl || !this._heartWrapper) {
        console.warn('CompareProductComponent: some expected elements are missing in the template.');
      }

      // wire up events
      if (this._heartWrapper) {
        this._heartWrapper.style.cursor = 'pointer';
        this._heartWrapper.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleFavourite();
        });
      }

      if (this._compareAnchor) {
        // ensure anchor wrapping button does not navigate away during dev unless href provided
        this._compareAnchor.addEventListener('click', (e) => {
          // if no href specified, prevent navigation
          if (!this.compareHref || this.compareHref.trim() === '') {
            e.preventDefault();
          }
        });
      }

      // initial render to populate DOM with attribute values
      this.render();
    } catch (err) {
      console.error('Error loading component template:', err);
    }
  }

  // toggles favourite state and updates attribute so it's observable externally
  toggleFavourite() {
    this.favourited = !this.favourited;
    // reflect to attribute: presence indicates true, remove attribute for false
    if (this.favourited) {
      this.setAttribute('favourited', 'true');
    } else {
      this.removeAttribute('favourited');
    }
    this.render();
  }

  // update DOM from the internal state
  render() {
    // update image
    if (this._imgEl) {
      this._imgEl.src = this.image;
      this._imgEl.alt = this.titleText || 'product image';
    }

    // update texts
    if (this._titleEl) this._titleEl.textContent = this.titleText;
    if (this._avgpriceEl) this._avgpriceEl.textContent = this.avgpriceText;
    if (this._priceEl) this._priceEl.textContent = this.priceText;

    // update compare link
    if (this._compareAnchor) {
      this._compareAnchor.href = this.compareHref || '';
      // also update button title/aria
      if (this._compareButton) {
        this._compareButton.setAttribute('aria-label', `Compare ${this.titleText}`);
      }
    }

    // update heart visual state (adds/removes .active class)
    if (this._heartWrapper) {
      if (this.favourited) {
        this._heartWrapper.classList.add('active');
        // if you have a "filled" heart icon, swap src here; otherwise keep existing
        if (this._heartImg && this._heartImg.dataset.filled) {
          this._heartImg.src = this._heartImg.dataset.filled;
        }
      } else {
        this._heartWrapper.classList.remove('active');
        if (this._heartImg && this._heartImg.dataset.empty) {
          this._heartImg.src = this._heartImg.dataset.empty;
        }
      }
    }
  }
}
