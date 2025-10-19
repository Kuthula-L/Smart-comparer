let data = [];

try {
  const response = await fetch("http://127.0.0.1:8000/products/basket/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  data = await response.json();
  console.log("Response data:", data);

  // addProducts(data);
} catch (error) {
  console.error("Fetch error:", error);
}

  const container = document.getElementById("product-container");
if(data){
    data.forEach(item => {
      container.innerHTML += ProductCompare(item["Product_name"], item["Price"],item["Img_unprocessed"] )
    });

}

function ProductCompare(name, price, image) {
    
return `<product-compare style="z-index:0" title="${name}" price="R${price}" image="${image}"> </product-compare>`;
}

// Safely clear total if no data
if (!Array.isArray(data) || data.length === 0) {
//   document.getElementById("total").innerHTML = "";
} else {
    
    document.getElementById("mt").innerHTML = "";
}
