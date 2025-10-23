import './App.css'
import SearchBar from './components/SearchBar'
import BasketPerStore from './components/BasketPerStore'

function App() {


  return (
    <>
    <SearchBar></SearchBar>
    <BasketPerStore storeName={'Shoprite'} TotalAmount={100}></BasketPerStore>
    </>
  )
}

export default App
