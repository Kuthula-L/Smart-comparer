// import ProductCard from "../../components/product cards/product-card";


// document.addEventListener("DOMContentLoaded", () => {
//   // Select DOM elements
//   const input = document.querySelector("#search-input");
//   const clearIcon = document.querySelector(".clear-icon");
//   const resultsContainer = document.querySelector(".results");

//   // Mock data (replace this later with your API results)
//   const mockResults = [
//     { title: "Apples" },
//     { title: "Bananas" },
//     { title: "Oranges" },
//     { title: "Grapes" },
//     { title: "Pineapples" },
//   ];

//   // Check that elements exist
//   if (!input) {
//     console.error("❌ Search input not found. Check your HTML selector (e.g., #search-input).");
//     return;
//   }

//   // Listen for typing in input field
//   input.addEventListener("input", () => {
//     // Show or hide the clear (X) icon
//     if (clearIcon) {
//       clearIcon.style.display = input.value ? "flex" : "none";
//     }

//     // Filter results dynamically
//     if (input.value) {
//       const results = mockResults.filter(item =>
//         item.title.toLowerCase().includes(input.value.toLowerCase())
//       );
//       renderResults(results);
//     } else {
//       resultsContainer.innerHTML = "";
//     }
//   });

//   // Detect Enter key press anywhere on page
//   document.addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//       console.log("🔍 Searching for:", input.value);
//       // Optionally call your fetch here
//       // searchProducts(input.value);
//     }
//   });

//   // Render filtered results
//   function renderResults(results) {
//     resultsContainer.innerHTML = results
//       .map(r => `<div class="result-item">${r.title}</div>`)
//       .join("");
//   }

//   // Optional: handle clicking the clear icon
//   if (clearIcon) {
//     clearIcon.addEventListener("click", () => {
//       input.value = "";
//       clearIcon.style.display = "none";
//       resultsContainer.innerHTML = "";
//     });
//   }
// });


// // Example rendering function
// function renderResults(results) {
//   resultsContainer.innerHTML = results.map(r => `<div>${r.title}</div>`).join("");
// }

// const searchBar = document.querySelector("search-bar");
// const value = ""
// let data = {}


// document.addEventListener("keydown", async (event) => {
//   if (event.key === "Enter") {
//     console.log("Outside component:", searchBar.value);
//     try {
//         // Adjust the path relative to your HTML file or Vite/public setup
//         // const response = await fetch('http://127.0.0.1:8000/products/search/', {method:"Post"});
        
//         const response = await fetch('http://127.0.0.1:8000/products/search/', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",  // ✅ tell Django you're sending JSON
//                 },
//                 body: JSON.stringify({
//                     product: searchBar.value,  // 👈 example payload — change to your actual key/value
//                 }),
//                 });
//                 if (!response.ok) throw new Error('Network response was not ok');

//                 data = await response.json()
//                 console.log(data)

//                 addProducts(data)
//                 // data.push(data1["message"])
//                 // console.log(data1)
//                 // const html = await response.text();
//                 // document.getElementById('app').innerHTML = html;
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         }


// })

// async function loadPage() {
//     //   try {
//     //     // Adjust the path relative to your HTML file or Vite/public setup
//     //     // const response = await fetch('http://127.0.0.1:8000/products/search/', {method:"Post"});
        
//     //     const response = await fetch('http://127.0.0.1:8000/products/search/', {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",  // ✅ tell Django you're sending JSON
//     //             },
//     //             body: JSON.stringify({
//     //                 product: value,  // 👈 example payload — change to your actual key/value
//     //             }),
//     //     });
//     //     if (!response.ok) throw new Error('Network response was not ok');

//     //     const data1 = await response.json()

//     //     data.push(data1["message"])
//     //     console.log(data1["message"])
//     //     // const html = await response.text();
//     //     // document.getElementById('app').innerHTML = html;
//     //   } catch (error) {
//     //     console.error('Fetch error:', error);
//     //   }
      
//     }
// // productCard = document.createElement("product-card")


// function addProducts(feed){

//     let comparedEl = [];

