
export default function BasketPerStore() {
  return (
 
    <>
  
      {/* /* basic page layout */ }

   <h2>Basket totals per store</h2>
 
      <div className="box" style="width: 100px; height: 100px"></div>
  
    {/* <!-- shoprite component --> */}
    <div id="Checkers" className="store-baket" role="group">
      {/* <!-- store logo --> */}
      <button className="storeButton">
        <div className="store-logo" aria-hidden="true">C</div>
        <div className="store-meta">
          <div className="store-amount">R1000</div>
        </div>
      </button>
    </div>
    <script type="module" src="bucketPerStore.js"></script>
 

</>

  )
}
