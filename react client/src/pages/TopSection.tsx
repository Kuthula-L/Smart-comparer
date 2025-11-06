import { useEffect, useState } from "react";
// import Filter from "../components/Filter";
// import HeaderComponent from "../components/HeaderComponent";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import BasketPerStore from "../components/BasketPerStore";
import CardNav from "../components/Header";
import { useLocation } from "react-router-dom";

interface Props{
    clickMenu:()=>void
    click:()=>void
    isMenu:Boolean
    setValue:(value:any)=>void;
    clickList: ()=>void
    isList:boolean
    EmptyState:string
    stores: object
    page: string
}

export default function TopSection({ isMenu, setValue, clickList, isList, EmptyState, stores, page}:Props) {
    const [ishomeEmpty,setIsHomeEmpty] = useState(false)
    const location = useLocation()
    // const [isOther, setIsOther] = useState(false)

    useEffect(()=>{
        if(EmptyState === "home"){
            setIsHomeEmpty(true)
        }
        console.log(ishomeEmpty)

    },[])


   const items :any = [
    {
      label: "Log In",
      bgColor: "#0D0716",
      textColor: "#fff",
      // links: [
      //   { label: "Company", ariaLabel: "About Company" },
      //   { label: "Careers", ariaLabel: "About Careers" }
      // ]
    },
    {
      label: "Search history", 
      bgColor: "#170D27",
      textColor: "#fff",
      // links: [
      //   { label: "Featured", ariaLabel: "Featured Projects" },
      //   { label: "Case Studies", ariaLabel: "Project Case Studies" }
      // ]
    },
    {
      label: "Report Issue",
      bgColor: "#271E37", 
      textColor: "#fff",
      // links: [
      //   { label: "Email", ariaLabel: "Email us" },
      //   { label: "Twitter", ariaLabel: "Twitter" },
      //   { label: "LinkedIn", ariaLabel: "LinkedIn" }
      // ]
    },
    {
      label: "Grocery Lists",
      bgColor: "#271E37", 
      textColor: "#fff",
      // links: [
      //   { label: "Email", ariaLabel: "Email us" },
      //   { label: "Twitter", ariaLabel: "Twitter" },
      //   { label: "LinkedIn", ariaLabel: "LinkedIn" }
      // ]
    }
  ];

  return (

    <>
    <div style={{alignItems:"center", display:isMenu?"none":"flex", flexDirection:"column", position:"fixed", top:0, backgroundColor:"white", height:"20vh", zIndex:20, paddingBottom:10, left:"50%", transform:"translate(-50%)"}}>
        {/* <HeaderComponent  onClick={clickMenu}></HeaderComponent>  */}
        {location.pathname==="/Dashboard/home"?<CardNav
            logo={""}
            logoAlt="Smart comparer"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
            setValue={()=>{}}
        > <SearchBar GetHomeData={setValue}></SearchBar></CardNav>:null}
        {/* <div style={{marginTop:100}}></div> */}
        <div style={{height:'auto', width:"auto", marginTop:100, display:"flex", gap:5}}>
            <div className="might" style={{display:"flex", gap:10, justifyContent:"center", width:"95vw",paddingRight:20, paddingLeft:20}}>
                {/* <Filter></Filter> */}
                <div style={{display:EmptyState===""? "none":"flex"}}><Sort></Sort></div>
                <div onClick={clickList} style={{background:"", color: "white", width:210, height:45, borderRadius:"70px", placeContent:'center', border:"1px solid #DBDBDB", display: page === "home" ?"flex":"none"}}>
                    <button style={{width:200, height:35, backgroundColor: "white", borderRadius:70, color:isList?"white":"black", placeSelf:"center", border:"1px solid #DBDBDB", background:isList?"black":"white"}}>Grocary List</button>
                </div>
                <div style={{maxWidth:"80%", display:page === "home"?"none":"flex", overflowX:"scroll", gap:5,}}>
                    {
                   
                    Object.entries(stores ||{}).map(([storename, total]) => {
                            if (total !== 0) {
                                return (
                                <BasketPerStore 
                                    key={storename}
                                    storeName={storename} 
                                    TotalAmount={total.toFixed(2)}
                                />
                                );
                            }
                            return null;
                            })
                    }

                </div>
                <div>
            
            </div>
        </div>
        
           
            <div style={{display:"none"}} className="pop-up"></div>
        </div>
        </div>

            <div style={{height:"26vh", width:"100vw", backgroundColor:"", display:isMenu?"none":"block"}}></div>
    </>
  )
}
