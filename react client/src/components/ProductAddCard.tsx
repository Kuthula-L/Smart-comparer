import './styling/ProductAdd.css';

// Define color schemes for each store
const storeColors = {
    Woolworths: {
    border: '#000000',
    imageBox: '#808080',
    buttonBorder: '#000000', 
    innerButton: '#000000',
    logoBackground: '#000000',
    logoPath: '/public/woolworths.svg'
  },
    Checkers: {
    border: '#AFEEEE',
    imageBox: '#AFEEEE',
    buttonBorder: '#AFEEEE',
    innerButton: '#AFEEEE',
    logoBackground: '#48D1CC',
    logoPath: '/public/checkers.svg'
  },
    'Pick N Pay': {
    border: '#E6E6FA',
    imageBox: '#E6E6FA',
    buttonBorder: '#E6E6FA',
    innerButton: '#E6E6FA',
    logoBackground: '#9370DB',
    logoPath: '/public/pnp.svg'
  },
    Shoprite: {
    border: '#FFC0CB',
    imageBox: '#FFC0CB',
    buttonBorder: '#FFC0CB',
    innerButton: '#FFC0CB',
    logoBackground: '#FF0000',
    logoPath: '/public/shoprite.svg'
  },
    default: {
    border: '#f2ec9b',
    imageBox: '#f6f3ce',
    buttonBorder: '#f2ec9b',
    innerButton: '#000000',
    logoBackground: '#000000',
    logoPath: '/logos/default-logo.png'
  }
};

export default function ProductAddCard({ 
  productName = "Product", 
  productPrice = "Price",
  productImage = "/download.png",
  storeLogo = "",
  store = "" // Empty by default to use default colors
}) {
  // Get colors for the current store, fallback to default if store not specified
  
  const storeData = store && storeColors[store as keyof typeof storeColors] 
  ? storeColors[store as keyof typeof storeColors] 
  : storeColors.default;
  const logoToUse = storeLogo || storeData.logoPath;
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
            style={{ borderColor: storeData.buttonBorder }}
          >
            <div 
              className="add-button-inner-background-box"
              style={{ backgroundColor: storeData.innerButton }}
            >
              +
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
          <div className="Product-Price">Price - R{productPrice}</div>
        </div>
      </div>
    </div>
  )
}