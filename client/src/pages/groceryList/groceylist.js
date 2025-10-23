import Box from "../../components/example/exmaple.js";

// Sample data
const groceries = [
  { name: "Milk", store: "Shoprite", price: 25.99, color: "#fffbea", size: 150 },
  { name: "Bread", store: "Checkers", price: 15.49, color: "#fff5e1", size: 150 },
  { name: "Eggs", store: "Spar", price: 35.00, color: "#f8f8ff", size: 150 },
  { name: "Chicken", store: "Pick n Pay", price: 85.99, color: "#ffe4e1", size: 150 },
  { name: "Apples", store: "Shoprite", price: 30.00, color: "#e0ffe0", size: 150 },
];

// Function to render grocery items
function renderGroceries(items) {
  const container = document.querySelector("#boxContainer");
  container.innerHTML = "";
  items.forEach(item => {
    const box = new Box(item.color, item.size);
    const div = document.createElement("div");
    div.style.width = "150px";
    div.style.height = "150px";
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "10px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.background = item.color;
    div.innerHTML = `
      <strong>${item.name}</strong>
      <div>${item.store}</div>
      <div>R${item.price.toFixed(2)}</div>
    `;
    container.appendChild(div);
  });
}

// Initial render
renderGroceries(groceries);

// Handle filter event
document.addEventListener("filter-applied", (e) => {
  const { store, category, min, max } = e.detail;
  let filtered = groceries;

  if (store) filtered = filtered.filter(item => item.store === store);
  if (min) filtered = filtered.filter(item => item.price >= Number(min));
  if (max) filtered = filtered.filter(item => item.price <= Number(max));

  renderGroceries(filtered);
});

// Handle sort event
document.addEventListener("sort-applied", (e) => {
  const { sortBy } = e.detail;
  let sorted = [...groceries];

  if (sortBy === "price-low-high") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high-low") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "name-az") sorted.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "name-za") sorted.sort((a, b) => b.name.localeCompare(a.name));

  renderGroceries(sorted);
});

console.log("Grocery list page active");
