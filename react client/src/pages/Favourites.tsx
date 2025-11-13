import { useEffect, useState } from 'react'
import TopSection from './TopSection'
// import ProductAddCard from '../components/ProductCard'
// import BasketTotal from '../components/BasketTotal'
import EmptyState from '../components/EmptyState'
import ProductAddCard from '../components/ProductCard'


function Favourites() {

    const [favourites, setFavourites] = useState<Object[]>([])
        // const [total, setTotals] = useState<any>()
        const [stores] = useState<Object[]>([])
    
    
        async function fetchitems(){ 
           const  res = await fetch("http://localhost:8000/products/favourits/", {
            method:"Get",
            credentials: "include"
            // body: JSON.stringify({"token":token})
        })
           const data = await res.json()
            setFavourites(data.data);
            // setTotals(data.basketTotal)
            // setStoreTotals(data.storeTotals)
            
            console.log(data)
    
        }
    
          useEffect(()=>{
            fetchitems()
        },[])
  return (
    <>
    <TopSection isList={false} clickMenu={()=>{}} click={() => { } } isMenu={false} setValue={()=>{}} clickList={()=>{}} EmptyState={"favourites"} stores={stores} page={"basket"} ></TopSection>

        {favourites.length !==0? <div id="product-container" style={{display:'grid', gridTemplateColumns: "repeat(2, 160px)", gap: '20px', width:'100%',justifyContent: "center"}}>
          {favourites.map((item:any)=>{
              const products = item.products
              const productid = item.product_id
              const productName = products.Product_name
              const img = products.Img_processed 
              const store = products.store_name
              const price = products.Price
              
              return <ProductAddCard isInBasket={true} productName={productName} productImage={img} productPrice={price} store={store} page={"favourites"} productid={productid}></ProductAddCard>
            })}
        </div>
        :<EmptyState type="favorites" setFile={()=>{}}></EmptyState>}
        {/* <BasketTotal total={total}></BasketTotal> */}

        <div style={{height:"200px"}}></div>
    </>
  )
}

export default Favourites
