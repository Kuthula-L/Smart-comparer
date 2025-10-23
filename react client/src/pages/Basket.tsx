import { useEffect, useState } from "react"
import EmptyState from "../components/EmptyState"
import SearchBar from "../components/SearchBar"

function Basket() {

    const [BasketItems, setBasket] = useState<Object>()

    async function fetchitems(){ 
       const  res = await fetch("url", {method:"Get"})
       const data = res.json()
        setBasket(data);

    }

      useEffect(()=>{
            fetchitems()
    },[])
        

  return (
    <>
        <SearchBar></SearchBar>
        <EmptyState type="basket"></EmptyState>
    </>
  )
}

export default Basket
