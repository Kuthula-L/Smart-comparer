// import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"
import ProductCompare from "../components/ProductCompare";


function DashboardHome() {

    const [data, setData] = useState<Object[]>()
    // const [, setQuery] = useState()
 
    function setValue(data:any){
        setData(data)
        console.log(data)
    }


  return (
    <>
        <SearchBar GetHomeData={setValue}></SearchBar>
        <ProductCompare></ProductCompare>

        {/* {data?.map(item=>{
            <ProductCompare></ProductCompare>
        })} */}
        {/* <NavBar></NavBar> */}
    </>
  )
}

export default DashboardHome
