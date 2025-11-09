import { AnimatePresence, motion } from "motion/react"
import OauthBtn from "../components/OauthBtn"
import { useState } from "react"
import { Link } from "react-router-dom"
import {v4 as uuidv4} from "uuid";



function AuthenticationPage() {
    
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
          email: '',
          password: '',
          confirmedPassword:""
        });

    const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [ConfirmedPassword, setConfirmedPassword] = useState("")
    const [emailBtnText, setText] = useState("continue")
    const userid = uuidv4();


    const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          console.log(formData);
        };

    function setEmailAuthBtn(){
      
      async function checkEmail(){
        const res = await fetch("", {
          method:"POST", 
          body:JSON.stringify({"email":email})
        })
        
        const data = await res.json()
        
        
        if (data.exsist) {
            setText("Login") 
         } else{
            setText("Sign up")
          
        }
      }
      
      checkEmail()
      setShow(true)
        // localStorage.setItem("user","user")
    } 


    function goBack(){
        setShow(false)
        setText("Continue")
    }

    


    function addGuest(){
        async function addGuest(){ 
          const  res = await fetch("http://127.0.0.1:8000/auth/add_guest/", 
            {method:"POST", 
              body:JSON.stringify({"user_uuid":userid})

            })
          const data = await res.json()
       
        
        console.log(data)

        }
        localStorage.setItem("user","guest")

        addGuest()
    }

  return (
    <div style={{display:"flex",flexDirection:"column", gap:"20px", justifyItems:"center", alignItems:"center", height:"80vh"}}>

        { !show?
       (<Link to={"/"}> 
       <button  style={{width:50, height:50, backgroundColor:"black", borderRadius:"100px", alignSelf:"flex-start", marginLeft:10, marginTop:20, border:"none", position:"absolute", top:10, left:5}}>
            <img src={"/cross.svg"} style={{width:"35px", height:"35px",stroke:"white", rotate:show?"45deg":"0deg"}}></img>
        </button>
        </Link>):
        (<button onClick={goBack} style={{width:50, height:50, backgroundColor:"black", borderRadius:"100px", alignSelf:"flex-start", marginLeft:10, marginTop:20, border:"none",position:"absolute", top:10, left:5}}>
            <img src={"/Back.svg"} style={{width:"35px", height:"35px",stroke:"white", rotate:show?"45deg":"0deg"}}></img>
        </button>)}

        

        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"30px"}}>
            <img style={{width: 180, height: 270}} src="logo.png"/>
            <div style={{width: 240, height: 37, color: 'black', fontSize: 30, fontFamily: 'Josefin Slab', fontWeight: '600', wordWrap: 'break-word', marginTop:-30, marginBottom:10}}>Smart Comparer</div>
        </div>


    
        <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>

          <form onSubmit={handleSubmit}>
            <div style={{width: 325, height: 46, borderRadius: 11,background: '#EFEFEF',}}>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email or phone number" style={{textAlign: 'left', color: '#141414', fontSize: 16, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word', width:"100%", marginLeft:"5px"}}></input>
            </div>

            <AnimatePresence initial={false}>
            {show?<motion.div  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} key="box" style={{width: 325, height: 46,  borderRadius: 11,background: '#EFEFEF',marginLeft:"5px"}}>
                {/* display:show?"block":"none" */}
                <input  type="password" onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Enter Password" style={{textAlign: 'left', color: '#141414', fontSize: 16, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word', width:"100%"}}></input>
            </motion.div>:null}</AnimatePresence>


            <AnimatePresence initial={false}>
            {show?<motion.div  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} key="box2"  style={{width: 325, height: 46, borderRadius: 11,background: '#EFEFEF',marginLeft:"5px"}}>
                {/* display:show && emailBtnText ==="Sign up"?"block":"none" */}
                <input type="password" onChange={(e)=>{setConfirmedPassword(e.target.value)}} placeholder="Confirm Password" style={{textAlign: 'left', color: '#141414', fontSize: 16, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word', width:"100%"}}></input>
            </motion.div>:null}
            </AnimatePresence>
            <button type={emailBtnText !== "continue"?"submit":"button"} onClick={setEmailAuthBtn} style={{width: 325, height: 46, background: '#FFC727', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 11, border: '1px #E3DFDF solid'}}>
                <div style={{textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word'}}>{emailBtnText}</div>
            </button>

            </form>
        </div>
        
        <div style={{width: 34, textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word', display:show?"none":"flex"}}>or</div>

        {/* <AnimatePresence mode="wait">

        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }} style={{gap:10, flexDirection:"column", display:show?"none":"flex"}}>
            
            <OauthBtn img={"/guests.png"} text={"Contiue as a guest"}></OauthBtn>
            <OauthBtn img={"/google.svg"} text={"Contiue with Google"}></OauthBtn>
            <OauthBtn img={"/apple.svg"} text={"Contiue with Apple"}></OauthBtn>
        </motion.div>
        </AnimatePresence> */}

<AnimatePresence mode="wait">
  {!show && (
    <motion.div 
      initial={{ y: 10, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: -10, opacity: 0 }} 
      transition={{ duration: 0.2 }} 
      style={{
        gap: 10, 
        flexDirection: "column", 
        display: "flex"
      }}
      key="oauth-buttons"  // Add a key for AnimatePresence
    >
      <Link to="/Dashboard/home" style={{textDecoration:"none"}} onClick={addGuest}><OauthBtn img={"/guests.png"} text={"Continue as a guest"} /></Link>
      <OauthBtn img={"/google.svg"} text={"Continue with Google"} />
      <OauthBtn img={"/apple.svg"} text={"Continue with Apple"} />
    </motion.div>
  )}
</AnimatePresence>
    </div>
  )
}

export default AuthenticationPage


//  <div style={container}>
//             <AnimatePresence initial={false}>
//                 {isVisible ? (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0 }}
//                         style={box}
//                         key="box"
//                     />
//                 ) : null}
//             </AnimatePresence>
//             <motion.button
//                 style={button}
//                 onClick={() => setIsVisible(!isVisible)}
//                 whileTap={{ y: 1 }}
//             >
//                 {isVisible ? "Hide" : "Show"}
//             </motion.button>
//         </div>