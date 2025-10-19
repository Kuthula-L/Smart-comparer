// container.innerHTML = "<div>tifoom </div>" +"<div>tifoom </div>"

    // for (let i = 0; i < size; i++) {
    //     if (picknpay[i]) {
    //         elements.push(picknpay[i])
    //     }
    //     if (checkers[i]) {
    //         const card = createProductCard(checkers[i], "Checkers");
    //         container.appendChild(card);
    //     }
    //     if (woolworths[i]) {
    //         const card = createProductCard(woolworths[i], "WoolWorths");
    //         container.appendChild(card);
    //     }
    //     if (shoprite[i]) {
    //         const card = createProductCard(shoprite[i], "Shopright");
    //         container.appendChild(card);
    //     }
    // }


     // for (let i = 0; i <  4; i++) {
    //     number = numbers[i]

    //     if (size < number){
    //         size = number
    //     };
        
    // }

    // for (let i = 0; i < size-1; i++){
    //     elements.push(picknpay[i])
    //     elements.push(Checkers[i])
    //     elements.push(woolworths[i])
    //     elements.push(shoprig[i])
    // }



    // function card (storeKey){
    



// // Base folder where your SVG logos live. Change this if your static path differs.
// const LOGO_BASE = "./public";

// // Explicit mapping from normalized store key -> filename (SVG).
// const STORE_LOGOS = {
//     woolworths: "woolworths.svg",
//     shoprite: "shoprite.svg",
//     checkers: "checkers.svg",
//     picknpay: "pnp.svg",
//     pnp: "pnp.svg",
// };

// const STORE_THEMES = {
//   woolworths: {
//     borderColor: "#111111",
//     imageBg: "#f3f3f4",
//     addBtn: "#111111",
//     logoBg: "#ffffff",
//     logoText: "#111111",
//   },
//   shoprite: {
//     borderColor: "#d7262f",
//     imageBg: "#ffdfe6",
//     addBtn: "#d7262f",
//     logoBg: "#ffffff",
//     logoText: "#d7262f",
//   },
//   checkers: {
//     borderColor: "#0b7fd1",
//     imageBg: "#e8f6ff",
//     addBtn: "#0b7fd1",
//     logoBg: "#ffffff",
//     logoText: "#0b7fd1",
//   },
//   picknpay: {
//     borderColor: "#5b2a86",
//     imageBg: "#f0e8fb",
//     addBtn: "#5b2a86",
//     logoBg: "#580f4fff",
//     logoText: "#5b2a86",
//   },}

// const box = ''
// const imageBg=""
// const addButton=""

// const theme = getTheme(storeKey);
//     if (box && theme.borderColor) {
//       box.style.borderColor = theme.borderColor;
//     }
//     if (imageBg && theme.imageBg) {
//       imageBg.style.background = theme.imageBg;
//     }
//     if (addButton && theme.addBtn) {
//       addButton.style.background = theme.addBtn;
//     }
//     if (logo) {
//       logo.style.background = theme.logoBg;
//       logo.style.color = theme.logoText;
//     }




// return `
// <style>
//     /* component root */
//     .add-button-component {
//         --store-border: #d18286;
//         --image-bg: #f3f3f4;
//       --add-btn-bg: #000;
//       --logo-bg: #fff;
//       --logo-text: #000;
//       box-sizing: border-box;
//       width: 160px;
//       height: 245px;
//       position: relative; /* needed so absolute children (logo, buttons) position correctly */
//       font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//       overflow: visible;
//       margin-left:100px;
//       }

//       /* card base */
//       .box {
        
//       width: 100%;
//       height: 100%;
//       background: white;
//       border: 1px solid ${theme.borderColor};
//       border-radius: 20px;
//       box-sizing: border-box;
//       padding: 5px;           /* use padding instead of absolute positions */
//       display: flex;
//       flex-direction: column;
//       align-items: stretch;
//       justify-content: flex-start;
//       }

//       /* image area (kept in flow) */
//       .box2 {
//         width: 100%;
//       height: 195px;
//       border-radius: 10px;
//       background: ${theme.imageBg};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       overflow: hidden;
//       }
      
//       .product-image {
//         width: 95px;
//       height: 95px;
//       display: block;
//       /* centered by parent */
//     }
//     .product-image .product-img {
//       width: 100%;
//       height: 100%;
//       object-fit: contain;
//       display: block;
//       }

//     /* text area (flow under image) */
//     .Product-name {
//       margin-top: 8px;
//       font-weight: 600;
//       color: #222;
//       font-size: 16px;
//     }
//     .Product-price, .Product-sale-price {
//       margin-top: 6px;
//       font-size: 12px;
//       color: #666;
//     }
//     .Product-sale-price { color: #e63946; }

//     /* right box (small price/add container) - kept in flow, placed with margin-left auto */
//     .box3 {
//         position: absolute;
//       width: 65px;
//       height: 60px;
//       background: white;
//       border-top: 1px solid var(--store-border);
//       border-left: 1px solid var(--store-border);
//       border-radius: 5px;
//       align-self: flex-end;
      
