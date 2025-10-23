import "./styling/ProductCompare.css";

interface probs {
  img: string;
  product: string;
  price: string;
}
export default function ProductCompare({ img, product, price }: probs) {
  return (
    <>
      <div style={{ zIndex: 2}} className="product-card">
        <div className="image-container">
          <img src={img} alt="product not found" />
          <div className="favourites" id="heart">
            <img src="/whiteHeart.svg" alt="Favourites" />
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", width: "100%", height:"auto"}}
          className=""
        >
          <div className="title">{product}</div>
          <div className="avgprice">AVG. Price</div>
          <div className="price">{"R" + price}</div>
        </div>

        {/* <!-- Absolute compare button --> */}
        <div className="compare-container">
          <a href="#">
            <button className="CompareButton">Compare</button>
          </a>
        </div>

        <div className="box"></div>
      </div>
    </>
  );
}
