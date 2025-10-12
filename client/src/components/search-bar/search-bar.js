export default class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Mock product data
    // i just did this to see if the code works you'll have to add the actual the component to display it properly
    this.mockResults = [
      { id: 1, title: "Product A", price: 95, sale: 90, image: "https://via.placeholder.com/180x180?text=A" },
      { id: 2, title: "Product B", price: 110, sale: 100, image: "https://via.placeholder.com/180x180?text=B" },
      { id: 3, title: "Product C", price: 75, sale: 70, image: "https://via.placeholder.com/180x180?text=C" },
      { id: 4, title: "Product D", price: 145, sale: 140, image: "https://via.placeholder.com/180x180?text=D" },
      { id: 5, title: "Product E", price: 55, sale: 50, image: "https://via.placeholder.com/180x180?text=E" }
    ];
  }

  async connectedCallback() {
    const template = await this.loadTemplate();
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);

    const input = this.shadowRoot.querySelector("input");
    const clearIcon = this.shadowRoot.querySelector(".clear-icon");
    const resultsContainer = this.shadowRoot.querySelector(".results-container");

    input.addEventListener("input", () => {
      clearIcon.style.display = input.value ? "flex" : "none";

      if (input.value) {
        const results = this.mockResults.filter(item =>
          item.title.toLowerCase().includes(input.value.toLowerCase())
        );
        // this.renderResults(results, resultsContainer);
      } else {
        resultsContainer.innerHTML = "";
      }
    });

    clearIcon.addEventListener("click", () => {
      input.value = "";
      clearIcon.style.display = "none";
      resultsContainer.innerHTML = "";
      input.focus();
    });
  }

  // renderResults(results, container) {
  //   container.innerHTML = "";

  //   if (results.length === 0) {
  //     container.innerHTML = `<div style="text-align:center; font-size:16px; color:#555;">No results found</div>`;
  //     return;
  //   }

  //   results.forEach(item => {
  //     const card = document.createElement("div");
  //     card.classList.add("product-card");
  //     card.innerHTML = `
  //       <img src="${item.image}" alt="${item.title}" />
  //       <div class="title">${item.title}</div>
  //       <div class="avgprice">R${item.price.toFixed(2)}</div>
  //       <div class="price">Sale: R${item.sale.toFixed(2)}</div>
  //       <button class="CompareButton" a href="" >Compare</button>
  //     `;
  //     container.appendChild(card);
  //   });
  // }

  async loadTemplate() {
    const response = await fetch("/src/components/search-bar/search-bar.html");
    const html = await response.text();
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.querySelector("template");
  }

   get value() {
    return this.shadowRoot.querySelector("input").value;
  }
}

customElements.define("search-bar", SearchBar);