//       right:0px;
//       bottom:0px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       box-sizing: border-box;
//     }
    
//     /* add button: absolute so it can overlap card corner */
//     .add-button {
//       position: absolute;
//       right: 1px;     /* relative to .add-button-component */
//       bottom: 1px;
//       width: 55px;
//       height: 55px;
//       border: none;
//       border-radius:50px;
//       border-bottom-left-radius:10px;
//       background: ${theme.addBtn}
//       color: white;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;
//       padding: 0;
//       z-index: 20;
//     }
//     .add-button img { width: 36px; height: 36px; object-fit: contain; display: block; }
    
//     /* heart (favorite) button: absolute top-right */
//     .heart-button {
//       position: absolute;
//       top: 10px;
//       right: 12px;
//       width: 28px;
//       height: 28px;
//       border: none;
//       background: transparent;
//       padding: 0;
//       cursor: pointer;
//       z-index: 25;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .heart-button img { width: 100%; height: 100%; object-fit: contain; display: block; }

//     /* logo container: absolute top-left and pops out */
//     .logo-box {
//       position: absolute;
//       top: -10px;
//       left: -10px;
//       width: 65px;
//       height: 60px;
//       background: transparent;
//       z-index: 30;
//       overflow: visible;
//       pointer-events: none; /* decorative */
//     }
//     .logo {
//         position: absolute;
//         top: -10px;
//         left: -10px;
//         width: 70px;
//         height: 65px;
//       border-bottom-right-radius: 60px;
//       border-top-left-radius: 5px;
//       background: var(--logo-bg);
//       color: var(--logo-text);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       overflow: hidden;
//       transform: translateY(-6px);
//       z-index: 31;
//       }
//       .logo .logo-img { max-width: 100%; max-height: 100%; object-fit: contain; display: block; }
      
//       </style>

//       <div class="add-button-component">
//       <div class="box">
//       <div class="box2">
//         <div class="product-image"><img class="product-img" src="" data-src="product-image.jpg" alt="Product image"></div>
//         </div>
        
//       <div class="Product-name" src="product-name">Product Name</div>
//       <div class="Product-price" src="product-price">Price -</div>
//       <div class="Product-sale-price" src="product-sale-price">Sale -</div>
      
//       <div style="flex:1"></div> <!-- pushes box3 / footer upwards if needed -->
      
//       <div class="box3"></div>
//     </div>
    
//     <button class="add-button" aria-label="Add to basket" type="button">
//       <img src="/add-circle-svgrepo-com.svg" alt="add-button" />
//       </button>
      
//       <button class="heart-button" aria-label="Add to favourites" type="button">
//       <img src="/whiteHeart.svg" alt="heart" />
//       </button>

//       <div class="logo-box"></div>
//     <div class="logo" src="logo.png">
//     <img src="" data-src="logo.png" alt="Logo" class="logo-img" />
//     </div>
//    </div>
// `;

// }
// function card (storeKey){
    



// // Base folder where your SVG logos live. Change this if your static path differs.
// const LOGO_BASE = "./public";

// // Explicit mapping from normalized store key -> filename (SVG).
// const STORE_LOGOS = {
//     woolworths: "woolworths.svg",
//     shoprite: "shoprite.svg",
//     checkers: "checkers.svg",
//     picknpay: "pnp.svg",
//     pnp: "pnp.svg",
// };

// const STORE_THEMES = {
//   woolworths: {
//     borderColor: "#111111",
//     imageBg: "#f3f3f4",
//     addBtn: "#111111",
//     logoBg: "#ffffff",
//     logoText: "#111111",
//   },
//   shoprite: {
//     borderColor: "#d7262f",
//     imageBg: "#ffdfe6",
//     addBtn: "#d7262f",
//     logoBg: "#ffffff",
//     logoText: "#d7262f",
//   },
//   checkers: {
//     borderColor: "#0b7fd1",
//     imageBg: "#e8f6ff",
//     addBtn: "#0b7fd1",
//     logoBg: "#ffffff",
//     logoText: "#0b7fd1",
//   },
//   picknpay: {
//     borderColor: "#5b2a86",
//     imageBg: "#f0e8fb",
//     addBtn: "#5b2a86",
//     logoBg: "#580f4fff",
//     logoText: "#5b2a86",
//   },}

// const box = ''
// const imageBg=""
// const addButton=""

// const theme = getTheme(storeKey);
//     if (box && theme.borderColor) {
//       box.style.borderColor = theme.borderColor;
//     }
//     if (imageBg && theme.imageBg) {
//       imageBg.style.background = theme.imageBg;
//     }
//     if (addButton && theme.addBtn) {
//       addButton.style.background = theme.addBtn;
//     }
//     if (logo) {
//       logo.style.background = theme.logoBg;
//       logo.style.color = theme.logoText;
//     }




// return `
// <style>
//     /* component root */
//     .add-button-component {
//         --store-border: #d18286;
//         --image-bg: #f3f3f4;
//       --add-btn-bg: #000;
//       --logo-bg: #fff;
//       --logo-text: #000;
//       box-sizing: border-box;
//       width: 160px;
//       height: 245px;
//       position: relative; /* needed so absolute children (logo, buttons) position correctly */
//       font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//       overflow: visible;
//       margin-left:100px;
//       }

