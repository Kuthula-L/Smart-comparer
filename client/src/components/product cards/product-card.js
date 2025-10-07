// product-card.js
// Exports and registers a <product-card> custom element that clones your existing
// <template id="add-button-template"> found in the same HTML file.

const STORE_THEMES = {
  woolworths: {
    borderColor: '#111111',
    imageBg: '#f3f3f4',
    addBtn: '#111111',
    logoBg: '#ffffff',
    logoText: '#111111'
  },
  shoprite: {
    borderColor: '#d7262f',
    imageBg: '#ffdfe6',
    addBtn: '#d7262f',
    logoBg: '#ffffff',
    logoText: '#d7262f'
  },
  checkers: {
    borderColor: '#0b7fd1',
    imageBg: '#e8f6ff',
    addBtn: '#0b7fd1',
    logoBg: '#ffffff',
    logoText: '#0b7fd1'
  },
  picknpay: {
    borderColor: '#5b2a86',
    imageBg: '#f0e8fb',
    addBtn: '#5b2a86',
    logoBg: '#ffffff',
    logoText: '#5b2a86'
  }
};

function normalizeStoreName(raw) {
  if (!raw) return '';
  return String(raw).trim().toLowerCase().replace(/\s+/g, '');
}

export default class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['store', 'name', 'price', 'sale', 'image', 'logo-src', 'data-id', 'navigate-to'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // references will be set after cloning template
    this.$root = null;
    this._onAdd = this._onAdd.bind(this);
    this._onHeart = this._onHeart.bind(this);
    this._fav = false;
  }

