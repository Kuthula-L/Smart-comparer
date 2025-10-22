const filterTemplateURL = new URL('./filter.html', import.meta.url).href;

async function loadFilterTemplate() {
  if (document.getElementById('filter-popup-template')) return;

  const res = await fetch(filterTemplateURL);
  const html = await res.text();

  const container = document.createElement('div');
  container.innerHTML = html;
  const template = container.querySelector('template');

  document.body.appendChild(template);
}

await loadFilterTemplate();

class FilterPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.color = color; // modify this
    this.size = size; // modify this
  }
  static get observedAttributes() {
    return ['color', 'size']; // modify this
  }

  // Step 2: called whenever observed attributes modify
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color') {// modify this
      this.color = newValue;
    }
    if (name === 'size') { // modify this
      this.size = newValue;
    }
    
    this.render(); // update element whenever attributes modify
  }


  async connectedCallback() {
    // load template (wrapped in try/catch to avoid unhandled rejections)
    try {
      const res = await fetch('./src/components/filter/filter.html');//modify this
      if (!res.ok) {
        console.error('Failed to fetch template:', res.status, res.statusText);
        return;
      }
      const htmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const template = doc.querySelector('template');
      if (!template) {
        console.error('No <template> found in example.html');
        return;
      }
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // Optionally style it
      const div = this.shadowRoot.querySelector('.box');//modify this
      
      if (!div) { 
        console.error('No element with class .box found inside template');
        return;
      }
      div.style.width = this.size; // modify from here
      div.style.height = this.size;
      div.style.backgroundColor = this.color;
    } catch (err) {
      console.error('Error loading box template:', err);
    }
}


}

