interface probs{
    img:string;
    text:string;
    clickMenuButton:(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>void
}
function MenuButtons({img, text, clickMenuButton}:probs) {
  return (
    <div onClick={clickMenuButton} style={{display:"flex", gap:15}}>
      <img style={{width:"30px", height:"30px",color:"white", fill:"white"}} src={img}/>
      <div style={{textWrap:"nowrap"}}>{text}</div>
    </div>
  )
}

export default MenuButtons
