import "./styling/SearchBar.css"

function SearchBar() {
return (
  <>
  <div className="search-container">
    <div className="search-bar">
      <span className="search-icon"><img src="/search-svgrepo-com.svg" alt="Search" /></span>
      <input id="search-input" type="text" placeholder="Search..." />
      <span className="clear-icon">✖</span>
    </div>
  </div>

  <div className="results-container"></div>

  </>


  )
}

export default SearchBar
