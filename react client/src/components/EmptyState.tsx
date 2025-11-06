import type { ChangeEvent } from "react";
import { useState } from "react";
import "./styling/EmptyState.css";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import React from "react";

interface EmptyStateProps {
  // type?: "list" | "basket" | "favorites";
  type:string;
  setFile: (file:any)=>void;
}

//  React.FC<EmptyStateProps> = 

  const EmptyState = React.memo ( ({ type , setFile}:EmptyStateProps)=>{
    
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  interface Config {
    img: string;
    title: string;
    message: string;
    buttonText: string;
    link?: string;
  }

  const configs: Record<NonNullable<EmptyStateProps["type"]>, Config> = {
    list: {
      img: "/list-empty.svg",
      title: "No lists yet... let's fix that!",
      message:
        "Nothing here but space. Add groceries one by one, or drop in your grocery list file.",
      buttonText: "Upload List",
    },
    basket: {
      img: "/basket-empty.svg",
      title: "Your basket is empty",
      message:
        "Once you add items they will appear here. Looking for ideas?",
      buttonText: "Start Comparing",
      link: "/src/pages/HomePage.html",
    },
    favorites: {
      img: "/favorites-empty.svg",
      title: "No favorites yet",
      message:
        "Find something you love, give it a heart, and watch this space fill up with your favorites.",
      buttonText: "Start adding your favs",
      link: "/src/pages/HomePage.html",
    },
  };

  const config = configs[type];

  const handleButtonClick = () => {
    if (type === "list") {
      setIsPopupOpen(true);
    } else if (config.link) {
      window.location.href = config.link;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
     setFile(e.target.files?.[0])
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`File selected: ${selectedFile.name}`);
      setIsPopupOpen(false);
      setSelectedFile(null);
    } else {
      alert("Please select a file first.");
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setSelectedFile(null);
  };

  return (

     <AnimatePresence mode="wait">
    
        
    <motion.div  
                            initial={{ y: 0, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          layoutId="underline" className="empty-state">
      <div style={{backgroundColor:type==="basket"?"rgba(242, 236, 155, 0.36)":"", borderRadius:"50%", width:"250px", height:"250px"}}>
        <img  src={config.img} alt="Empty illustration" className="illustration" />
        
      </div>
      <h2 style={{marginTop: type==="basket"?"20px":0}} className="title">{config.title}</h2>
      <p className="message">{config.message}</p>
      <button className="action-btn" onClick={handleButtonClick}>
        {config.buttonText}
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Upload your list</h3>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileChange}
            />
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    {/* </div> */}
    </motion.div>
        </AnimatePresence>
  );
})

export default EmptyState;
