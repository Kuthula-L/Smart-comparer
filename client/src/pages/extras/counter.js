// export default class Box {
  //     color = "black";
  //     boxSize = 100
  //     element = null
  
  //     constructor(color, boxSize) {
    //         this.boxSize = boxSize + "px";
    //         this.color = color
    //         const template = document.querySelector("#box-template")
    //         this.element = template.content.firstElementChild.cloneNode(true);
    
    //         if (this.element) {
      //             this.element.style.width = this.boxSize;
      //             this.element.style.height = this.boxSize;
      //             this.element.style.backgroundColor = this.color;
      //         } else {
        //             console.error("No element with class .box found!");
        //         }
        
//     }

//     render(containerSelector) {
  //     const container = document.querySelector(containerSelector);
  //     if (container) {
    //       container.append(this.element);
    //     } else {
      //       console.error(`Container ${containerSelector} not found`);
      //     }
      //   }
      // }
      
export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}