import './styling/BasketTotal.css';

const BasketTotal = () => {
  // Hardcoded value for display
  const totalPrice = 900.00;

  return (
    <div className="basket-total-container">
      <div className="basket-title">Basket Total</div>
      <div className="basket-pill">
        <span className="basket-amount">R{totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BasketTotal;