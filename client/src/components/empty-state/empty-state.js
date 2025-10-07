export default class EmptyState extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback() {
    this.updateContent();
  }

  async connectedCallback() {
    try {
      const res = await fetch('./src/components/empty-state/empty-state.html');
      const htmlText = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      const template = doc.querySelector('template');

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.updateContent();
    } catch (err) {
      console.error('Error loading empty-state template:', err);
    }
  }

  updateContent() {
    const type = this.getAttribute('type') || 'list';

    const title = this.shadowRoot.querySelector('.title');
    const message = this.shadowRoot.querySelector('.message');
    const button = this.shadowRoot.querySelector('.action-btn');
    const img = this.shadowRoot.querySelector('.illustration');

    const configs = {
      list: {
        img: '.client/src/components/empty-state/images/basket-empty.svg',
        title: "No lists yet... let's fix that!",
        message: 'Nothing here but space. Add groceries one by one, or drop in your grocery list file.',
        button: { text: '+ Add List', link: '/add-list' }
      },
      basket: {
        img: '.client/public/src/components/empty-state/images/basket-empty.svg',
        title: 'Your basket is empty',
        message: 'Once you add items they will appear here. Looking for ideas?',
        button: { text: 'Start Comparing', link: '/compare' }
      },
      favorites: {
        img: '.client/public/src/components/empty-state/images/favorites-empty.svg',
        title: 'No favorites yet',
        message: 'Find something you love, give it a heart, and watch this space fill up with your favorites.',
        button: { text: 'Start adding your favs', link: '/favorites' }
      }
    };

    const config = configs[type];

    if (config) {
      img.src = config.img;
      title.textContent = config.title;
      message.textContent = config.message;

      // Replace old button to remove previous click listeners
      button.replaceWith(button.cloneNode(true));
      const newButton = this.shadowRoot.querySelector('.action-btn');
      newButton.textContent = config.button.text;

      // Add click event to navigate
      newButton.addEventListener('click', () => {
        window.location.href = config.button.link;
      });
    }
  }
}

customElements.define('empty-state', EmptyState);

