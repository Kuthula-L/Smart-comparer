import './styling/BasketTotal.css';

const BasketTotal = ({totalPrice=0}) => {
  // Hardcoded value for display
  

  return (
    <div className="basket-total-container">
      <div className="basket-title">Basket Total</div>
      <div className="basket-pill">
        <div className="basket-inner-pill">
        <span className="basket-amount">R{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BasketTotal;