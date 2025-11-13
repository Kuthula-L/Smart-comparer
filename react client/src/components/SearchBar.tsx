import type { ChangeEvent } from "react";
import React, {  useState } from "react";
// import ProductCompare from "./ProductCompare";
import "./styling/SearchBar.css";

interface Product {
  id: number;
  title: string;
  price: number;
  sale: number;
  image: string;
 
 
 
}

interface Probs{
   GetHomeData : (value:any)=>void;
  //  keyDown: (e: React.KeyboardEvent<HTMLInputElement>)=>void
}

function SearchBar ({GetHomeData}:Probs) {
  const mockResults: Product[] = [
    { id: 1, title: "Product A", price: 95, sale: 90, image: "https://via.placeholder.com/180x180?text=A" },
    { id: 2, title: "Product B", price: 110, sale: 100, image: "https://via.placeholder.com/180x180?text=B" },
    { id: 3, title: "Product C", price: 75, sale: 70, image: "https://via.placeholder.com/180x180?text=C" },
    { id: 4, title: "Product D", price: 145, sale: 140, image: "https://via.placeholder.com/180x180?text=D" },
    { id: 5, title: "Product E", price: 55, sale: 50, image: "https://via.placeholder.com/180x180?text=E" },
  ];

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  // const [homeData, setHome] = useState<Product[]>([]);


  async function fetchitems(){ 
        const  res = await fetch("http://127.0.0.1:8000/products/search/", {method:"Post", headers:{ 
        }, body: JSON.stringify({
          "product":query,
          credentials: "include"
        })})

        const data = await res.json()
        // setHome(data);
        GetHomeData(data)

    }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filtered = mockResults.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleClear = (): void => {
    setQuery("");
    setResults([]);
  };

  
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Searching for:', query);
      fetchitems()
      localStorage.setItem("Change","yes" )
      // call your search function here
      // doSearch(searchQuery);
    }
  }

  // useEffect(()=>{

  //   GetHomeData(homeData)
  // },[query])


  // useImperativeHandle(ref, () => ({
  //   getquery() {
  //     return query;
  //   }
  // }));

  return (
    <div style={{}} className="search-bar">
      <div style={{display:"flex"}} className="input-container">
        <span className="search-icon">
          <img src="/search-svgrepo-com.svg" alt="Search" />
        </span>

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        {query && (
          <span className="clear-icon" onClick={handleClear}>
            ✖
          </span>
        )}
      </div>

      <div className="results-container" style={{ marginTop: "15px", display:"none" }}>
        {results.length === 0 && query && (
          <div >No results found</div>
        )}

          {/* {results.map((item) => (
        <ProductCompare key={item.id} img={""} product={""} price={""} />
        ))} */}
      </div>
    </div>
  );
};

export default SearchBar;
