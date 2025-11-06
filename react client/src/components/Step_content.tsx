

interface probs{
    heading: string,
    img:string,
    description:string
}

function Step_content({heading, img, description}:probs) {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column", }}>
      <h2>{heading}</h2>
      <img style={{width:"200px", height:"200px"}} src={img} alt="" />
      <div style={{marginTop:"20px", textAlign:"center"}}>{description}</div>
    </div>
  )
}

export default Step_content
