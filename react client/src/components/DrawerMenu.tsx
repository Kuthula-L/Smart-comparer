import type React from "react"
import DrawerContentMenu from "./DrawerContentMenu"
import { useState } from "react"


interface Probs{
    close:()=>void
}
function DrawerMenu({close}:Probs) {

 const [isClicked] = useState(false)

  function clickMenuButton (e:React.MouseEvent<HTMLDivElement, MouseEvent>){
    // setIsClicked(true)
    console.log(e.currentTarget)
  }

  return (
  
<>
    <div style={{maxWidth: 500, height:700,backgroundImage:"url('/drawerMenuBackground.svg')",  backgroundSize:"cover", borderRadius:30, backgroundPositionX:"-100px", position:"relative", left:"50%", transform:"translate(-50%)"}}>
    <img style={{width:120, height:120, marginLeft:25}} src="/logo.png"></img>

    <div style={{display:"flex", width:"95vw", gap:10, flexDirection:"row", height:700}}>
      <div style={{display:!isClicked?"none":"flex",flex:1,border:"1px solid white", height:300, zIndex:5, padding:15, flexDirection:"column", position:"relative", borderRadius:30, borderTopLeftRadius:30, borderBottomLeftRadius:30,  background: 'rgba(0, 0, 0, 0.21)', backdropFilter: 'blur(20px)'}}></div>
      {/* <div style={{bottom:0,width:"85vw",border:"1px solid white", height:330, zIndex:5, padding:15, display:"flex", flexDirection:"column", position:"absolute", borderRadius:30, borderTopLeftRadius:30, borderBottomLeftRadius:30,  background: 'rgba(0, 0, 0, 0.21)', backdropFilter: 'blur(20px)'}}></div> */}
      <div style={{flex:isClicked?1:0,position:isClicked?'static':'absolute', top:"10px", right:"0px", color:"white"}}><DrawerContentMenu clickMenuButton={clickMenuButton} close={close}/></div>
    </div>
   
    </div>
</>
  )
}

export default DrawerMenu
 