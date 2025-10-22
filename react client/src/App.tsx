import './App.css'
import ProductCompare from './components/ProductCompare'
import SearchBar from './components/SearchBar'
{/*import LandingPage from './pages/LandingPage';
import ProductAddCard from './components/ProductAddCard'
import BasketTotal from './components/BasketTotal'*/}

function App() {

  return (
    <>
    <SearchBar></SearchBar>
    <ProductCompare></ProductCompare>
   
      {/*<ProductAddCard 
        productName="Generic Product"
        productPrice="15.00"
      />


      <ProductAddCard 
        productName="Organic Bread"
        productPrice="25.99"
        store="Woolworths"
      />


      <ProductAddCard 
        productName="Fresh Milk"
        productPrice="22.50"
        store="Checkers"
      />


      <ProductAddCard 
        productName="White Bread"
        productPrice="18.99"
        store="Pick N Pay"
      />


      <ProductAddCard 
        productName="Brown Bread"
        productPrice="16.75"
        store="Shoprite"
      />
      <LandingPage />
      <BasketTotal />*/}
    </>
    
  )
}

export default App
