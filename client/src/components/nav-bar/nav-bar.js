export default class BottomNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    try {
      const res = await fetch('./src/components/nav-bar/nav-bar.html');
      if (!res.ok) throw new Error(`Failed to fetch template: ${res.status}`);

      const htmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const template = doc.querySelector('template');

      if (!template) throw new Error('No <template> found');

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.highlightCurrentPage();
    } catch (err) {
      console.error(err);
    }
  }

  highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop(); // e.g. "home.html"
    const links = this.shadowRoot.querySelectorAll('.bottom-nav a');

    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

customElements.define('bottom-nav', BottomNav);


