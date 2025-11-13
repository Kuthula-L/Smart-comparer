// import NavBar from "../components/NavBar"
import { useEffect, useRef, useState, type JSX } from "react"
import ProductAddCard from "../components/ProductCard"
import Addlist from "../components/Addlist"
import DrawerMenu from "../components/DrawerMenu"
import TopSection from "./TopSection"

import HomeEmptyState from "../components/HomeEmptyState"
import Carousel from "../components/Carousel"




// type DataType = {
//     compared_data: any[], 
//     uncomparable_data: {
//         Checkers: any[], 
//         Shoprite: any[], 
//         WoolWorths: any[], 
//         PicknPay: any[]
//     }
// }




function DashboardHome() {
    
    
    
    const dataRef = useRef<any>(null);
    const [Data, setData] = useState<any>([])
    const [clickedData] = useState<JSX.Element[]>([])
    const [pop, setpop] = useState(false)
    const [isList, setIsList] = useState(false)
    const [ComparedData, setmix] = useState<JSX.Element|null>()
    const [check, setcheck] = useState<JSX.Element|null>()
    const [wool, setwool] = useState<JSX.Element|null>()
    const [shop, setshop] = useState<JSX.Element|null>()
    const [pnp, setpnp] = useState<JSX.Element|null>()
    const [test] = useState<JSX.Element|null>()
    const [isMenu, setIsMenu] = useState(false)
    // const [compared_data, setCompare_data] = useState()
    // const [uncompared_data, setUnCompare_data] = useState()
    // const uncomparable_data = useRef({});
    // const Data = useRef<any>({});
    
    

    function setValue(data:any){
        const woolworthsData = data?.uncomparable_data.WoolWorths
        const ShoprightData = data.uncomparable_data.Shoprite
        const pnpData = data.uncomparable_data.PicknPay
        const checkersData : []= data.uncomparable_data.Checkers
        const com_Data: [] = data.compared_data
        
        setData(com_Data)

        setmix(<Carousel heading={"Common in all stores"} data={data.compared_data} clickCompare={clickCompare} type={"compare"}></Carousel>)
        setshop(<Carousel heading={"Shopright"} data={ShoprightData} clickCompare={clickCompare} type={"Shoprite"}></Carousel>)
        // setwool(<Carousel heading={"woolworths"} data={woolworthsData} clickCompare={clickCompare} type={"WoolWorths"}></Carousel>)
        setcheck(<Carousel heading={"Checkers"} data={checkersData} clickCompare={clickCompare} type={"Checkers"}></Carousel>)
        setpnp(<Carousel heading={"Pick n Pay"} data={pnpData} clickCompare={clickCompare} type={"PicknPay"}></Carousel>)
        // setTest(<Carousel heading={"all data"} data={data.test} clickCompare={clickCompare} type={"test"}></Carousel>)
        



        // com_Data.map((item)=>{
        // })
        // Data.current = data
        // console.log(data)

        // uncomparable_data.current = data.uncomparable_data
        // comparable_data.current = data.compared_data

        // console.log(data)

        // console.log(uncomparable_data.current)
        // console.log(comparable_data.current)
        
        
        
        // if (comparedData)
        //     dataRef.current = comparedData
        // for (let i = 0; i < comparedData.length; i++) {

        //         const Product = comparedData[i].product_name
        //         const Price = comparedData[i].base_price
        //         const Img = comparedData[i].base_image
        //         // const productName = woolworthsData[i][0]

        //         // mixData?.push(<ProductCompare productName={Name} productImage={Img} productPrice={price} store="woolworths"></ProductAddCard>)
        //         mixData?.push(<ProductCompare key={`compared-${i}`} img={Img} product={Product} price={Price} click={()=> clickCompare(i)}></ProductCompare>)
        //         // setmix([...mixData, <ProductCompare img={Img} product={Product} price={Price}></ProductCompare>])

        //     if(i<woolworthsData?.length){

        //         const productName = woolworthsData[0].Product_name
        //         const price = woolworthsData[0].Price
        //         const img = woolworthsData[0].Img_processed
        //          mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store='Woolworths'></ProductAddCard>)

        //     }
        //     if(i<ShoprightData?.length){

        //         const productName = ShoprightData[i].Product_name
        //         const price = ShoprightData[i].Price
        //         const img = ShoprightData[i].Img_processed
                
        //         // const productName = woolworthsData[i][0]

        //         mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store="Shoprite"></ProductAddCard>)
        //         // setmix([...mixData, <ProductAddCard productName={productName} productImage={img} productPrice={price} store='Shoprite'></ProductAddCard>])
        //     }
        //     if(i<checkersData?.length){

        //         const productName = checkersData[i].Product_name
        //         const price = checkersData[i].Price
        //         const img = checkersData[i].Img_processed
        //         // const productName = woolworthsData[i][0]

        //         mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store='Checkers'></ProductAddCard>)
        //     }
        //     if(i<pnpData?.length){

        //         const productName = pnpData[i].Product_name
        //         const price = pnpData[i].Price
        //         const img = pnpData[i].Img_processed
        //         // const productName = woolworthsData[i][0]

        //         mixData?.push(<ProductAddCard productName={productName} productImage={img} productPrice={price} store="Pick N Pay"></ProductAddCard>)
        //         // setmix([...mixData, <ProductAddCard productName={productName} productImage={img} productPrice={price} store='Shoprite'></ProductAddCard>])
        //     }
            
        // }

        
    }

    useEffect(()=>{
        console.log(Data)
    },[Data])
    

    function clickCompare(i:number){
    //    const i =  e.currentTarget.key
    //    console.log(Data[i])

        // if (!Data) {
        //     console.log("Data is undefined/null");
        //     return;
        // }

        setpop(true)
        
        const comparedData = dataRef.current[i]
        console.log(comparedData)
        const data = []

        const Product = comparedData.product_name
        const Price = comparedData.base_price
        const Img = comparedData.base_image

        const comparedStores = comparedData.compared_stores

        data?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={Price} store="Checkers"></ProductAddCard>)

        const checked = {
            pnp : false, 
            checkers: false,
            wool: false,
            shoprite: false,
        }


        for (let i = 0; i < comparedStores.length; i++) {
            
            if (comparedStores[i].store === "PicknPay" && !checked.pnp ) {
                data?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={comparedStores[i].price} store="Pick N Pay"></ProductAddCard>)
                checked["pnp"] = true
                
            }
            if (comparedStores[i].store === "WoolWorths" && !checked.wool ) {
                data?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={comparedStores[i].price} store="Woolworths"></ProductAddCard>)
                checked["wool"] = true
            }
            if (comparedStores[i].store === "Shoprite" && !checked.shoprite ) {
                data?.push(<ProductAddCard productid="" productName={Product} productImage={Img} productPrice={comparedStores[i].price} store="Shoprite"></ProductAddCard>)
                checked["shoprite"] = true
            }
            // if (comparedStores[i] === "PicknPay" && !checked.pnp ) {
            //     clickedData?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={compared_stores[]} store="Shoprite"></ProductAddCard>)
                
            // }
            
        }
        console.log(Data)
        // setCompare(data)

       clickedData?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={Price} store="Shoprite"></ProductAddCard>)
       clickedData?.push(<ProductAddCard productName={Product} productImage={Img} productPrice={Price} store="Shoprite"></ProductAddCard>)
    }
    

    function clickList() {
        if (isList){
            setIsList(false)
        } else{
            setIsList(true)
        }
    }


    function clickMenu() {
        setIsMenu(true)
    }
    function closeMenu() {
        setIsMenu(false)
    }

  return (
    <>
        

        <TopSection page={"home"} isList={isList} clickMenu={clickMenu} click={() => { } } isMenu={isMenu} setValue={setValue} clickList={clickList} EmptyState={!ComparedData ? "home" : ""} stores={{}}></TopSection>

       
        <div style={{display:isMenu?"none":"block"}}>

       {isList? <div style={{marginTop:"30px"}}> <Addlist ></Addlist></div>: <div id="product-container" style={{display:'grid', gridTemplateColumns: "repeat(2, 160px)", gap: '20px', width:'100%',justifyContent: "center"}}>
        
               { ComparedData ?(!pop? 
               <div style={{width:"100vw", height:"auto", display:"flex", flexDirection:"column"}}>

               {ComparedData}
               <div style={{marginTop:"50px",display:"flex", flexDirection:"column", gap: 30}}>
                    {wool}
                    {shop}
                    {check}
                    {pnp}

                    {test}
               </div>
               </div>
                
            //    <div style={{marginTop:200}}>big time</div>
              
                // Data.compared_data.map((item:any) => {
                // if (!Array.isArray(Data.compared_data[item])) {
                //     return null;  // Skip this item
                // }
                
                // return <Carousel clickCompare={clickCompare} key={item} heading={item} data={Data.current.compared_data[item]} type={""} />;  // ✅ Add return
                // }
                // )
                // <div style={{marginTop:200}}>
                //     {Data.compared_data[0]}
                // </div>
                // {console.log(Data)}
                
                    // <Carousel heading="All stores" data={comparable_data.current.compared_stores} clickCompare={clickCompare(0)}></Carousel>
               :clickedData): <div style={{display:"grid", placeContent:"center",  width:"100vw", height:"200px", marginTop:"130px"}}> <HomeEmptyState></HomeEmptyState></div>}
        
        </div>
        
    }
    </div>
    <div style={{height:100}}></div>
        {isMenu?<DrawerMenu close={closeMenu}></DrawerMenu>:""}
       {/* {Data.compared_data.map((item:any) => {
                if (!Array.isArray(Data[item])) {
                    return null;  // Skip this item
                }
                console.log(Data)
                return <Carousel clickCompare={clickCompare} key={item} heading={item} data={Data[item]} type=""/>;  // ✅ Add return
            })} */}
        
    </>
  )
}

export default DashboardHome
