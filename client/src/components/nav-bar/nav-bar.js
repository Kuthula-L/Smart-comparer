export default class BottomNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    try {
      const res = await fetch('./src/components/bottom-nav/bottom-nav.html');
      if (!res.ok) {
        console.error('Failed to fetch template:', res.status, res.statusText);
        return;
      }

      const htmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const template = doc.querySelector('template');

      if (!template) {
        console.error('No <template> found in bottom-nav.html');
        return;
      }

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // Highlight current page
      this.highlightCurrentPage();
    } catch (err) {
      console.error('Error loading bottom nav template:', err);
    }
  }

  highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop(); // e.g. "home.html"
    const links = this.shadowRoot.querySelectorAll('.bottom-nav a');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

customElements.define('bottom-nav', BottomNav);

