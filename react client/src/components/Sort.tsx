import { useState } from "react";
import "./styling/Sort.css";

function Sort() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const sortOptions = [
    { value: "best-match", label: "Best Match" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" }
  ];

  const handleOptionSelect = (value: string, label: string): void => {
    setSelectedOption(value);
    setIsOpen(false);
    // Add your sort logic here
    console.log("Sorting by:", value);
  };

  return (
    <>
      <div className="sort-container">
        <button 
          className="sort-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sort-icon">↕️</span>
          Sort {selectedOption && `: ${sortOptions.find(opt => opt.value === selectedOption)?.label}`}
        </button>

        {isOpen && (
          <div className="sort-popup">
            <div className="sort-options-grid">
              {/* First row - 2 options */}
              <div className="sort-option-row">
                {sortOptions.slice(0, 2).map((option) => (
                  <div
                    key={option.value}
                    className={`sort-option ${selectedOption === option.value ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option.value, option.label)}
                  >
                    <div className="checkbox-container">
                      <div className={`custom-checkbox ${selectedOption === option.value ? 'checked' : ''}`}>
                        {selectedOption === option.value && (
                          <div className="checkmark">✓</div>
                        )}
                      </div>
                    </div>
                    <span className="option-label">{option.label}</span>
                  </div>
                ))}
              </div>
              
              {/* Second row - 1 option (centered) */}
              <div className="sort-option-row single-option">
                {sortOptions.slice(2, 3).map((option) => (
                  <div
                    key={option.value}
                    className={`sort-option ${selectedOption === option.value ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option.value, option.label)}
                  >
                    <div className="checkbox-container">
                      <div className={`custom-checkbox ${selectedOption === option.value ? 'checked' : ''}`}>
                        {selectedOption === option.value && (
                          <div className="checkmark">✓</div>
                        )}
                      </div>
                    </div>
                    <span className="option-label">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sort;