//     let comparedList = feed["compared_data"]
//     let uncomparedList = feed["uncomparable_data"]

//      const picknpay = uncomparedList["PicknPay"] || [];
//     const checkers = uncomparedList["Checkers"] || [];
//     const woolworths = uncomparedList["WoolWorths"] || [];
//     const shoprite = uncomparedList["Shopright"] || [];
   
//     let numbers = [picknpay.length,checkers.length, woolworths.length, shoprite.length]
//     const size = Math.max(...numbers);

   

//     console.log(elements)

//     const container = document.getElementById("product-container");

//     elements = ""
    
//     for (let i = 0; i < Object.keys(comparedList).length; i++) {
//         elements += ProductCard(comparedList[i]["product_name"],comparedList[i]["compared_store"], "", "", "")
//         comparedEl.push(el)
        
//     }
//     container.innerHTML = elements
    


// }

// async function init() {
//   await loadPage();   // wait for fetch to finish
//   addProducts();      // now data is available
// }

// function ProductCompare(Productname, avgPrice, img ) {
//     // return `<productCompare title="${Productname}" price="${avgPrice}" image="${img}"></productCompare>`
//     return `<div styling={width:150px; height: 200px} title="${Productname}" price="${avgPrice}" image="${img}"></div>`
// }
// function ProductCard(Productname, store, price , image, logo, dataId ) {
//      return `<div styling={width:150px; height: 200px}  store="${Productname}" price="${price}" image="${image}" store="${store}"></div>`
//     // return `<productCompare store="${Productname}" price="${price}" image="${image}" store="${store}"></productCompare>`
// }

// init()


const searchBar = document.querySelector("search-bar"); 
let data = {};
// Listen for Enter key
document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    // --- Get value from inside search-bar component ---
    const input = searchBar.shadowRoot.querySelector("input");
    const query = input.value.trim();

    if (!query) return; // don't search empty

    console.log("Outside component value:", query);

    try {
      const response = await fetch("http://127.0.0.1:8000/products/search/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: query }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      data = await response.json();
      console.log("Response data:", data);

      addProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
});

function addProducts(feed) {
  if (!feed) return;

//   basketdata[0]["product_name"] = "albany"

  const comparedList = feed["compared_data"] || [];
  const uncomparedList = feed["uncomparable_data"] || {};

  const picknpay = uncomparedList["PicknPay"] || [];
  const checkers = uncomparedList["Checkers"] || [];
  const woolworths = uncomparedList["WoolWorths"] || [];
  const shoprite = uncomparedList["Shopright"] || [];

  const numbers = [picknpay.length, checkers.length, woolworths.length, shoprite.length];
  const size = Math.max(...numbers);

  const container = document.getElementById("product-container");
  container.innerHTML = ""; // clear previous results
    const fragment = document.createDocumentFragment();
  // Add compared items (if exist)

  let duplicates = [];
  if (Array.isArray(comparedList)) {
    for(let i= 0; i < comparedList.length; i++){
        let item = comparedList[i];
        if (item["compared_stores"] && item["compared_stores"].length > 0) {
      container.innerHTML += ProductCompare(
        item["product_name"],
        item["compared_stores"][0]["price"],
        item["base_image"] || ""
      );


    //   if (i > 10){
    //     break
    //   }
    }
let temp = container.innerHTML
 const compareCards = container.querySelectorAll("product-compare");
  compareCards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const item = comparedList[i];
      showPopup(item);
      container.innerHTML = ""
    });
  });

    // item["compared_stores"]
        // if (item["compared_stores"] && item["compared_stores"].length > 0) {
        // const el = ProductCompare(item["product_name"],item["compared_stores"][0]["price"],item["base_image"] || "");

        // fragment.appendChild(el);

        // }
        
        
        //   duplicates.push(el)
    };
    container.querySelectorAll("product-compare")


//     container.forEach(el => {
//         el.addEventListener("click", (e) => {
//         comList = item["compared_stores"]

        
//         comList.forEach(element => {
//             // elemnet
//         });
//         console.log("Clicked product:", item["product_name"]);
//         console.log("Compared stores:", item["compared_stores"]);
//     // 👉 You can trigger a modal, open a details view, etc.
//       });
        
