// import { AnimatePresence } from 'motion/react';
import { AnimatePresence, motion } from "motion/react"
import './styling/ProductCard.css'
import { useEffect, useState } from 'react';

// Define color schemes for each store
const storeColors = {
    'WoolWorths': {
    border: '#000000',
    imageBox: '#808080',
    buttonBorder: '#000000', 
    innerButton: '#000000',
    buttonTextColor: '#000000',
    logoBackground: '#000000',
    logoPath: '/woolworths.svg'
  },
    'Checkers': {
    border: '#AFEEEE',
    imageBox: '#AFEEEE',
    buttonBorder: '#AFEEEE',
    innerButton: '#AFEEEE',
    buttonTextColor: '#AFEEEE',
    logoBackground: '#48D1CC',
    logoPath: '/checkers.svg'
  },
    'PicknPay': {
    border: '#84234B',
    imageBox: '#84234B',
    buttonBorder: '#84234B',
    innerButton: '#84234B',
    buttonTextColor: '#84234B',
    logoBackground: '#611770ff',
    logoPath: '/pnp.svg'
  },
    'Shoprite': {
    border: '#FFC0CB',
    imageBox: '#FFC0CB',
    buttonBorder: '#FFC0CB',
    innerButton: '#FFC0CB',
    buttonTextColor: '#FFC0CB',
    logoBackground: '#FF0000',
    logoPath: '/shoprite.svg'
  },
    default: {
    border: '#f2ec9b',
    imageBox: '#f6f3ce',
    buttonBorder: '#f2ec9b',
    innerButton: '#f2ec9b',
    buttonTextColor: '#FFFFFF',
    logoBackground: '#f2ec9b',
    logoPath: '/logos/default-logo.png'
  }
};

export default function ProductAddCard({ 
  productName = "Product", 
  productPrice = "",
  productImage = "/download.png",
  storeLogo = "",
  store = "",// Empty by default to use default colors
  isInBasket = false, //track if product is in basket
  // isInFavourites = false, //track if product is in basket
  onAddToBasket = () => {}, // Callback for adding to basket
  onRemoveFromBasket = () => {},
  productid = "",
  page=""
   // Callback for removing from basket
}) {

  // State to track if product is in basket 
  const[inBasket,setInBasket] = useState(isInBasket);
  const[isClicked,setClicked] = useState(false);
  const[show,setShow] = useState(true);
  // Get colors for the current store, fallback to default if store not specified
  
  const storeData = store && storeColors[store as keyof typeof storeColors] 
  ? storeColors[store as keyof typeof storeColors] 
  : storeColors.default;
  const logoToUse = storeLogo || storeData.logoPath;

  const handleButtonClick = () =>{

    async function BasketItems(){ 
          // const  res = 
          await fetch("http://localhost:8000/products/addToBasket/", {
            method:"POST",
            credentials: "include",
            body:JSON.stringify({
              "product_uuid":productid,
              // "user_uuid": "0c05fb3d-6b91-4120-b61a-26f671f8ff1f",

            })
          })
          // const data = await res.json()
            
            
            // console.log(data.data)

    }
    async function RemoveBasketItems(){ 
          // const  res = 
          await fetch("http://localhost:8000/products/removeFromBasket/", {
            method:"POST",
            credentials: "include",
            body:JSON.stringify({
              "product_uuid":productid,
              // "user_uuid": "0c05fb3d-6b91-4120-b61a-26f671f8ff1f",

            })
          })
          // const data = await res.json()
            
            
            // console.log(data.data)

    }

      if(inBasket){
        // Remove from basket
        RemoveBasketItems()
        setInBasket(false);
        onRemoveFromBasket();
        setShow(false)
          
      }
      else{
       // Add to basket
       BasketItems()
       setInBasket(true);
       onAddToBasket();


      }

  }

  function clickHeart(){
    async function addFavourites(){ 
          // const  res = 
          await fetch("http://localhost:8000/products/addToFavourites/", {
            method:"POST",
            credentials: "include",
            headers: {
                  "Content-Type": "application/json",  // Add this!
                },
            body:JSON.stringify({
              "product_uuid":productid,
              // "user_uuid": "0c05fb3d-6b91-4120-b61a-26f671f8ff1f",

            })
          })
          // const data = await res.json()
          
    }
    async function RemoveFromFavourites(){ 
          // const  res = 
          await fetch("http://localhost:8000/products/removeFromFavourites/", {
            method:"POST",
            credentials: "include",
            headers: {
                  "Content-Type": "application/json",  // Add this!
                },
            body:JSON.stringify({
              "product_uuid":productid,
              // "user_uuid": "0c05fb3d-6b91-4120-b61a-26f671f8ff1f",

            })
          })
          // const data = await res.json()
          
    }

    if(!isClicked){
      addFavourites()
    }else{
      RemoveFromFavourites()
    }

    setClicked(true)
  }


  useEffect(()=>{
    if (page !== "" ){
      setClicked(true)
    }
  },[])


  return (
    <div>
      
        {show ? <AnimatePresence initial={false}>

      <motion.div key="box" exit={{ opacity: 0 }}  style={{ borderColor: storeData.border }} className="product-card-container product-card-box">
        <div 
          // className="product-card-box"
          // style={{ borderColor: storeData.border }}
        >
          <div 
            className="product-image-box"
            style={{ backgroundColor: storeData.imageBox }}
          >
            <img src={productImage} alt="product not found" />
            <div className="favourites" id="heart">
              <img onClick={clickHeart}  src={isClicked?"/heart-filled.svg":(page===""?"/whiteHeart.svg":"/heart-filled.svg")} alt="Favourites" />
            </div>
          </div>
          <div 
            className={page===""?"add-button-background-box":""}
            style={{ borderLeftColor: storeData.buttonBorder , borderTopColor: storeData.buttonBorder }}
          >
            <div 
              className={"add-button-inner-background-box"}
              style={{ backgroundColor: storeData.innerButton, display:page===""?"block":"none"}}
            >
             <button className="AddButton" style={{ color:'buttonTextColor', backgroundColor: 'transparent' }} onClick={handleButtonClick}>
              {inBasket ? '-':'+'}
              </button>
            </div>
          </div>
        </div>
        <div className="background-box-white"></div>
        <div 
          className="store-logo-background"
          style={{ backgroundColor: storeData.logoBackground }}
        >
          <img src={logoToUse} alt={`${store} logo`}/>
        </div>
        <div  style={{display: "flex", flexDirection: "column", width: "100%", height:"auto", justifyItems:"start", marginTop:-10}} className="product-inf">
          <div className="Product-Name">{productName}</div>
          <div className="Product-Price-label">Price</div>
          <div className="Product-Price">R{productPrice}</div>
      </div>
        </motion.div>
        </AnimatePresence> : null}
  </div>
  )
}