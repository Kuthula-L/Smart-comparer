import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import React from "react"

const HomeEmptyState = React.memo(()=> {
  return (
    <AnimatePresence mode="wait">

    <motion.div 
          layoutId="underline" 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -0, opacity: 0 }}
          transition={{ duration: 0.4 }}>

      <div   style={{width: "90%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 21, display: 'flex', marginTop:"0px", height:"auto", alignContent:"center", position:"static", top:"200px", left:'50%', transform:"translate(-50%)"}}>
        <img style={{width:245, height:240}}src="/homeEmpty.svg"/>
        <div style={{textAlign: 'center', color: '#1C274C', fontSize: 20, fontFamily: 'Inter', fontWeight: '800', wordWrap: 'break-word', marginTop:"20px"}}>Start Searching</div>
        <div style={{textAlign: 'center', color: 'black', fontSize: 13, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', width:244}}>Find something you love, give it a heart, and watch this space fill up with your favorites.</div>
        <button style={{border:"none", backgroundColor:"#FFC727", fontSize:14, width:"202px", height:50, borderRadius:"50px", fontWeight:600}}>view Popular items</button>
        </div>
    </motion.div>
    </AnimatePresence>
  )
})

export default HomeEmptyState