//     });

//     container.appendChild(fragment);
//     attachCompareListeners(feed);

  }

//   for (let i = 0; i < size; i++) {
//     if (picknpay[i]){ let el = card("PicknPay", picknpay[i]); container.appendChild(el)}
//     if (checkers[i]){ let el = card("Checkers",checkers[i]);container.appendChild(el)}
//     if (woolworths[i]){ let el= card("WoolWorths",woolworths[i]);container.appendChild(el)}
//     if (shoprite[i]){let el = card("Shoprite",shoprite[i]);container.appendChild(el)}
//     // if (picknpay[i]) container.innerHTML += ProductCard(picknpay[i].name, "PicknPay");
//     // if (checkers[i]) container.innerHTML += ProductCard(checkers[i].name, "Checkers");
//     // if (woolworths[i]) container.innerHTML += ProductCard(woolworths[i].name, "WoolWorths");
//     // if (shoprite[i]) container.innerHTML += ProductCard(shoprite[i].name, "Shoprite");
    
//   }
}


//   if (item["compared_stores"] && item["compared_stores"].length > 0) {
//         const el = ProductCompare(
//         item["product_name"],
//         item["compared_stores"][0]["price"],
//         item["base_image"] || "",
//         item["compared_stores"]
//         );

//         container.appendChild(el);


// Helper templates
// function ProductCompare(name, avgPrice, img) {
//   return `
//     <div class="product-compare">
//       <img src="${img}" alt="${name}" width="100" height="100">
//       <h3>${name}</h3>
//       <p>Avg Price: ${avgPrice}</p>
//     </div>
//   `;
// }
function ProductCompare(name, price, image) {
  return `
   <product-compare style="z-index:0" title="${name}" price="R${price}" image="${image}"> </product-compare>
  `;
}
// function ProductCompare(name,price, image) {

//     const el = document.createElement("product-compare");
//     el.setAttribute("title", name);
//     el.setAttribute("price", "R "+price);
//     el.setAttribute("image", image);
//     // el.setAttribute("data", data)
//     // container.appendChild(el);
//   return el;
// }

function ProductCard(name, store, price = "", image = "", logo = "", dataId = "") {
  return `
    <product-card
    store="${store}"
    name="${name}"
    price="${price}"
    sale="R12.50"
    image="${image}"
    logo-src=""
    ></product-card>
  `;
}




