// interface probs{
//     Data
// }

import { useEffect, useState, type JSX } from "react";
import EmptyState from "./EmptyState"
import Carousel from "./Carousel";
import ProductAddCard from "./ProductCard";

// interface probs {
//     clickCompare : (i:number)=>void
// }


function Addlist() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const [fileContent, setFileContent] = useState<string[]>([]);
    const [fileContent, setFileContent] = useState<string>();
    const [Data, setData] = useState<[]>([])
    const [toCompare, setToCompare]= useState<JSX.Element[]|null>()
    const [tocompareHeading, setHeading] = useState("")
    const [isclicked, setIsClicked] = useState(false)
    

    // const [carousels, setCarousels] = useState<JSX.Element[]>([]);

    function getFile(file:any){
        setSelectedFile(file)

        readFile(file)
        // console.log(fileContent)
    }


useEffect( ()=>{

    
   const list = fileContent?.split(/\r?\n/);
    
    // console.log(list)

    async function fetchitems(){

       const res = await fetch("http://127.0.0.1:8000/products/groceryList/", {method:"POST", 
            body:JSON.stringify({"items":list})
        })

        const data = await res.json()
        console.log(data)
        setData(data)

        // Object.keys(data).map((item)=>{
        //     console.log(item," and the Item "+ data[item])
        // //    Data.current.push(<Carousel heading={item} data={data[item]}></Carousel>)
        //     setCarousels([...carousels, <Carousel key={item} heading={item} data={data[item]} />]);

        // })
    } 

    fetchitems()

    // console.log(carousels)

},[fileContent])
const readFile = async (file: File) => {
    try {
        const text = await file.text(); // Modern way (simpler!)
        setFileContent(text);
        // list.current = text
        // console.log("File content:", text);
    } catch (error) {
        console.error("Error reading file:", error);
    }
};


     function clickCompare(data:any){
        //    const i =  e.currentTarget.key
        //    console.log(Data[i])
    
            // if (!Data) {
            //     console.log("Data is undefined/null");
            //     return;
            // }
    
            // setpop(true)
            
           const comparedData = data
            // console.log(comparedData)
            const tempdata = []
    
            const Product = comparedData.product_name
            const Price = comparedData.base_price
            const Img = comparedData.base_image
            const comparedStores = comparedData.compared_stores

            setHeading(Product)
    
            tempdata?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={Price} store="Checkers"></ProductAddCard>)
    
            const checked = {
                pnp : false, 
                checkers: false,
                wool: false,
                shoprite: false,
            }
    
    
            for (let i = 0; i < comparedStores.length; i++) {
                
                if (comparedStores[i].store === "PicknPay" && !checked.pnp ) {
                    tempdata?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={comparedStores[i].price} store="Pick N Pay"></ProductAddCard>)
                    checked["pnp"] = true
                    
                }
                if (comparedStores[i].store === "WoolWorths" && !checked.wool ) {
                    tempdata?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={comparedStores[i].price} store="Woolworths"></ProductAddCard>)
                    checked["wool"] = true
                }
                if (comparedStores[i].store === "Shoprite" && !checked.shoprite ) {
                    tempdata?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={comparedStores[i].price} store="Shoprite"></ProductAddCard>)
                    checked["shoprite"] = true
                }
                // if (comparedStores[i] === "PicknPay" && !checked.pnp ) {
                //     comparedData?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={compared_stores[]} store="Shoprite"></ProductAddCard>)
                    
                // }
                
            }
            console.log(Data)
            setToCompare(tempdata)
            setIsClicked(true)
        //    comparedData?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={Price} store="Shoprite"></ProductAddCard>)
        //    comparedData?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={Price} store="Shoprite"></ProductAddCard>)
        }


        function closePopup(){
            setIsClicked(false)
        }
  return (
    <div style={{marginTop:0}}>
      {selectedFile === null?<EmptyState type="list" setFile={getFile}></EmptyState>: <div>{}</div>}
      
      <div style={{display:"flex", flexDirection:"column", gap:30}}>
            {isclicked?
            <>
            <div style={{ marginTop:0, display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                <div>{tocompareHeading}</div>
                <img onClick={closePopup} style={{width:30}} src="close.svg"/>
            </div>
            <div style={{display:'grid', gridTemplateColumns: "repeat(2, 160px)", gap: '20px', width:'100%',justifyContent: "center", marginTop:0}}>
                {toCompare}
            </div>
            
            </>
            :Object.keys(Data).map((item:any) => {
                if (!Array.isArray(Data[item])) {
                    return null;  // Skip this item
                }
                console.log(Data)
                return <Carousel clickCompare={clickCompare} key={item} heading={item} data={Data[item]} type="compare"/>;  // ✅ Add return
            })}
            <div style={{height:80}}></div>
        </div>
    </div>
  )
}

export default Addlist
