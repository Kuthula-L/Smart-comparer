import './styling/BasketTotal.css';


interface probs {
  total:number
}
function BasketTotal ({total}:probs){
  // Hardcoded value for display
  

  return (
    <div className="basket-total-container">
      <div className="basket-title">Basket Total</div>
      <div className="basket-pill">
        <div className="basket-inner-pill">
        <span className="basket-amount">R{total}</span>
        </div>
      </div>
    </div>
  );
};

export default BasketTotal;