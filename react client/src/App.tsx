import { useLocation } from 'react-router-dom'
import './App.css'
// import Basket from './pages/Basket'
// import DashboardHome from './pages/DashboardHome'
// import DrawerMenu from './components/DrawerMenu'
import NavBar from './components/NavBar'
// import Favourites from './pages/Favourites'
// import LandingPage from './pages/LandingPage'
import CardNav from './components/Header'
// import SignUp from './components/SignUp'
// import AuthenticationPage from './pages/AuthenticationPage'
import { useEffect, useState } from 'react'

function App() {

  const location = useLocation()
  const [isRegister, setIsRegister] = useState(false)
  const [isHome, setIsHome] = useState(false)

  // <MenuButtons clickMenuButton={clickMenuButton} img={"/logout.svg"} text={"Log Out"}/>
  //           <MenuButtons clickMenuButton={clickMenuButton} img={"/bookmark.svg"} text={"Search history"}/>
  //           <MenuButtons clickMenuButton={clickMenuButton} img={"/report.svg"} text={"Report Issue"}/>
  //           <MenuButtons clickMenuButton={clickMenuButton} img={"/notification.svg"} text={"Notification"}/>
  //           <MenuButtons clickMenuButton={clickMenuButton} img={"/notification.svg"} text={"Grocery Lists"}/>

  const items :any= [
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

  console.log(document.cookie)



  useEffect(() => {
  if ("serviceWorker" in navigator) {
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/service-worker.js");
        console.log("✅ Service Worker registered:", registration);
      } catch (err) {
        console.error("⚠️ Service Worker registration failed:", err);
      }
    };

  

    // Only register when not on landing page (if that’s what you mean)
    if (!window.location.pathname.includes("/landing")) {
      registerServiceWorker();
    }
  }
}, []); // run once

useEffect(()=>{
  if(location.pathname === "/register"){
    setIsRegister(true)
  }
  if(location.pathname === "/Dashboard/home"){
    setIsHome(true)
  }
},[])

  return (
    <>
      {/* <DashboardHome></DashboardHome> */}
      {/* <Basket></Basket> */}
      {/* <DrawerMenu/> */}
      
     
     
  
    {!isRegister ?<NavBar/>:null}
    { !isRegister && !isHome ?
     (<CardNav
      logo={"/logo.png"}
      logoAlt="Smart comparer"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
      setValue={() => { } } 
      children={undefined}            />):null}
    </>
    
  )
}

export default App
