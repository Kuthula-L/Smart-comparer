import { Link } from "react-router";
import Step_content from "../components/Step_content";
import Stepper, { Step } from '../components/Stepper';


const LandingPage = () => {

  
  return (
    <>
     <div style={{display:"flex", gap:20, flexDirection:"column"}} className="Page">

      {/* <div className="Logo" id="app-logo">
        <img src="/smart compare 1.svg"/>
      </div> */}

      {/* <HeaderComponent onClick={()=>{}}></HeaderComponent> */}

      {/* <CardNav
      logo={""}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    /> */}

        <div style={{height:"80px"}}></div>
      <div style={{width: 364, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 190, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 13, display: 'inline-flex'}}>
          <div style={{width: 145, height: 151, color: 'black', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'}}>Find it. Compare it.  Save Big.<br/>Smarter shopping starts here!</div>
         <Link to={'/register'}><button style={{width: 190, height: 40, background: '#FFC727', boxShadow: '0px 4px 4px black', borderRadius: 100, border:"none"}}>
            <div style={{color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Compare Prices Now</div>
          </button></Link> 
        </div>
        {/* <div style={{width: 195, height: 230, background: '#D9D9D9'}} /> */}
        <img src="/manstanding.svg"/>
      </div>
      {/* <div style={{display:"flex"}} className="ManStanding" id="man">
       
      </div> */}
      
      
      {/* <div className="Shopicons" id="shops">
      </div> */}

      
      {/* <div className="quote-2">
        <div>Ready to start saving? here's how it</div>
        <div>works</div>
      </div> */}
      
      {/* <div className="quote">
        <div className="bold-text">Featured Shops</div>
        <div className="italic-text">We compare prices across trusted stores</div>
      </div> */}

      {/* <a 
        href="/src/components/pages/SignUp.tsx" 
        className="landing-page-compare-button"
        aria-label="Compare Prices and sign up"
      >
        Compare Prices Now
      </a> */}

      

    <div style={{display:"flex", flexDirection:"column", marginTop:"40px"}}>
    <div style={{width: "100%",textAlign:"center", color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Ready to start saving? Here’s how it works</div>
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        console.log(step);
      }}
      onFinalStepCompleted={() => console.log("All steps completed!")}
      backButtonText="Previous"
      nextButtonText="Next"
    >
      <Step>
        <Step_content heading={"search"} img={"/search.svg"} description={"Find the product you want faster than a toddler finds candy. Type, click, done."}></Step_content>
      </Step>
      <Step>
        <Step_content heading={"Compare Item"} img={"/compare.svg"} description={"See how your pick stacks up against others. Prices, quality, and brands all laid bare—no marketing fluff."}></Step_content>
      </Step>
      <Step>
        <Step_content heading={"Add to Basket"} img={"/add_basket_item.svg"} description={"Collect your chosen treasures (or groceries, whatever). Everything you want, in one tidy digital cart."}></Step_content>
        </Step>
      <Step>
        <Step_content heading={"Save Big"} img={"/save.svg"} description={"The part everyone pretends isn’t the main goal. Watch the total drop and feel smug about it."}></Step_content>
    
      </Step>
    </Stepper>
      </div>
    <div style={{width: 319, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 13, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', height: 27, color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word', textAlign:"center", width:"100%", marginTop:"20px"}}>Featured Shops</div>
        <div style={{alignSelf: 'stretch', color: 'black', fontSize: 18, fontFamily: 'Inter', fontStyle: 'italic', fontWeight: '500', wordWrap: 'break-word', textAlign:"center", width:"100%"}}>We compare prices across trusted stores</div>
        <img src="/shopsicons.svg"/>
      </div>
     </div>

      <div style={{marginTop:"100px"}} className="CopyRight" id="copyright">
        <img src="/copyright.svg"/>
      </div>
    </>

  );
};

export default LandingPage;
{/* <div className="quote-1">
        <div>Find it.</div>
        <div>Compare it.</div>
        <div>Save Big.</div>
        <div>Smarter</div>
        <div>shopping</div>
        <div>starts here!</div>
      </div> */}

  {/* <div className="BubbleIcons" id="icons">
        <div style={{width: 340, height: 40, color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Ready to start saving? Here’s how it works</div>
        <img src="/bubbleicons.svg"/>
      </div> */}