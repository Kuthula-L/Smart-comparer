// product-card.js
const STORE_THEMES = {
  woolworths: {
    borderColor: "#111111",
    imageBg: "#f3f3f4",
    addBtn: "#111111",
    logoBg: "#ffffff",
    logoText: "#111111",
  },
  shoprite: {
    borderColor: "#d7262f",
    imageBg: "#ffdfe6",
    addBtn: "#d7262f",
    logoBg: "#ffffff",
    logoText: "#d7262f",
  },
  checkers: {
    borderColor: "#0b7fd1",
    imageBg: "#e8f6ff",
    addBtn: "#0b7fd1",
    logoBg: "#ffffff",
    logoText: "#0b7fd1",
  },
  picknpay: {
    borderColor: "#5b2a86",
    imageBg: "#f0e8fb",
    addBtn: "#5b2a86",
    logoBg: "#580f4fff",
    logoText: "#5b2a86",
  },
};

// Base folder where your SVG logos live. Change this if your static path differs.
const LOGO_BASE = "./public";

// Explicit mapping from normalized store key -> filename (SVG).
const STORE_LOGOS = {
  woolworths: "woolworths.svg",
  shoprite: "shoprite.svg",
  checkers: "checkers.svg",
  picknpay: "pnp.svg",
  pnp: "pnp.svg",
};

function normalizeStoreName(raw) {
  if (!raw) return "";
  return String(raw).trim().toLowerCase().replace(/\s+/g, "");
}

// --------------------
// Default internal template used when page doesn't provide one
// (contains CSS + structure from your original template)
const DEFAULT_TEMPLATE_HTML = `
  <style>
    /* component root */
    .add-button-component {
      --store-border: #d18286;
      --image-bg: #f3f3f4;
      --add-btn-bg: #000;
      --logo-bg: #fff;
      --logo-text: #000;
      box-sizing: border-box;
      width: 160px;
      height: 245px;
      position: relative; /* needed so absolute children (logo, buttons) position correctly */
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      overflow: visible;
      margin-left:100px;
    }

    /* card base */
    .box {
      
      width: 100%;
      height: 100%;
      background: white;
      border: 1px solid var(--store-border);
      border-radius: 20px;
      box-sizing: border-box;
      padding: 5px;           /* use padding instead of absolute positions */
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
    }

    /* image area (kept in flow) */
    .box2 {
      width: 100%;
      height: 195px;
      border-radius: 10px;
      background: var(--image-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .product-image {
      width: 95px;
      height: 95px;
      display: block;
      /* centered by parent */
    }
    .product-image .product-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    /* text area (flow under image) */
    .Product-name {
      margin-top: 8px;
      font-weight: 600;
      color: #222;
      font-size: 16px;
    }
    .Product-price, .Product-sale-price {
      margin-top: 6px;
      font-size: 12px;
      color: #666;
    }
    .Product-sale-price { color: #e63946; }

    /* right box (small price/add container) - kept in flow, placed with margin-left auto */
    .box3 {
      position: absolute;
      width: 65px;
      height: 60px;
      background: white;
      border-top: 1px solid var(--store-border);
      border-left: 1px solid var(--store-border);
      border-radius: 5px;
      align-self: flex-end;
     
      right:0px;
      bottom:0px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    /* add button: absolute so it can overlap card corner */
    .add-button {
      position: absolute;
      right: 1px;     /* relative to .add-button-component */
      bottom: 1px;
      width: 55px;
      height: 55px;
      border: none;
      border-radius:50px;
      border-bottom-left-radius:10px;
      background: var(--add-btn-bg);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      z-index: 20;
    }
    .add-button img { width: 36px; height: 36px; object-fit: contain; display: block; }

    /* heart (favorite) button: absolute top-right */
    .heart-button {
      position: absolute;
      top: 10px;
      right: 12px;
      width: 28px;
      height: 28px;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      z-index: 25;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .heart-button img { width: 100%; height: 100%; object-fit: contain; display: block; }

    /* logo container: absolute top-left and pops out */
    .logo-box {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 65px;
      height: 60px;
      background: transparent;
      z-index: 30;
      overflow: visible;
      pointer-events: none; /* decorative */
    }
    .logo {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 70px;
      height: 65px;
      border-bottom-right-radius: 60px;
      border-top-left-radius: 5px;
      background: var(--logo-bg);
      color: var(--logo-text);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transform: translateY(-6px);
      z-index: 31;
    }
    .logo .logo-img { max-width: 100%; max-height: 100%; object-fit: contain; display: block; }

  </style>

  <div class="add-button-component">
    <div class="box">
      <div class="box2">
        <div class="product-image"><img class="product-img" src="" data-src="product-image.jpg" alt="Product image"></div>
      </div>

      <div class="Product-name" src="product-name">Product Name</div>
      <div class="Product-price" src="product-price">Price -</div>
      <div class="Product-sale-price" src="product-sale-price">Sale -</div>

      <div style="flex:1"></div> <!-- pushes box3 / footer upwards if needed -->

      <div class="box3"></div>
    </div>

    <button class="add-button" aria-label="Add to basket" type="button">
      <img src="/add-circle-svgrepo-com.svg" alt="add-button" />
    </button>

    <button class="heart-button" aria-label="Add to favourites" type="button">
      <img src="/whiteHeart.svg" alt="heart" />
    </button>

    <div class="logo-box"></div>
    <div class="logo" src="logo.png">
      <img src="" data-src="logo.png" alt="Logo" class="logo-img" />
    </div>
  </div>
`;

