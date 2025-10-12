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

const searchBar = document.querySelector("search-bar");
const value = ""
const data = []


document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    console.log("Outside component:", searchBar.value);
    try {
        // Adjust the path relative to your HTML file or Vite/public setup
        // const response = await fetch('http://127.0.0.1:8000/products/search/', {method:"Post"});
        
        const response = await fetch('http://127.0.0.1:8000/products/search/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // ✅ tell Django you're sending JSON
                },
                body: JSON.stringify({
                    product: searchBar.value,  // 👈 example payload — change to your actual key/value
                }),
                });
                if (!response.ok) throw new Error('Network response was not ok');

                const data1 = await response.json()

                // data.push(data1["message"])
                console.log(data1)
                // const html = await response.text();
                // document.getElementById('app').innerHTML = html;
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
})

async function loadPage() {
    //   try {
    //     // Adjust the path relative to your HTML file or Vite/public setup
    //     // const response = await fetch('http://127.0.0.1:8000/products/search/', {method:"Post"});
        
    //     const response = await fetch('http://127.0.0.1:8000/products/search/', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",  // ✅ tell Django you're sending JSON
    //             },
    //             body: JSON.stringify({
    //                 product: value,  // 👈 example payload — change to your actual key/value
    //             }),
    //     });
    //     if (!response.ok) throw new Error('Network response was not ok');

    //     const data1 = await response.json()

    //     data.push(data1["message"])
    //     console.log(data1["message"])
    //     // const html = await response.text();
    //     // document.getElementById('app').innerHTML = html;
    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }
      
    }
// productCard = document.createElement("product-card")


function addProducts(){

    const container = document.getElementById("product-container");
    container.innerHTML = ""
    // container.innerHTML = "<div>tifoom </div>" +"<div>tifoom </div>"


    // productCard.
    // container.appendChild(productCard)

}

async function init() {
  await loadPage();   // wait for fetch to finish
  addProducts();      // now data is available
}

init()
