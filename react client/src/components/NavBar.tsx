import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styling/NavBar.css";

interface NavItem {
  label: string;
  icon: string; // base icon name (e.g. "home", "cart")
  href: string;
}

const NavBar: React.FC = () => {
  const location = useLocation();
  const [islandingPage, setIsLandingPage] = useState(false)

  const navItems: NavItem[] = [
    { label: "Home", icon: "home", href:"/Dashboard/home" },
    { label: "Basket", icon: "cart", href:"/Dashboard/Basket" },
    { label: "Favorites", icon: "heart", href: "/Dashboard/Favorites" },
  ];

  useEffect(() => {
  setIsLandingPage(location.pathname === "/");
}, [location.pathname]);
  return (
    <>
    
        <div style={{display:islandingPage?"none":"block"}}>

      <nav  className="nav-bar">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.href);
          const iconSrc = isActive ? `/${item.icon}-fill.svg` : `/${item.icon}-outline.svg`;
          return (
            <Link
            key={item.href}
            to={item.href}
            className={`nav-item ${isActive ? "active" : ""}`}
            >
              <img src={iconSrc} alt={item.label} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{position:"fixed", bottom:0, backgroundColor:"white"}} className="bottom-thingy"></div>
      </div>
      {/* <div className="nav-bar-shadow"></div> */}
    </>
  );
};

export default NavBar;