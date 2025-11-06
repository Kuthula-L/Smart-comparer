import { useEffect, useState } from "react"
import EmptyState from "../components/EmptyState"
import TopSection from "./TopSection"
import ProductAddCard from "../components/ProductCard"
import BasketTotal from "../components/BasketTotal"
import React from "react"

const Basket = React.memo(() =>{

    const [BasketItems, setBasket] = useState<Object[]>([])
    const [total, setTotals] = useState<any>()
    const [stores, setStoreTotals] = useState<Object[]>([])


    async function fetchitems(){ 
       const  res = await fetch("http://127.0.0.1:8000/products/basket/", {method:"Get"})
       const data = await res.json()
        setBasket(data.basket);
        setTotals(data.basketTotal)
        setStoreTotals(data.storeTotals)
        
        console.log(data)

    }

      useEffect(()=>{
        fetchitems()
    },[])
        

  return (
    <>
      
        <TopSection isList={false} clickMenu={()=>{}} click={() => { } } isMenu={false} setValue={()=>{}} clickList={()=>{}} EmptyState={"basket"} stores={stores} page={"basket"}></TopSection>

        {BasketItems.length !==0? <div id="product-container" style={{display:'grid', gridTemplateColumns: "repeat(2, 160px)", gap: '20px', width:'100%',justifyContent: "center"}}>
          {<BasketTotal total={total}></BasketTotal>}
          {BasketItems.map((item:any)=>{
            const products = item.products 
            const productid = item.product_id
            const productName = products.Product_name
            const img = products.Img_processed 
            const store = products.store_name
            const price = products.Price

           
        
            return <ProductAddCard isInBasket={true} productName={productName} productImage={img} productPrice={price} store={store} productid={productid}></ProductAddCard>
          })}
        </div>
        :<EmptyState type="basket" setFile={()=>{}}></EmptyState>}

        <div style={{height:"200px"}}></div>
    </>
  )
})

export default Basket
