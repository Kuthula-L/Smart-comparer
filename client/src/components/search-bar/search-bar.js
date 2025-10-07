export default class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const template = await this.loadTemplate();
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);

    // Add behavior
    const input = this.shadowRoot.querySelector("input");
    const clearIcon = this.shadowRoot.querySelector(".clear-icon");

    input.addEventListener("input", () => {
      clearIcon.style.display = input.value ? "flex" : "none";
      this.dispatchEvent(new CustomEvent("search-changed", {
        detail: input.value,
        bubbles: true,
        composed: true
      }));
    });

    clearIcon.addEventListener("click", () => {
      input.value = "";
      clearIcon.style.display = "none";
      input.focus();
      this.dispatchEvent(new CustomEvent("search-cleared", {
        bubbles: true,
        composed: true
      }));
    });
  }

  async loadTemplate() {
    const response = await fetch("./src/components/search-bar/search-bar.html");
    const html = await response.text();
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.querySelector("template");
  }
}

customElements.define("search-bar", SearchBar);
