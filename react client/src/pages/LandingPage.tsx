import './LandingPage.css';

const LandingPage = () => {
  return (
    <>
     <div className="Page">
      <div className="Logo" id="app-logo">
        <img src="/smart compare 1.svg"/>
      </div>
      <div className="BubbleIcons" id="icons">
        <img src="/bubbleicons.svg"/>
      </div>
      <div className="CopyRight" id="copyright">
        <img src="/copyright.svg"/>
      </div>
      <div className="ManStanding" id="man">
        <img src="/manstanding.svg"/>
      </div>
      <div className="Shopicons" id="shops">
        <img src="/shopsicons.svg"/>
      </div>
       <div className="quote-1">
        <div>Find it.</div>
        <div>Compare it.</div>
        <div>Save Big.</div>
        <div>Smarter</div>
        <div>shopping</div>
        <div>starts here!</div>
      </div>
      
      <div className="quote-2">
        <div>Ready to start saving? here's how it</div>
        <div>works</div>
      </div>
      
      <div className="quote">
        <div className="bold-text">Featured Shops</div>
        <div className="italic-text">We compare prices across trusted stores</div>
      </div>

      <a 
        href="/src/components/Login&Register/signup.html" 
        className="landing-page-compare-button"
        aria-label="Compare Prices and sign up"
      >
        Compare Prices Now
      </a>
     </div>
    </>

  );
};

export default LandingPage;