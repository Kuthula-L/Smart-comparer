// bucketPerStore.js
// Module that computes store totals and updates the .store-amount inside each .storeButton.

// NOTE: The script will automatically scan the page for elements with class "store-baket"
// and use each element's id as the store identifier (for example: <div id="Checkers" class="store-baket">).

/**
 * Helper: parse a price-like string / dataset value into a float (e.g. "R12.50" -> 12.5)
 */
function parsePriceValue(raw) {
  if (raw == null) return 0;
  const cleaned = String(raw).replace(/[^\d\.\-]/g, ''); // remove currency letters etc.
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

/**
 * Helper: format number as "R{amount}".
 * - If it's a whole number, show no decimals (R300)
 * - Otherwise show two decimals (R12.50)
 */
function formatRand(amount) {
  if (!isFinite(amount)) amount = 0;
  return (Math.abs(amount - Math.round(amount)) < 1e-9)
    ? `R${Math.round(amount)}`
    : `R${amount.toFixed(2)}`;
}

/**
 * Class that manages one store-baket element on the page.
 * It listens for DOM 'change' events and updates the amount shown in the store button.
 */
export default class StoreBucket {
  /**
   * @param {HTMLElement} rootEl - the container element for the store (must have an id used as store id)
   */
  constructor(rootEl) {
    if (!(rootEl instanceof HTMLElement)) {
      throw new Error('StoreBucket requires a DOM element');
    }
    this.root = rootEl;
    this.storeId = rootEl.id || ''; // used to match product controls with data-store
    this.button = rootEl.querySelector('.storeButton');
    this.amountEl = this.button ? this.button.querySelector('.store-amount') : null;

    // Bind handlers
    this._onDocumentChange = this._onDocumentChange.bind(this);
    this._onClick = this._onClick.bind(this);

    // Start listening
    document.addEventListener('change', this._onDocumentChange, { capture: true });
    // also listen for clicks (some custom controls toggle on click)
    document.addEventListener('click', this._onClick, { capture: true });

    // initial calculation (in case some product controls are pre-checked)
    this.updateTotal();
  }

  /**
   * Clean up listeners if you want to destroy this instance later
   */
  destroy() {
    document.removeEventListener('change', this._onDocumentChange, { capture: true });
    document.removeEventListener('click', this._onClick, { capture: true });
  }

  /**
   * Document 'change' handler: re-calc if the changed control belongs to this store
   */
  _onDocumentChange(e) {
    const target = e.target;
    if (!(target instanceof Element)) return;

    // If the changed element has data-store matching this.storeId -> update total
    if (target.dataset && target.dataset.store === this.storeId) {
      this.updateTotal();
    }
  }

  /**
   * Document 'click' handler: some product UI toggles via clicks (e.g., divs), so check for those too.
   */
  _onClick(e) {
    const target = e.target;
    if (!(target instanceof Element)) return;

    // If any ancestor (or the element itself) has data-store matching this.storeId -> update
    const found = target.closest(`[data-store="${this.storeId}"]`);
    if (found) {
      // small delay to allow checkbox to toggle before reading state
      setTimeout(() => this.updateTotal(), 0);
    }
  }

  /**
   * Main calculation routine:
   * - finds all elements in the document with data-store="{this.storeId}" and a data-price attribute
   * - for each such element, decide quantity and contribution to sum:
   *    - checkbox: if checked -> qty (data-qty or 1)
   *    - number input: value as quantity
   *    - any element with data-selected="true" counts as qty (data-qty or 1)
   *    - fallback: if element has data-qty read it, otherwise consider quantity 1
   * - update the .store-amount element textContent to the formatted sum
   */
  updateTotal() {
    // find product controls anywhere in the document that belong to this store
    const selector = `[data-store="${this.storeId}"][data-price]`;
    const els = Array.from(document.querySelectorAll(selector));
    let total = 0;

    els.forEach((el) => {
      const price = parsePriceValue(el.dataset.price);

      // If it's a checkbox input -> include price only when checked
      if (el.matches('input[type="checkbox"], input[type="radio"]')) {
        if (el.checked) {
          // check for explicit data-qty attribute on the same element
          const qty = el.dataset.qty ? parseFloat(el.dataset.qty) : 1;
          total += price * (isNaN(qty) ? 1 : qty);
        }
        return;
      }

      // If it's a number input -> use its value as quantity
      if (el.matches('input[type="number"], input.qty')) {
        const qtyVal = Number(el.value);
        const qty = Number.isFinite(qtyVal) ? qtyVal : 0;
        total += price * qty;
        return;
      }

      // If an element has data-selected="true", count it
      if (el.dataset.selected && String(el.dataset.selected) !== 'false') {
        const qty = el.dataset.qty ? parseFloat(el.dataset.qty) : 1;
        total += price * (isNaN(qty) ? 1 : qty);
        return;
      }

      // Fallback: if the element has data-qty attribute, use it; otherwise treat as qty=1
      const fallbackQty = el.dataset.qty ? parseFloat(el.dataset.qty) : 1;
      if (!isNaN(fallbackQty) && fallbackQty > 0) {
        total += price * fallbackQty;
      }
    });

    // Update the UI: write to .store-amount (if present), otherwise set title on the button
    const display = formatRand(total);
    if (this.amountEl) {
      this.amountEl.textContent = display;
    } else if (this.button) {
      // fallback: set button text
      this.button.textContent = display;
    } else {
      // last fallback: set data-total on root
      this.root.dataset.total = total;
    }

    // Optionally: dispatch a custom event so other components can react
    const ev = new CustomEvent('store-total-updated', {
      bubbles: true,
      detail: { storeId: this.storeId, total },
    });
    this.root.dispatchEvent(ev);
  }
}

/* ---------------------------
   Auto-initialize for the page
   ---------------------------
   For every element with class "store-baket" we create a StoreBucket instance.
   This mirrors your HTML example:
     <div id="Checkers" class="store-baket" role="group"> ... </div>
*/
(function initAllStoreBuckets() {
  const roots = Array.from(document.querySelectorAll('.store-baket'));
  const instances = [];
  roots.forEach((root) => {
    try {
      const inst = new StoreBucket(root);
      instances.push(inst);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to create StoreBucket for', root, err);
    }
  });

  // Expose instances for debugging on window (optional)
  if (instances.length) {
    window.__storeBuckets = instances;
  }
})();
