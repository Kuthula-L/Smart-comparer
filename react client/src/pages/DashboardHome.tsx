// import NavBar from "../components/NavBar"
import { useEffect, useState, type JSX } from "react"
import SearchBar from "../components/SearchBar"
import ProductCompare from "../components/ProductCompare"
import HeaderComponent from "../components/HeaderComponent"
import Filter from "../components/Filter"
import ProductAddCard from "../components/ProductAddCard"



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


    const [Data, setData] = useState<DataType>()
    const [mixData, setmix] = useState<JSX.Element[]>([])
    // const [comparedData, setComparedData] = useState<any>([])
    // const [woolworthsData, setWoolworthsData] = useState<any>([]),
    // // let woolworthsData:any = []
    // const [ShoprightData, setShoprightData] = useState<Object[]|any>(),
    // const [checkersData, setcheckersData] = useState<Object[]|any>(),
    // const [pnpData, setPnpData] = useState<Object[]|any>(),
    
    // data = {"compared_data": comparedData, 
    //         "uncomparable_data": {"Checkers": checkers, "Shoprite":  Shoprite, "WoolWorths": WoolWorths, "PicknPay":PicknPay}
    //         }
    function setValue(data:any){
        setData(data)



        const woolworthsData = data?.uncomparable_data.WoolWorths
        const ShoprightData = data.uncomparable_data.Shoprite
        const pnpData = data.uncomparable_data.PicknPay
        const checkersData = data.uncomparable_data.Checkers
        const comparedData = data.compared_data


        // setComparedData(Data?.compared_data)
        // setWoolworthsData(Data?.uncomparable_data.WoolWorths)
        // // woolworthsData = Data?.uncomparable_data.WoolWorths
        // setShoprightData(Data?.uncomparable_data.Shoprite)
        // setPnpData(Data?.uncomparable_data.PicknPay)
        // setcheckersData(Data?.uncomparable_data.Checkers)

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

                const productName = woolworthsData[0].product_name
                const price = woolworthsData[0].Price
                const img = woolworthsData[0].Img_proccessed

                console.log(productName, price, img)
                // const productName = woolworthsData[i][0]
                
                // mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store="woolworths"></ProductAddCard>)
                // setmix([...mixData, <ProductAddCard productName={productName} productImage={img} productPrice={price} store="Woolworths"></ProductAddCard>])
                 mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store='Checkers'></ProductAddCard>)

            }
            if(i<ShoprightData?.length){

                const productName = ShoprightData[i].product_name
                const price = ShoprightData[i].Price
                const img = ShoprightData[i].Imag_proccessed
                // const productName = woolworthsData[i][0]

                mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store="shoprigt"></ProductAddCard>)
                // setmix([...mixData, <ProductAddCard productName={productName} productImage={img} productPrice={price} store='Shoprite'></ProductAddCard>])
            }
            if(i<checkersData?.length){

                const productName = checkersData[i].product_name
                const price = checkersData[i].Price
                const img = checkersData[i].Imag_proccessed
                // const productName = woolworthsData[i][0]

                mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store='Checkers'></ProductAddCard>)
            }
            if(i<pnpData?.length){

                const productName = pnpData[i].product_name
                const price = pnpData[i].Price
                const img = pnpData[i].Img_proccessed
                // const productName = woolworthsData[i][0]

                mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store="picknpay"></ProductAddCard>)
                // setmix([...mixData, <ProductAddCard productName={productName} productImage={img} productPrice={price} store='Shoprite'></ProductAddCard>])
            }
            
        }


        // console.log(mixData)
        // console.log("this is compared data\n", comparedData)
        // console.log("this is woolworths data\n", woolworthsData)

        // console.log(data)
    }


    useEffect(()=>{
        
    },[])

  return (
    <>
        <div style={{alignItems:"center", display:"flex", flexDirection:"column"}}>
        <HeaderComponent></HeaderComponent>
        <SearchBar GetHomeData={setValue}></SearchBar>
        <div style={{height:'auto', width:"auto", marginTop:30, display:"flex", gap:5}}>
            <Filter></Filter>
            <Filter></Filter>
           
            <div style={{background:"", color: "white", width:210, height:45, borderRadius:"70px", placeContent:'center', border:"1px solid black", display:"flex"}}><button style={{width:200, height:35, backgroundColor: "white", borderRadius:70, color:"black", placeSelf:"center", border:"1px solid black"}}>Grocary List</button></div>
            {/* <Sort></Sort> */}
        </div>
        </div>

        {/* <ProductCompare img={"/vite.svg"} product={"bread"} price={"20"}></ProductCompare> */}

        
        
        {/* <ProductAddCard productName="" productImage="" productPrice="" store=""></ProductAddCard> */}

        <div id="product-container" style={{display:'grid', gridTemplateColumns: "repeat(2, 160px)", gap: '20px', width:'100%',justifyContent: "center", zIndex:0}}>
        
                {mixData}
        
        </div>
       
        {/* <NavBar></NavBar> */}
    </>
  )
}

export default DashboardHome