function card(storeKey,image, title, price, sale) {
    // Base folder where your SVG logos live. Change this if your static path differs.
    const LOGO_BASE = "./public";

    // Explicit mapping from normalized store key -> filename (SVG).
    const STORE_LOGOS = {
        woolworths: "woolworths.svg",
        shoprite: "shoprite.svg",
        checkers: "checkers.svg",
        picknpay: "pnp.svg",
        pnp: "pnp.svg",
    };

    const STORE_THEMES = {
        woolworths: {
            borderColor: "#111111",
            imageBg: "#f3f3f4",
            addBtn: "#111111",
            logoBg: "#ffffff",
            logoText: "#111111",
        },
        shoprite: {
            borderColor: "#d7262f",
            imageBg: "#ffdfe6",
            addBtn: "#d7262f",
            logoBg: "#ffffff",
            logoText: "#d7262f",
        },
        checkers: {
            borderColor: "#0b7fd1",
            imageBg: "#e8f6ff",
            addBtn: "#0b7fd1",
            logoBg: "#ffffff",
            logoText: "#0b7fd1",
        },
        picknpay: {
            borderColor: "#5b2a86",
            imageBg: "#f0e8fb",
            addBtn: "#5b2a86",
            logoBg: "#580f4f",
            logoText: "#5b2a86",
        },
    };

    const theme = getTheme(storeKey);
    const logoFile = getStoreLogo(storeKey);

    function getStoreLogo(storeKey) {
        if (!storeKey) return STORE_LOGOS.woolworths;
        const normalizedKey = storeKey.toLowerCase();
        if (normalizedKey.startsWith("wool")) return STORE_LOGOS.woolworths;
        if (normalizedKey.startsWith("shop")) return STORE_LOGOS.shoprite;
        if (normalizedKey.startsWith("check")) return STORE_LOGOS.checkers;
        if (normalizedKey.startsWith("pick") || normalizedKey.startsWith("pnp")) 
            return STORE_LOGOS.picknpay;
        return STORE_LOGOS.woolworths;
    }

    function getTheme(storeKey) {
        if (!storeKey) return STORE_THEMES.woolworths;
        const normalizedKey = storeKey.toLowerCase();
        if (normalizedKey.startsWith("wool")) return STORE_THEMES.woolworths;
        if (normalizedKey.startsWith("shop")) return STORE_THEMES.shoprite;
        if (normalizedKey.startsWith("check")) return STORE_THEMES.checkers;
        if (normalizedKey.startsWith("pick") || normalizedKey.startsWith("pnp"))
            return STORE_THEMES.picknpay;
        return STORE_THEMES.woolworths;
    }


const wrapper = document.createElement('div');
  wrapper.classList.add('add-button-component');

  wrapper.innerHTML = `
  <style>
    .box { border: 1px solid ${theme.borderColor}; border-radius: 20px; padding: 5px; }
    .box2 { background: ${theme.imageBg}; width:100%; height:195px; border-radius:10px; display:flex; align-items:center; justify-content:center; }
    .product-img { width:95px; height:95px; object-fit:contain; }
    .Product-name { margin-top:8px; font-weight:600; font-size:16px; color:#222; }
    .Product-price { margin-top:6px; font-size:12px; color:#666; }
    .Product-sale-price { margin-top:6px; font-size:12px; color:#e63946; }
    .add-button { background: ${theme.addBtn}; border:none; border-radius:50px; width:55px; height:55px; bottom:1px; right:1px; display:flex; justify-content:center; align-items:center; cursor:pointer; }
    .heart-button { position:absolute; top:10px; right:12px; width:28px; height:28px; cursor:pointer; background:transparent; border:none; display:flex; justify-content:center; align-items:center; }
  </style>
  
  <div class="box">
    <div class="box2">
      <img class="product-img" src="${image}" alt="${title}">
    </div>
    <div class="Product-name">${title}</div>
    <div class="Product-price">Price - R${price}</div>
    <div class="Product-sale-price">Sale - R${sale || '-'}</div>
  </div>

  <button class="add-button" aria-label="Add to basket" style>
    <img style="width:40px; height:40px" src="/add-circle-svgrepo-com.svg" alt="add">
  </button>

  <button class="heart-button" aria-label="Add to favourites">
    <img src="/whiteHeart.svg" alt="heart">
  </button>
  `;

  // Optional: attach event listeners here
//   wrapper.querySelector('.add-button').addEventListener('click', () => console.log('Add', title));
//   wrapper.querySelector('.heart-button').addEventListener('click', () => console.log('Heart', title));

  return wrapper;
}


function showPopup(item) {
  const popup = document.getElementById("popUp");
  popup.innerHTML = ""; // clear previous content

  if (!item) return;

  const base = {
    store: item["base_store"],
    price: item["base_price"],
    image: item["base_image"],
  };

  // Combine base store and compared stores (limit to 4 total)
  const stores = [base, ...(item["compared_stores"] || [])].slice(0, 4);

  let html = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h2>${item["product_name"]}</h2>
      <button id="closePopup" style="
        background:none; border:none; font-size:24px; cursor:pointer;">✖</button>
    </div>
    <div style="
      display:grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      margin-top: 20px;
    ">
  `;

 
  stores.forEach((s) => {
    html += `

       <product-card
store="${s.store}"
data-id="p-001"
title="${item["product_name"]}"
price="R${s.price}"
image="${s.image || item.base_image}"
logo-src=""
template-id = "add-button-template"

></product-card> 
    `;
  });

  html += `</div>`;

  popup.innerHTML = html;
  popup.style.display = "block";

  // Close button
  document.getElementById("closePopup").addEventListener("click", () => {
    popup.style.display = "none";
  });


}


{/* <div style="
        border:1px solid #ddd;
        border-radius:10px;
        padding:10px;
        text-align:center;
        background:#fafafa;
      ">
        <img src="${s.image || item.base_image}" 
             alt="${s.store}" 
             style="width:100px;height:100px;object-fit:contain;">
        <h3>${s.store}</h3>
        <p style="font-weight:bold;color:#333;">R${s.price}</p>
      </div>

//     return ` */}
// <style>
//     .add-button-component {
//         box-sizing: border-box;
//         width: 160px;
//         height: 245px;
//         position: relative;
//         font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//         overflow: visible;
//         margin-left: 100px;
//     }

