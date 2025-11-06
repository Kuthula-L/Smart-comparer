import { useEffect} from "react"
import ProductCompare from "./ProductCompare"
import ProductAddCard from "./ProductCard"


interface probs {
    heading:string
    data:any[]
    clickCompare: (i:number) => void
    type:string
}

function Carousel({heading, data, clickCompare, type}:probs) {

    
    // const comparedData :any= useRef({})
    // const [Data, setData] :any= useState()
  

    
    
    useEffect(()=>{
        console.log(data)
    }, [])

    // function clickCompare(i:number){
    //     comparedData.current = data[i]
    //    setIsClicked(true)
    // }


        
      

  return (
    <div style={{display:"flex", flexDirection:"column", gap:10}}>
      <div style={{marginLeft:10}}>{heading}</div>
      
      <div style={{display:"flex",overflowY:"hidden", overflowX:"scroll", width:"auto", height:"auto", padding:10, gap:20}}>
        {data.map((item, i)=>{
          
          if (type === "compare"){
            
            const Product = item.product_name
            const Price = item.base_price
            const Img = item.base_image
              return <div><ProductCompare key={item} img={Img} product={Product} price={Price} click={()=> clickCompare(data[i])}></ProductCompare></div>
            } else{

               const productName = item.Product_name
                const price = item.Price
                const img = item.Img_processed
                // const store = item.store_name

              return <div><ProductAddCard productid={item.uuid} productName={productName} productImage={img} productPrice={price} store={type}></ProductAddCard></div>
            }


        })}

      </div> 
      
    </div>
  )
}

export default Carousel


//  {isclicked? Object.keys(comparedData.current.compared_stores).map((store:any)=>{
//             const Product = comparedData.current.product_name
//             const Img = comparedData.current.base_image


            
//             // console.log('seem to work just fine')
//             if (store.store === "PicknPay" && !checked.pnp ) {
//                 checked["pnp"] = true
//                 return <ProductAddCard productName={Product} productImage={Img} productPrice={store.price} store="Pick N Pay"></ProductAddCard>    
//             }
//             if (store.store === "WoolWorths" && !checked.wool ) {
//                 checked["wool"] = true
//                 return <ProductAddCard productName={Product} productImage={Img} productPrice={store.price} store="Woolworths"></ProductAddCard>
                
//             }
//             if (store.store === "Shoprite" && !checked.shoprite ) {
//                 checked["shoprite"] = true
//                 return <ProductAddCard productName={Product} productImage={Img} productPrice={store.price} store="Shoprite"></ProductAddCard>
            
//             }
            
//         }) :