import './App.css'
import SearchBar from './components/SearchBar'
// import BasketPerStore from './components/BasketPerStore'
import HeaderComponent from './components/HeaderComponent'

function App() {


  return (
    <>
    <SearchBar></SearchBar>
    {/* <BasketPerStore storeName={'Shoprite'} TotalAmount={100}></BasketPerStore> */}
    <HeaderComponent></HeaderComponent>
    </>
  )
}

export default App
