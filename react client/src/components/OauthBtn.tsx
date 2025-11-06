
interface probs{
    img:string;
    text:string;
}

function OauthBtn({img, text}:probs) {
  return (
    <button style={{width: 325, height: 46, background: 'white', borderRadius: 11, border: '1px #EFEFEF solid', display:"flex", alignItems:"center", gap:0}}>
      <img style={{width: 35, height: 35,  overflow: 'hidden'}} src={img} />
      <div style={{width:290, textAlign: 'center', color: '#141414', fontSize: 16, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word'}}> {text}</div>
    </button>
  )
}

export default OauthBtn
