import './styling/ProductCard.css'
import { useState } from 'react';

// Define color schemes for each store
const storeColors = {
    'Woolworths': {
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
    'Pick N Pay': {
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
  onAddToBasket = () => {}, // Callback for adding to basket
  onRemoveFromBasket = () => {}, // Callback for removing from basket
}) {

  // State to track if product is in basket 
  const[inBasket,setInBasket] = useState(isInBasket);
  // Get colors for the current store, fallback to default if store not specified
  
  const storeData = store && storeColors[store as keyof typeof storeColors] 
  ? storeColors[store as keyof typeof storeColors] 
  : storeColors.default;
  const logoToUse = storeLogo || storeData.logoPath;

  const handleButtonClick = () =>{

      if(inBasket){
        // Remove from basket
        setInBasket(false);
        onRemoveFromBasket();
      }
      else{
       // Add to basket
       setInBasket(true);
       onAddToBasket();
      }

  }

  return (
    <div>
      <div className="product-card-container">
        <div 
          className="product-card-box"
          style={{ borderColor: storeData.border }}
        >
          <div 
            className="product-image-box"
            style={{ backgroundColor: storeData.imageBox }}
          >
            <img src={productImage} alt="product not found" />
            <div className="favourites" id="heart">
              <img src="/whiteHeart.svg" alt="Favourites" />
            </div>
          </div>
          <div 
            className="add-button-background-box"
            style={{ borderLeftColor: storeData.buttonBorder , borderTopColor: storeData.buttonBorder }}
          >
            <div 
              className="add-button-inner-background-box"
              style={{ backgroundColor: storeData.innerButton}}
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
        <div className="product-info">
          <div className="Product-Name">{productName}</div>
          <div className="Product-Price">Price</div>
          <div className="Product-Price">R{productPrice}</div>
        </div>
      </div>
    </div>
  )
}