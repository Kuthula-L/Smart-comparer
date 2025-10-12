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

  // Add compared items (if exist)

  let duplicates = [];
  if (Array.isArray(comparedList)) {
    comparedList.forEach((item) => {
      container.innerHTML += ProductCompare(
        item["product_name"],
        item["compared_price"],
        item["base_image"] || ""
      );

    //     let el = ProductCompare( item["product_name"],
    //     item["compared_price"],
    //     item["base_image"] || ""
    //   );

    //   duplicates.push(el)

        // container.appendChild(el)
    });
  }


//   duplicates.forEach(element => {
//     if
//   });

  // Add uncomparable items
  for (let i = 0; i < size; i++) {
    if (picknpay[i]) container.innerHTML += ProductCard(picknpay[i].name, "PicknPay");
    if (checkers[i]) container.innerHTML += ProductCard(checkers[i].name, "Checkers");
    if (woolworths[i]) container.innerHTML += ProductCard(woolworths[i].name, "WoolWorths");
    if (shoprite[i]) container.innerHTML += ProductCard(shoprite[i].name, "Shoprite");
  }
}

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
   <product-compare title="${name}" price="R${price}" image="${image}"> </product-compare>
  `;
}
// function ProductCompare(name, price, image) {

//     const el = document.createElement("product-compare");
//     el.setAttribute("title", name);
//     el.setAttribute("price", price);
//     el.setAttribute("image", image);
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

// console.log(data)
 // <div class="product-card" data-store="${store}">
    //   <h4>${name}</h4>
    //   <p>${store}</p>
    // </div>