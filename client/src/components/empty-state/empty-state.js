export default class EmptyState extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback() {
    // Only update content if template has already loaded
    if (this.shadowRoot.querySelector('.empty-state')) {
      this.updateContent();
    }
  }

  async connectedCallback() {
    try {
      const res = await fetch('/src/components/empty-state/empty-state.html');
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

    // popup elements (exist in template)
    const popup = this.shadowRoot.querySelector('#uploadPopup');
    const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');
    const confirmBtn = this.shadowRoot.querySelector('#confirmBtn');
    const fileInput = this.shadowRoot.querySelector('#fileInput');

    const configs = {
      list: {
        img: '/list-empty.svg',
        title: "No lists yet... let's fix that!",
        message:
          'Nothing here but space. Add groceries one by one, or drop in your grocery list file.',
        button: { text: 'Upload List'}
      },
      basket: {
        img: '/basket-empty.svg',
        title: 'Your basket is empty',
        message:
          'Once you add items they will appear here. Looking for ideas?',
        button: { text: 'Start Comparing', link: '/src/pages/HomePage.html' }
      },
      favorites: {
        img: '/favorites-empty.svg',
        title: 'No favorites yet',
        message:
          'Find something you love, give it a heart, and watch this space fill up with your favorites.',
        button: { text: 'Start adding your favs', link: '/src/pages/HomePage.html' }
      }
    };

    const config = configs[type];
    if (!config) return;

    img.src = config.img;
    title.textContent = config.title;
    message.textContent = config.message;

    // replace old button to remove previous click listeners
    const newButton = button.cloneNode(true);
    button.replaceWith(newButton);
    newButton.textContent = config.button.text;

    // Add type-specific behavior
    if (type === 'list') {
      newButton.addEventListener('click', () => {
        popup.style.display = 'flex';
      });

      cancelBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        fileInput.value = ''; // reset file input
      });

      confirmBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
          alert(`File selected: ${file.name}`);
          // TODO: replace alert with real upload logic
          popup.style.display = 'none';
          fileInput.value = '';
        } else {
          alert('Please select a file first.');
        }
      });
    } else {
      newButton.addEventListener('click', () => {
        if (config.button.link) window.location.href = config.button.link;
      });
    }
  }
}

customElements.define('empty-state', EmptyState);

