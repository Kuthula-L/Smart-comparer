// ✅ productCompare.js (optimized and cached version)

let cachedTemplate = null; // Cache template so it’s fetched only once

export default class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Default values
    this.store = this.getAttribute("store") || "Store";
    this.title = this.getAttribute("title") || "Product Name";
    this.price = this.getAttribute("price") || "N/A";
    this.image = this.getAttribute("image") || "download.png";
  }

  static get observedAttributes() {
    return ["store", "title", "price", "image"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.render();
    }
  }

  async connectedCallback() {
    try {
      // ✅ Fetch template only once
      if (!cachedTemplate) {
        const res = await fetch("/src/components/productCards/addbutton.html");
        if (!res.ok) {
          console.error(
            "Failed to fetch template:",
            res.status,
            res.statusText
          );
          return;
        }

        const htmlText = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        cachedTemplate = doc.querySelector("template#add-button-template");

        if (!cachedTemplate) {
          console.error('No <template> found with id="add-button-template"');
          return;
        }
      }

      // ✅ Clone from cache instead of re-fetching
      this.shadowRoot.appendChild(cachedTemplate.content.cloneNode(true));

      this.render(); // fill data after loading
    } catch (err) {
      console.error("Error loading add-button template:", err);
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const store = this.shadowRoot.querySelector(".store");
    const titleEl = this.shadowRoot.querySelector(".title");
    const priceEl = this.shadowRoot.querySelector(".price");
    const imgEl = this.shadowRoot.querySelector(".image-container img");
    const heartEl = this.shadowRoot.querySelector("#heart");

    if (store) store.textContent = this.store;
    if (titleEl) titleEl.textContent = this.title;
    if (priceEl) priceEl.textContent = this.price;
    if (imgEl) imgEl.src = this.image;

    // Handle favourite toggle
    if (heartEl && !heartEl.dataset.bound) {
      heartEl.addEventListener("click", () => {
        heartEl.classList.toggle("active");
      });
      heartEl.dataset.bound = "true";
    }
  }
}

customElements.define("product-card", ProductCard);