connectedCallback() {
  const variant = (this.getAttribute('variant') || '').toLowerCase();
  const templateId = this.getAttribute('template-id') || (variant === 'sub' ? 'sub-button-template' : 'add-button-template');

  const tpl = document.getElementById(templateId);
  if (!tpl) {
    console.error(`product-card: <template id="${templateId}"> not found in document.`);
    return;
  }

  this.shadowRoot.appendChild(tpl.content.cloneNode(true));
  this.$root = this.shadowRoot;

  this.$container = this.$root.querySelector('.add-button-component') || this.$root.querySelector('.sub-button-component');
  this.$box = this.$root.querySelector('.box');
  this.$imageBg = this.$root.querySelector('.box2');
  this.$productName = this.$root.querySelector('.Product-name');
  this.$price = this.$root.querySelector('.Product-price');
  this.$sale = this.$root.querySelector('.Product-sale-price');
  this.$productImg = this.$root.querySelector('.product-img');
  this.$addButton = this.$root.querySelector('.add-button') || this.$root.querySelector('.sub-button');
  this.$heartButton = this.$root.querySelector('.heart-button');
  this.$heartImg = this.$heartButton?.querySelector('img') || null;
  this.$logo = this.$root.querySelector('.logo');
  this.$logoImg = this.$logo?.querySelector('img') || null;

  if (this.$addButton) this.$addButton.addEventListener('click', this._onAdd);
  if (this.$heartButton) this.$heartButton.addEventListener('click', this._onHeart);

  this._render();
}

  disconnectedCallback() {
    if (this.$addButton) this.$addButton.removeEventListener('click', this._onAdd);
    if (this.$heartButton) this.$heartButton.removeEventListener('click', this._onHeart);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // any attribute change triggers render
    this._render();
  }

  // add button behavior: dispatch event + optional navigation
  _onAdd(e) {
    const payload = {
      id: this.getAttribute('data-id') || null,
      store: this.getAttribute('store') || null,
      name: this.getAttribute('name') || null,
      price: Number(this.getAttribute('price')) || 0,
      sale: this.getAttribute('sale') ? Number(this.getAttribute('sale')) : null,
      image: this.getAttribute('image') || null
    };

    // dispatch event for the host app to handle basket logic
    this.dispatchEvent(new CustomEvent('add-to-basket', {
      detail: payload,
      bubbles: true,
      composed: true
    }));

    // optional immediate navigation (if navigate-to attribute present)
    const nav = this.getAttribute('navigate-to');
    if (nav) {
      try {
        const url = new URL(nav, window.location.href);
        if (payload.id) url.searchParams.set('productId', payload.id);
        else if (payload.name) url.searchParams.set('productName', payload.name);
        url.searchParams.set('price', payload.price);
        if (payload.sale !== null) url.searchParams.set('sale', payload.sale);
        window.location.href = url.toString();
      } catch (err) {
        // fallback: direct assignment if nav isn't a valid relative url for new URL
        window.location.href = nav;
      }
    }
  }

  _onHeart(e) {
    this._fav = !this._fav;
    // toggle heart image: simple filled/outlined SVG data URIs
    if (!this.$heartImg) return;
    if (this._fav) {
      this.$heartImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#ef4444'><path d='M12 21s-7.5-4.9-9.6-8.1C-0.2 8.7 4 4 7.8 6.1 9.7 7 12 9 12 9s2.3-2 4.2-2.9C20 4 24.2 8.7 21.6 12.9 19.5 16.1 12 21 12 21z'/></svg>`
      );
    } else {
      this.$heartImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#ef4444' stroke-width='1.6'><path d='M20.8 8.6a5.6 5.6 0 0 0-8-.6l-.8.7-.8-.7a5.6 5.6 0 1 0-7.9 7.9L12 21.2l8.8-4.7a5.6 5.6 0 0 0 0-7.9z' /></svg>`
      );
    }

    // emit toggle-fav
    this.dispatchEvent(new CustomEvent('toggle-fav', {
      detail: { id: this.getAttribute('data-id') || null, fav: this._fav },
      bubbles: true,
      composed: true
    }));
  }

  // populate nodes from attributes and apply theme
  _render() {
    if (!this.$root) return; // not initialized yet

    // read attributes
    const name = this.getAttribute('name') || '';
    const price = this.getAttribute('price') ? Number(this.getAttribute('price')) : null;
    const sale = this.getAttribute('sale') ? Number(this.getAttribute('sale')) : null;
    const image = this.getAttribute('image') || null;
    const logoSrc = this.getAttribute('logo-src') || null;
    const storeRaw = this.getAttribute('store') || '';
    const storeKey = normalizeStoreName(storeRaw);

    // text nodes
    if (this.$productName) this.$productName.textContent = name || 'Product Name';
    if (this.$price) this.$price.textContent = price !== null ? `R${price.toFixed(2)}` : 'Price -';
    if (this.$sale) this.$sale.textContent = sale !== null ? `Sale - R${sale.toFixed(2)}` : 'Sale -';

    // image: prefer attribute 'image', otherwise try data-src from template img
    if (this.$productImg) {
      const dataSrc = this.$productImg.getAttribute('data-src') || '';
      this.$productImg.src = image || dataSrc || '';
      this.$productImg.alt = name || 'Product image';
    }

    // logo: if logo-src attribute provided use it, otherwise keep existing template logo img (data-src), otherwise render initials
    if (this.$logo) {
      if (logoSrc) {
        // replace content with the provided logo
        this.$logo.innerHTML = ''; // clear
        const img = document.createElement('img');
        img.src = logoSrc;
        img.alt = (storeRaw || 'logo') + ' logo';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        this.$logo.appendChild(img);
      } else if (this.$logoImg) {
        // if template had data-src on logo-img, it will show (no change)
        const logoDataSrc = this.$logoImg.getAttribute('data-src') || '';
        if (logoDataSrc && (!this.$logoImg.src || this.$logoImg.src.indexOf('data:') === 0)) {
          this.$logoImg.src = logoDataSrc;
        } else if (!this.$logoImg.src) {
          this.$logo.innerHTML = this._logoInitials(storeRaw);
        }
      } else {
        // fallback initials
        this.$logo.textContent = this._logoInitials(storeRaw);
      }
    }

    // apply store theme colors to existing inline-styled template nodes
    const theme = this._getTheme(storeKey);

    if (this.$box && theme.borderColor) {
      this.$box.style.borderColor = theme.borderColor;
    }
    if (this.$imageBg && theme.imageBg) {
      this.$imageBg.style.background = theme.imageBg;
    }
    if (this.$addButton && theme.addBtn) {
      this.$addButton.style.background = theme.addBtn;
    }
    if (this.$logo) {
      this.$logo.style.background = theme.logoBg;
      this.$logo.style.color = theme.logoText;
    }
  }

  _logoInitials(store) {
    if (!store) return '';
    const parts = store.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return parts.map(p => p[0].toUpperCase()).join('').slice(0, 3);
  }

  _getTheme(storeKey) {
    if (!storeKey) return STORE_THEMES.woolworths;
    if (storeKey.startsWith('wool')) return STORE_THEMES.woolworths;
    if (storeKey.startsWith('shop')) return STORE_THEMES.shoprite;
    if (storeKey.startsWith('check')) return STORE_THEMES.checkers;
    if (storeKey.startsWith('pick') || storeKey.startsWith('pnp')) return STORE_THEMES.picknpay;
    return STORE_THEMES.woolworths;
  }
}

// register the element (safe to call multiple times)
if (!customElements.get('product-card')) {
  customElements.define('product-card', ProductCard);
}
