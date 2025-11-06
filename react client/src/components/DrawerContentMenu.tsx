import MenuButtons from "./MenuButtons"

interface Probs{
    close:()=>void
    clickMenuButton: (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>void
}

function DrawerContentMenu({close, clickMenuButton}:Probs) {
  return (<div style={{border:"1px solid white", height:300, zIndex:5, padding:15, display:"flex", flexDirection:"column", position:"relative", borderRadius:30, borderTopLeftRadius:30, borderBottomLeftRadius:30,  background: 'rgba(0, 0, 0, 0.21)', backdropFilter: 'blur(20px)'}}>
    
        <div style={{display:"flex", width:'100%', justifyContent:"space-around", alignItems:"center", gap:10}}> 
            <div style={{fontSize:16, textWrap:"nowrap"}}>Smart Comparer</div>
            <img src="/DrawerNav-filled.svg" style={{width:'30px', height:"30px"}} ></img>
        </div>

       <div style={{display:"flex", flexDirection:"column", gap:10, marginTop:"30px",alignContent:"center", marginLeft:10}}>
            <MenuButtons clickMenuButton={clickMenuButton} img={"/logout.svg"} text={"Log Out"}/>
            <MenuButtons clickMenuButton={clickMenuButton} img={"/bookmark.svg"} text={"Search history"}/>
            <MenuButtons clickMenuButton={clickMenuButton} img={"/report.svg"} text={"Report Issue"}/>
            <MenuButtons clickMenuButton={clickMenuButton} img={"/notification.svg"} text={"Notification"}/>
            <MenuButtons clickMenuButton={clickMenuButton} img={"/notification.svg"} text={"Grocery Lists"}/>
       </div> 

      <button onClick={close} style={{width:130, height:45, backgroundColor: "#FFC727", border:"none", borderTopLeftRadius:"30px", borderTopRightRadius:"30px", position:"absolute", bottom:0, left:"50%", transform:"translate(-50%)"}}>close</button>
    </div>
  )
}

export default DrawerContentMenu
