import { useState } from "react";
import "./styling/Filter.css";

function Filter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedShops, setSelectedShops] = useState<string[]>([]);

  const shops = [
    "Woolworths",
    "Checkers",
    "Pick N Pay", 
    "Shoprite",
    "Spar",
    "Food Lovers"
  ];

  const handleShopToggle = (shop: string): void => {
    setSelectedShops(prev => 
      prev.includes(shop) 
        ? prev.filter(s => s !== shop)
        : [...prev, shop]
    );
  };

  const handleConfirm = (): void => {
    setIsOpen(false);
    console.log("Selected shops:", selectedShops);
    // Add your filter logic here
  };

  return (
    <>
      <div className="filter-container">
        <button 
          className="filter-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="filter-icon">🔍</span>
          Filter {selectedShops.length > 0 && `(${selectedShops.length})`}
        </button>

        {isOpen && (
          <div className="filter-popup">
            <h3 className="filter-title">Filter by Store</h3>
            
            <div className="shops-grid">
              {shops.map((shop) => (
                <div
                  key={shop}
                  className={`shop-option ${selectedShops.includes(shop) ? 'selected' : ''}`}
                  onClick={() => handleShopToggle(shop)}
                >
                  <div className="checkbox-container">
                    <div className={`custom-checkbox ${selectedShops.includes(shop) ? 'checked' : ''}`}>
                      {selectedShops.includes(shop) && (
                        <div className="checkmark">✓</div>
                      )}
                    </div>
                  </div>
                  <span className="shop-label">{shop}</span>
                </div>
              ))}
            </div>

            <div className="filter-actions">
              <button className="confirm-button" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Filter;