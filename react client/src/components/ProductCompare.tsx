import "./styling/ProductCompare.css"

export default function ProductCompare() {




  return (
    <div>
      <div style={{zIndex: 2}} className="product-card">
        <div className="image-container">
          <img src="/download.png" alt="product not found" />
          <div className="favourites" id="heart">
            <img src="/whiteHeart.svg" alt="Favourites" />
          </div>
        </div>

        <div className="product-info">
          <div className="title">Product-</div>
          <div className="avgprice">AVG. Price</div>
          <div className="price">R00.00</div>
        </div>

        {/* <!-- Absolute compare button --> */}
        <div className="compare-container">
            <a href="#"> 
            <button className="CompareButton">Compare</button>
          </a> 
        </div>

        <div className="box"></div>
      </div>
  
    </div>
  )
}