// Cache for generated fallback templates (so we don't recreate identical templates per instance)
const _cachedDefaultTemplates = {};

// --------------------
// ProductCard class
export default class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return [
      "store",
      "name",
      "price",
      "sale",
      "image",
      "logo-src",
      "data-id",
      "navigate-to",
      "variant",
      "template-id",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.$root = null;
    this._onAdd = this._onAdd.bind(this);
    this._onHeart = this._onHeart.bind(this);
    this._fav = false;
  }

  connectedCallback() {
    const variant = (this.getAttribute("variant") || "").toLowerCase();
    const templateId =
      this.getAttribute("template-id") ||
      (variant === "sub" ? "sub-button-template" : "add-button-template");

    // Try to find a template in the document first
    let tpl = document.getElementById(templateId);

    // If not found, use or create a cached default template
    if (!tpl) {
      if (!_cachedDefaultTemplates[templateId]) {
        const created = document.createElement("template");
        created.id = `__product_card_default_${templateId}`;
        created.innerHTML = DEFAULT_TEMPLATE_HTML;
        _cachedDefaultTemplates[templateId] = created;
      }
      tpl = _cachedDefaultTemplates[templateId];
    }

    // clone the template content into shadow DOM
    this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    this.$root = this.shadowRoot;

    // query for nodes inside the cloned template (these match your HTML)
    this.$container =
      this.$root.querySelector(".add-button-component") ||
      this.$root.querySelector(".sub-button-component");
    this.$box = this.$root.querySelector(".box"); // outer card element
    this.$imageBg = this.$root.querySelector(".box2"); // element used as image background in template
    this.$productName = this.$root.querySelector(".Product-name");
    this.$price = this.$root.querySelector(".Product-price");
    this.$sale = this.$root.querySelector(".Product-sale-price");
    this.$productImg = this.$root.querySelector(".product-img");
    this.$addButton =
      this.$root.querySelector(".add-button") ||
      this.$root.querySelector(".sub-button");
    this.$heartButton = this.$root.querySelector(".heart-button");
    this.$heartImg = this.$heartButton?.querySelector("img") || null;
    this.$logo = this.$root.querySelector(".logo");
    this.$logoImg = this.$logo?.querySelector("img") || null;

    // wire events
    if (this.$addButton) this.$addButton.addEventListener("click", this._onAdd);
    if (this.$heartButton)
      this.$heartButton.addEventListener("click", this._onHeart);

    // initial render from attributes
    this._render();
  }

  disconnectedCallback() {
    if (this.$addButton)
      this.$addButton.removeEventListener("click", this._onAdd);
    if (this.$heartButton)
      this.$heartButton.removeEventListener("click", this._onHeart);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // any attribute change triggers render
    this._render();
  }

  _onAdd(e) {
    const priceVal = this.hasAttribute("price")
      ? Number(this.getAttribute("price"))
      : null;
    const saleVal = this.hasAttribute("sale")
      ? Number(this.getAttribute("sale"))
      : null;

    const payload = {
      id: this.getAttribute("data-id") || null,
      store: this.getAttribute("store") || null,
      name: this.getAttribute("name") || null,
      price: Number.isFinite(priceVal) ? priceVal : 0,
      sale: Number.isFinite(saleVal) ? saleVal : null,
      image: this.getAttribute("image") || null,
    };

    this.dispatchEvent(
      new CustomEvent("add-to-basket", {
        detail: payload,
        bubbles: true,
        composed: true,
      })
    );

    const nav = this.getAttribute("navigate-to");
    if (nav) {
      try {
        const url = new URL(nav, window.location.href);
        if (payload.id) url.searchParams.set("productId", payload.id);
        else if (payload.name)
          url.searchParams.set("productName", payload.name);
        url.searchParams.set("price", payload.price);
        if (payload.sale !== null) url.searchParams.set("sale", payload.sale);
        window.location.href = url.toString();
      } catch (err) {
        window.location.href = nav;
      }
    }
  }

  _onHeart(e) {
    this._fav = !this._fav;
    if (this.$heartButton)
      this.$heartButton.setAttribute("aria-pressed", String(this._fav));

    // If there's no <img> inside the template just emit event and return
    if (!this.$heartImg) {
      this.dispatchEvent(
        new CustomEvent("toggle-fav", {
          detail: { id: this.getAttribute("data-id") || null, fav: this._fav },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    // Use a single path shape and toggle fill vs outline so silhouette stays same
    const heartPath =
      "M12 21s-7.5-4.9-9.6-8.1C-0.2 8.7 4 4 7.8 6.1 9.7 7 12 9 12 9s2.3-2 4.2-2.9C20 4 24.2 8.7 21.6 12.9 19.5 16.1 12 21 12 21z";

    if (this._fav) {
      this.$heartImg.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#ef4444'><path d='${heartPath}'/></svg>`
        );
    } else {
      this.$heartImg.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#ef4444' stroke-width='1.6'><path d='${heartPath}'/></svg>`
        );
    }

    this.dispatchEvent(
      new CustomEvent("toggle-fav", {
        detail: { id: this.getAttribute("data-id") || null, fav: this._fav },
        bubbles: true,
        composed: true,
      })
    );
  }

  _render() {
    if (!this.$root) return;

    const name = this.getAttribute("name") || "";
    const price = this.hasAttribute("price")
      ? Number(this.getAttribute("price"))
      : null;
    const sale = this.hasAttribute("sale")
      ? Number(this.getAttribute("sale"))
      : null;
    const image = this.getAttribute("image") || null;
    const logoSrc = this.getAttribute("logo-src") || null;
    const storeRaw = this.getAttribute("store") || "";
    const storeKey = normalizeStoreName(storeRaw);

    if (this.$productName)
      this.$productName.textContent = name || "Product Name";

    // keep "Price - " label present
    if (this.$price)
      this.$price.textContent =
        price !== null && !Number.isNaN(price)
          ? `Price - R${price.toFixed(2)}`
          : "Price -";

    if (this.$sale)
      this.$sale.textContent =
        sale !== null && !Number.isNaN(sale)
          ? `Sale - R${sale.toFixed(2)}`
          : "Sale -";

    if (this.$productImg) {
      const dataSrc = this.$productImg.getAttribute("data-src") || "";
      this.$productImg.src = image || dataSrc || "";
      this.$productImg.alt = name || "Product image";
    }

    if (this.$logo) {
      this.$logo.innerHTML = ""; // clear
      if (logoSrc) {
        const img = document.createElement("img");
        img.src = logoSrc;
        img.alt = (storeRaw || "logo") + " logo";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.decoding = "async";
        img.onerror = () => {
          if (img.parentNode) img.parentNode.removeChild(img);
          this.$logo.textContent = this._logoInitials(storeRaw);
        };
        this.$logo.appendChild(img);
      } else {
        const mapped = STORE_LOGOS[storeKey];
        const filename = mapped || `${storeKey}.svg`;
        const autoPath = `${LOGO_BASE}/${filename}`;

        const img = document.createElement("img");
        img.alt = (storeRaw || "logo") + " logo";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.decoding = "async";

        img.onerror = () => {
          if (img.parentNode) img.parentNode.removeChild(img);
          this.$logo.textContent = this._logoInitials(storeRaw);
        };

        img.src = autoPath;
        this.$logo.appendChild(img);
      }

      try {
        this.$logo.setAttribute("role", "img");
        this.$logo.setAttribute("aria-label", `${storeRaw || "Store"} logo`);
      } catch (err) {}
    }

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
    if (!store) return "";
    const parts = store.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return parts
      .map((p) => p[0].toUpperCase())
      .join("")
      .slice(0, 3);
  }

  _getTheme(storeKey) {
    if (!storeKey) return STORE_THEMES.woolworths;
    if (storeKey.startsWith("wool")) return STORE_THEMES.woolworths;
    if (storeKey.startsWith("shop")) return STORE_THEMES.shoprite;
    if (storeKey.startsWith("check")) return STORE_THEMES.checkers;
    if (storeKey.startsWith("pick") || storeKey.startsWith("pnp"))
      return STORE_THEMES.picknpay;
    return STORE_THEMES.woolworths;
  }
}

// register the element (safe to call multiple times)
if (!customElements.get("product-card")) {
  customElements.define("product-card", ProductCard);
}
