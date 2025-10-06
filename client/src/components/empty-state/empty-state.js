export default class EmptyState extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow DOM so styles and content are encapsulated
    this.attachShadow({ mode: 'open' });
  }

  // Define which attributes should be observed for changes
  static get observedAttributes() {
    return ['type']; // The "type" determines what content to show (list, basket, favorites)
  }

  // Whenever the observed attribute changes, update the component content
  attributeChangedCallback() {
    this.updateContent();
  }

  // Called when the component is inserted into the DOM
  async connectedCallback() {
    try {
      // Fetch the external HTML template
      const res = await fetch('./src/components/empty-state/empty-state.html');
      const htmlText = await res.text();

      // Parse the HTML text into a DOM document
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // Select the <template> element inside that file
      const template = doc.querySelector('template');

      // Clone the template content and attach it to the shadow DOM
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // Fill in the component with appropriate data based on the "type" attribute
      this.updateContent();
    } catch (err) {
      console.error('Error loading empty-state template:', err);
    }
  }

  // This function updates the image, text, and button depending on the "type"
  updateContent() {
    // Default to "list" if no type is given
    const type = this.getAttribute('type') || 'list';

    // Select all elements inside the shadow DOM
    const title = this.shadowRoot.querySelector('.title');
    const message = this.shadowRoot.querySelector('.message');
    const button = this.shadowRoot.querySelector('.action-btn');
    const img = this.shadowRoot.querySelector('.illustration');

    // Configuration object for each empty state
    const configs = {
      list: {
        img: '.client/src/components/empty-state/images/basket-empty.svg',
        title: "No lists yet... let's fix that!",
        message: 'Nothing here but space. Add groceries one by one, or drop in your grocery list file.',
        button: '+ Add List'
      },
      basket: {
        img: '.client/public/src/components/empty-state/images/basket-empty.svg',
        title: 'Your basket is empty',
        message: 'Once you add items they will appear here. Looking for ideas?',
        button: 'Start Comparing'
      },
      favorites: {
        img: '.client/public/src/components/empty-state/images/favorites-empty.svg',
        title: 'No favorites yet',
        message: 'Find something you love, give it a heart, and watch this space fill up with your favorites.',
        button: 'Start adding your favs'
      }
    };

    // Pick the matching config for the given type
    const config = configs[type];

    // If a valid type was found, apply its values to the template
    if (config) {
      img.src = config.img;
      title.textContent = config.title;
      message.textContent = config.message;
      button.textContent = config.button;
    }
  }
}

// Register the <empty-state> custom element
customElements.define('empty-state', EmptyState);
