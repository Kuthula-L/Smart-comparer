// import DrawerMenu from "./DrawerMenu";

interface Probs{
    onClick:()=>void
}



function HeaderComponent({onClick}:Probs) {

    
  return (
    <>
    <header style={{display:'flex', justifyContent:'space-around', width:"100vw", height:"70px", alignItems:"center"}}>
        <img src="/Smart_Comparer_Logo-removebg.png" style={{height:30, width:30}} alt="Smart Compare Logo" />
        <div style={{color: 'black', fontSize: 24, fontFamily: 'Josefin Slab', fontWeight: '600', wordWrap: 'break-word'}}>Smart Comparer</div>
        <img onClick={onClick} src="/DrawerNav.svg" style={{height:30, width:30}} alt="Smart Compare Logout " />
        
    </header>



        </>
  );
}

export default HeaderComponent;
