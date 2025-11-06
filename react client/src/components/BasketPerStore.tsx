import { useEffect, useState } from "react";
// import "./styling/BasketPerStore.css";
// import StoreBadge from "./storeBadge"
/**
 * - storeName: display name 
 * - color: background color for the badge
 * - logoText: short text shown in the circular logo area
 * Main container that renders multiple store badges.
 * Add or remove <StoreBadge /> entries as needed.
 */
interface BasketPerStoreProps {
  storeName: string;
  TotalAmount: number;
}

function BasketPerStore({storeName, TotalAmount,}: BasketPerStoreProps) {
  
  const [color, setColor] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [storeColor, setStoreColor] = useState<string>("");
  useEffect (() => {
    switch (storeName) {
      case "Checkers":
        setColor("#B0FFEC");
        setImage("/checkers.svg")
        setStoreColor("#38A8AE")
        break;
  
      case "PicknPay":
        setColor("#FFB9D5")
        setImage("/pnp.svg")
        setStoreColor("black")
        break; 
        
      case "Shoprite":
        setColor("#FFCFD1")
        setImage("/shoprite.svg")
        setStoreColor("#FFCFD1")
        break;  
  
      case "Woolworths":
        setColor("#A9A7A7")
        setImage("/woolworths.svg")
        break;
    
      default:
        setColor("");
        setImage("");
        break;
    }
  },[])

  return (
    <>
    <div style={{width: 90, height: 32, backgroundColor: color, display: "flex", borderRadius: "20px", padding:"5px", gap: "7px", color: "white", zIndex: 1, alignItems: "center"}}>
      <div style= {{width: 35, height: 35,position: "static",display: "grid", marginLeft: "0px", marginTop:"0px", borderRadius: "50%", backgroundColor: storeColor, zIndex:2, alignItems: 'center', justifyItems:"center"}}>
        <img src={image} style={{width: 25, height: 25, borderRadius: "50%", zIndex: 3}} alt="" />
      </div>
      <div style={{display: "flex", marginTop: "0px",marginLeft: "0px", fontSize: "16px", font: "inter"}}> R{TotalAmount}</div>
    </div>
    </>
  );
};

export default BasketPerStore;
