export default class Box extends HTMLElement {    
  constructor(color = 'black', size = 100) { // modify this
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
      const res = await fetch('./src/components/example/example.html');//modify this
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

