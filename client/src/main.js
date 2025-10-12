import Box from "./components/example/exmaple"
// import filter from "./components/filter/filter"
import Header from "./components/header/header";
import LandingPage from "./pages/landing-page/LandingPage";
import ProductCard from "./components/product cards/product-card";
// import component class from "./components/example/exmaple"

// const app = document.getElementById('app');
// app.innerHTML = '<landing-page></landing-page>';


customElements.define('my-box', Box);
// customElements.define('filter', filter);
customElements.define('dashboard-header', Header);
customElements.define('landing-page', LandingPage);
customElements.define("product-card", ProductCard);
// customElements.define('component name', "component class");
