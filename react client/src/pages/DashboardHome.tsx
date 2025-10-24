// import NavBar from "../components/NavBar"
import { useEffect, useState, type JSX } from "react"
import SearchBar from "../components/SearchBar"
import ProductCompare from "../components/ProductCompare"
import HeaderComponent from "../components/HeaderComponent"
import Filter from "../components/Filter"
import ProductAddCard from "../components/ProductCard"



type DataType = {
    compared_data: any[], 
    uncomparable_data: {
        Checkers: any[], 
        Shoprite: any[], 
        WoolWorths: any[], 
        PicknPay: any[]
    }
}

function DashboardHome() {


    const [Data, setData] = useState<any>()
    const [mixData, setmix] = useState<JSX.Element[]>([])
   
    function setValue(data:any){
        setData(data)
        const woolworthsData = data?.uncomparable_data.WoolWorths
        const ShoprightData = data.uncomparable_data.Shoprite
        const pnpData = data.uncomparable_data.PicknPay
        const checkersData = data.uncomparable_data.Checkers
        const comparedData = data.compared_data

    


        if (comparedData)
        for (let i = 0; i < comparedData.length; i++) {

                const Product = comparedData[i].product_name
                const Price = comparedData[i].base_price
                const Img = comparedData[i].base_image
                // const productName = woolworthsData[i][0]

                // mixData?.push(<ProductCompare productName={Name} productImage={Img} productPrice={price} store="woolworths"></ProductAddCard>)
                mixData?.push(<ProductCompare img={Img} product={Product} price={Price}></ProductCompare>)
                // setmix([...mixData, <ProductCompare img={Img} product={Product} price={Price}></ProductCompare>])

            if(i<woolworthsData?.length){

                const productName = woolworthsData[0].Product_name
                const price = woolworthsData[0].Price
                const img = woolworthsData[0].Img_processed

                console.log(productName, price, img)
                
                 mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store='Woolworths'></ProductAddCard>)

            }
            if(i<ShoprightData?.length){

                const productName = ShoprightData[i].Product_name
                const price = ShoprightData[i].Price
                const img = ShoprightData[i].Imag_processed
                // const productName = woolworthsData[i][0]

                mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store="Shoprite"></ProductAddCard>)
                // setmix([...mixData, <ProductAddCard productName={productName} productImage={img} productPrice={price} store='Shoprite'></ProductAddCard>])
            }
            if(i<checkersData?.length){

                const productName = checkersData[i].Product_name
                const price = checkersData[i].Price
                const img = checkersData[i].Imag_processed
                // const productName = woolworthsData[i][0]

                mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store='Checkers'></ProductAddCard>)
            }
            if(i<pnpData?.length){

                const productName = pnpData[i].Product_name
                const price = pnpData[i].Price
                const img = pnpData[i].Img_processed
                // const productName = woolworthsData[i][0]

                mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store="Pick N Pay"></ProductAddCard>)
                // setmix([...mixData, <ProductAddCard productName={productName} productImage={img} productPrice={price} store='Shoprite'></ProductAddCard>])
            }
            
        }

        console.log(data)
      
    }


    function clickCompare(e:React.TouchEvent){
        // e.
    }

  return (
    <>
        <div style={{alignItems:"center", display:"flex", flexDirection:"column"}}>
        <HeaderComponent></HeaderComponent>
        <SearchBar GetHomeData={setValue}></SearchBar>
        <div style={{height:'auto', width:"auto", marginTop:30, display:"flex", gap:5}}>
            <Filter></Filter>
            <Filter></Filter>
           
            <div style={{background:"", color: "white", width:210, height:45, borderRadius:"70px", placeContent:'center', border:"1px solid black", display:"flex"}}><button style={{width:200, height:35, backgroundColor: "white", borderRadius:70, color:"black", placeSelf:"center", border:"1px solid black"}}>Grocary List</button></div>
            <div style={{display:"none"}} className="pop-up"></div>
            {/* <Sort></Sort> */}
        </div>
        </div>

        {/* <ProductCompare img={"/vite.svg"} product={"bread"} price={"20"}></ProductCompare> */}

        
        
        {/* <ProductAddCard productName="" productImage="" productPrice="" store=""></ProductAddCard> */}

        <div id="product-container" style={{display:'grid', gridTemplateColumns: "repeat(2, 160px)", gap: '20px', width:'100%',justifyContent: "center", zIndex:0, marginTop:30}}>
        
                {mixData}
        
        </div>
       
        {/* <NavBar></NavBar> */}
    </>
  )
}

export default DashboardHome
