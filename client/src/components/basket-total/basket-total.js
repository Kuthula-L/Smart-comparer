// basket.js — incremental totals from add-to-basket events
(() => {
  'use strict';

  const STORAGE_KEY = 'basket_totals_v1';

  // totals stored as integer cents to avoid float bugs
  let totals = loadTotals(); // { originalCents: 0, saleCents: 0 }

  // Set of component instances to update when totals change
  const instances = new Set();

  // helpers
  const toCents = n => Math.round(Number(n || 0) * 100);
  const fromCents = c => {
    const s = (c / 100).toFixed(2);
    return `R${Number(s).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };
  const saveTotals = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(totals));
  function loadTotals() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { originalCents: 0, saleCents: 0 };
    } catch {
      return { originalCents: 0, saleCents: 0 };
    }
  }

  // update UI targets: component instances and legacy DOM
  function renderAll() {
    // update component instances (if any)
    instances.forEach(inst => {
      try { inst.updateTotals(totals); } catch (err) { /* ignore */ }
    });

    // update legacy DOM if present (.basket-total-*)
    const priceEl = document.querySelector('.basket-total-price');
    const saleEl = document.querySelector('.basket-total-sale-price');
    const amountEl = document.querySelector('.basket-total-amount');
    if (priceEl) priceEl.textContent = fromCents(totals.originalCents);
    if (saleEl) saleEl.textContent = fromCents(totals.saleCents);
    if (amountEl) {
      // If you want item count instead of text you can change this
      // For now we show the totals summary
      amountEl.textContent = `${fromCents(totals.originalCents)} → ${fromCents(totals.saleCents)}`;
    }
  }

  // Add the price from a product to totals (event-driven)
  function addFromDetail(detail = {}) {
    // read price and sale from the event's detail only
    const p = toCents(detail.price || 0);
    const s = detail.sale != null ? toCents(detail.sale) : p;
    totals.originalCents = (totals.originalCents || 0) + p;
    totals.saleCents = (totals.saleCents || 0) + s;
    saveTotals();
    renderAll();
  }

  // reset totals (API)
  function clearTotals() {
    totals = { originalCents: 0, saleCents: 0 };
    saveTotals();
    renderAll();
  }

  // listen for add-to-basket events (fired by your product cards)
  document.addEventListener('add-to-basket', e => {
    const d = e.detail || {};
    addFromDetail(d);
  });

  // optionally allow manual load-from-storage event
  document.addEventListener('basket-load-from-storage', () => {
    totals = loadTotals();
    renderAll();
  });

  // expose a tiny API
  window.basketTotals = {
    clearTotals,
    getTotals: () => ({ ...totals }),
    addFromDetail
  };

  /* -----------------------
     <basket-total> component
     ----------------------- */
  class BasketTotal extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); this._els = {}; }
    connectedCallback() {
      // clone template if present
      const tpl = document.getElementById('basket-total-template');
      if (tpl && tpl.content) {
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));
      } else {
        // fallback minimal UI
        this.shadowRoot.innerHTML = `
          <style>
            :host{position:fixed;left:50%;transform:translateX(-50%);bottom:24px;display:block}
            .wrap{background:white;padding:6px;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,.08);display:flex;gap:8px;align-items:center}
            .pill{padding:6px 10px;border-radius:10px;background:#e5e7eb;font-weight:700}
            .sale{background:#dc3545;color:white}
          </style>
          <div class="wrap" aria-live="polite" aria-atomic="true">
            <div class="pill" id="price">R0.00</div><div class="pill sale" id="sale">R0.00</div>
          </div>`;
      }

      // find nodes inside shadow (support id/class)
      this._els.price = this.shadowRoot.querySelector('#basket-price') || this.shadowRoot.querySelector('.basket-total-price') || this.shadowRoot.querySelector('#price');
      this._els.sale = this.shadowRoot.querySelector('#basket-sale') || this.shadowRoot.querySelector('.basket-total-sale-price') || this.shadowRoot.querySelector('#sale');

      // register instance and render initial totals
      instances.add(this);
      this.updateTotals(totals);
    }
    disconnectedCallback() { instances.delete(this); }
    updateTotals(t) {
      const cur = t || totals;
      if (this._els.price) this._els.price.textContent = fromCents(cur.originalCents || 0);
      if (this._els.sale) this._els.sale.textContent = fromCents(cur.saleCents || 0);
    }
  }

  if (!customElements.get('basket-total')) customElements.define('basket-total', BasketTotal);

  // initial render for legacy DOM or any components that are already connected
  document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    // small timeout to make sure components that connect after DOMContentLoaded are registered
    setTimeout(renderAll, 50);
  });
})();