//     .box {
//         width: 100%;
//         height: 100%;
//         background: white;
//         border: 1px solid ${theme.borderColor};
//         border-radius: 20px;
//         box-sizing: border-box;
//         padding: 5px;
//         display: flex;
//         flex-direction: column;
//         align-items: stretch;
//         justify-content: flex-start;
//     }

//     .box2 {
//         width: 100%;
//         height: 195px;
//         border-radius: 10px;
//         background: ${theme.imageBg};
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         overflow: hidden;
//     }
    
//     .product-image {
//         width: 95px;
//         height: 95px;
//         display: block;
//     }
    
//     .product-image .product-img {
//         width: 100%;
//         height: 100%;
//         object-fit: contain;
//         display: block;
//     }

//     .Product-name {
//         margin-top: 8px;
//         font-weight: 600;
//         color: #222;
//         font-size: 16px;
//     }
    
//     .Product-price, .Product-sale-price {
//         margin-top: 6px;
//         font-size: 12px;
//         color: #666;
//     }
    
//     .Product-sale-price { 
//         color: #e63946; 
//     }

//     .box3 {
//         position: absolute;
//         width: 65px;
//         height: 60px;
//         background: white;
//         border-top: 1px solid ${theme.borderColor};
//         border-left: 1px solid ${theme.borderColor};
//         border-radius: 5px;
//         right: 0px;
//         bottom: 0px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         box-sizing: border-box;
//     }
    
//     .add-button {
//         position: absolute;
//         right: 1px;
//         bottom: 1px;
//         width: 55px;
//         height: 55px;
//         border: none;
//         border-radius: 50px;
//         border-bottom-left-radius: 10px;
//         background: ${theme.addBtn};
//         color: white;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         cursor: pointer;
//         padding: 0;
//         z-index: 20;
//     }
    
//     .add-button img { 
//         width: 36px; 
//         height: 36px; 
//         object-fit: contain; 
//         display: block; 
//     }
    
//     .heart-button {
//         position: absolute;
//         top: 10px;
//         right: 12px;
//         width: 28px;
//         height: 28px;
//         border: none;
//         background: transparent;
//         padding: 0;
//         cursor: pointer;
//         z-index: 25;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//     }
    
//     .heart-button img { 
//         width: 100%; 
//         height: 100%; 
//         object-fit: contain; 
//         display: block; 
//     }
// </style>

// <div class="add-button-component">
//     <div class="box">
//         <div class="box2">
//             <div class="product-image">
//                 <img class="product-img" src="" data-src="product-image.jpg" alt="Product image">
//             </div>
//         </div>
        
//         <div class="Product-name">Product Name</div>
//         <div class="Product-price">Price - {data[]}</div>
//         <div class="Product-sale-price">Sale -</div>
        
//         <div style="flex:1"></div>
        
//         <div class="box3"></div>
//     </div>
    
//     <button class="add-button" aria-label="Add to basket" type="button">
//         <img src="/add-circle-svgrepo-com.svg" alt="add-button">
//     </button>
    
//     <button class="heart-button" aria-label="Add to favourites" type="button">
//         <img src="/whiteHeart.svg" alt="heart">
//     </button>

// </div>`;
// }



// console.log(data)
 // <div class="product-card" data-store="${store}">
    //   <h4>${name}</h4>
    //   <p>${store}</p>
    // </div>