//       /* card base */
//       .box {
        
//       width: 100%;
//       height: 100%;
//       background: white;
//       border: 1px solid ${theme.borderColor};
//       border-radius: 20px;
//       box-sizing: border-box;
//       padding: 5px;           /* use padding instead of absolute positions */
//       display: flex;
//       flex-direction: column;
//       align-items: stretch;
//       justify-content: flex-start;
//       }

//       /* image area (kept in flow) */
//       .box2 {
//         width: 100%;
//       height: 195px;
//       border-radius: 10px;
//       background: ${theme.imageBg};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       overflow: hidden;
//       }
      
//       .product-image {
//         width: 95px;
//       height: 95px;
//       display: block;
//       /* centered by parent */
//     }
//     .product-image .product-img {
//       width: 100%;
//       height: 100%;
//       object-fit: contain;
//       display: block;
//       }

//     /* text area (flow under image) */
//     .Product-name {
//       margin-top: 8px;
//       font-weight: 600;
//       color: #222;
//       font-size: 16px;
//     }
//     .Product-price, .Product-sale-price {
//       margin-top: 6px;
//       font-size: 12px;
//       color: #666;
//     }
//     .Product-sale-price { color: #e63946; }

//     /* right box (small price/add container) - kept in flow, placed with margin-left auto */
//     .box3 {
//         position: absolute;
//       width: 65px;
//       height: 60px;
//       background: white;
//       border-top: 1px solid var(--store-border);
//       border-left: 1px solid var(--store-border);
//       border-radius: 5px;
//       align-self: flex-end;
      
//       right:0px;
//       bottom:0px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       box-sizing: border-box;
//     }
    
//     /* add button: absolute so it can overlap card corner */
//     .add-button {
//       position: absolute;
//       right: 1px;     /* relative to .add-button-component */
//       bottom: 1px;
//       width: 55px;
//       height: 55px;
//       border: none;
//       border-radius:50px;
//       border-bottom-left-radius:10px;
//       background: ${theme.addBtn}
//       color: white;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;
//       padding: 0;
//       z-index: 20;
//     }
//     .add-button img { width: 36px; height: 36px; object-fit: contain; display: block; }
    
//     /* heart (favorite) button: absolute top-right */
//     .heart-button {
//       position: absolute;
//       top: 10px;
//       right: 12px;
//       width: 28px;
//       height: 28px;
//       border: none;
//       background: transparent;
//       padding: 0;
//       cursor: pointer;
//       z-index: 25;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .heart-button img { width: 100%; height: 100%; object-fit: contain; display: block; }

//     /* logo container: absolute top-left and pops out */
//     .logo-box {
//       position: absolute;
//       top: -10px;
//       left: -10px;
//       width: 65px;
//       height: 60px;
//       background: transparent;
//       z-index: 30;
//       overflow: visible;
//       pointer-events: none; /* decorative */
//     }
//     .logo {
//         position: absolute;
//         top: -10px;
//         left: -10px;
//         width: 70px;
//         height: 65px;
//       border-bottom-right-radius: 60px;
//       border-top-left-radius: 5px;
//       background: var(--logo-bg);
//       color: var(--logo-text);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       overflow: hidden;
//       transform: translateY(-6px);
//       z-index: 31;
//       }
//       .logo .logo-img { max-width: 100%; max-height: 100%; object-fit: contain; display: block; }
      
//       </style>

//       <div class="add-button-component">
//       <div class="box">
//       <div class="box2">
//         <div class="product-image"><img class="product-img" src="" data-src="product-image.jpg" alt="Product image"></div>
//         </div>
        
//       <div class="Product-name" src="product-name">Product Name</div>
//       <div class="Product-price" src="product-price">Price -</div>
//       <div class="Product-sale-price" src="product-sale-price">Sale -</div>
      
//       <div style="flex:1"></div> <!-- pushes box3 / footer upwards if needed -->
      
//       <div class="box3"></div>
//     </div>
    
//     <button class="add-button" aria-label="Add to basket" type="button">
//       <img src="/add-circle-svgrepo-com.svg" alt="add-button" />
//       </button>
      
//       <button class="heart-button" aria-label="Add to favourites" type="button">
//       <img src="/whiteHeart.svg" alt="heart" />
//       </button>

//       <div class="logo-box"></div>
//     <div class="logo" src="logo.png">
//     <img src="" data-src="logo.png" alt="Logo" class="logo-img" />
//     </div>
//    </div>
// `;

// }

// function getTheme(storeKey) {
//     if (!storeKey) return STORE_THEMES.woolworths;
//     if (storeKey.startsWith("wool")) return STORE_THEMES.woolworths;
//     if (storeKey.startsWith("shop")) return STORE_THEMES.shoprite;
//     if (storeKey.startsWith("check")) return STORE_THEMES.checkers;
//     if (storeKey.startsWith("pick") || storeKey.startsWith("pnp"))
//         return STORE_THEMES.picknpay;
//     return STORE_THEMES.woolworths;
// }