export default class EmptyState extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.type = this.getAttribute('type') || 'list'; // default type
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type' && oldValue !== newValue) {
      this.type = newValue;
      this.render(); // re-render when the type changes
    }
  }

  async connectedCallback() {
    await this.loadTemplate();
    this.render();
  }

  // Load HTML template from external file
  async loadTemplate() {
    try {
      // ✅ Corrected fetch path (since index.html is inside src/)
      const res = await fetch('./components/empty-state/empty-state.html');
      if (!res.ok) throw new Error(`Failed to fetch template: ${res.status}`);

      const htmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const template = doc.querySelector('template');

      if (!template) {
        console.error('❌ No <template> found in empty-state.html');
        return;
      }

      // Clear and attach new template content
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    } catch (err) {
      console.error('⚠️ Error loading empty-state template:', err);
    }
  }

  // Render component content dynamically based on "type"
  render() {
    // ✅ Correct image paths based on your folder structure
    const images = {
      list: './components/empty-state/images/list-empty.svg',
      basket: './components/empty-state/images/basket-empty.svg',
      favorites: './components/empty-state/images/favorites-empty.svg',
    };

    // Content for each state type
    const content = {
      list: {
        title: "No lists yet... let’s fix that!",
        text: "Nothing here but space. Add groceries one by one, or drop in your grocery list file.",
        button: "Add List",
        image: images.list,
      },
      basket: {
        title: "Your basket is empty",
        text: "Once you add items they will appear here. Looking for ideas?",
        button: "Start Comparing",
        image: images.basket,
      },
      favorites: {
        title: "No favorites yet",
        text: "Find something you love, give it a heart, and watch this space fill up with your favorites.",
        button: "Start adding your favs",
        image: images.favorites,
      },
    };

    const state = content[this.type] || content.list;
    const container = this.shadowRoot.querySelector('.empty-container');

    if (!container) {
      console.error('⚠️ No element with class .empty-container found in template');
      return;
    }

    // Update the component UI
    container.querySelector('img').src = state.image;
    container.querySelector('h2').textContent = state.title;
    container.querySelector('p').textContent = state.text;
    container.querySelector('button').textContent = state.button;

    // ✅ Add button click functionality
    const button = container.querySelector('button');
    if (button) {
      button.addEventListener('click', () => {
        console.log(`${this.type} button clicked`);
        // You can change this to whatever action you want:
        // Example: navigate to a page, show a popup, etc.
        alert(`You clicked on: ${state.button}`);
      });
    }
  }
}

// Register the component
customElements.define('empty-state', EmptyState);

