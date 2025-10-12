export default class BottomNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    try {
      const res = await fetch('/src/components/nav-bar/nav-bar.html');
      if (!res.ok) throw new Error(`Failed to fetch template: ${res.status}`);

      const htmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const template = doc.querySelector('template');

      if (!template) throw new Error('No <template> found');

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.updateActiveIcon();
    } catch (err) {
      console.error(err);
    }
  }

  updateActiveIcon() {
    const currentPage = window.location.pathname.split('/').pop();
    const links = this.shadowRoot.querySelectorAll('.bottom-nav a');

    links.forEach(link => {
      const hrefPage = link.getAttribute('href').split('/').pop();
      const icon = link.querySelector('img');
      const iconName = link.dataset.icon;

      if (hrefPage === currentPage) {
        // ✅ Use the filled version
        icon.src = `/${iconName}-fill.svg`;
      } else {
        // 🟩 Use the outline version
        icon.src = `/${iconName}-outline.svg`;
      }
    });
  }
}

customElements.define('bottom-nav', BottomNav);



