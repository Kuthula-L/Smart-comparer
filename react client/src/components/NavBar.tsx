import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styling/NavBar.css";

interface NavItem {
  label: string;
  icon: string; // base icon name (e.g. "home", "cart")
  href: string;
}

const NavBar: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: "Home", icon: "home", href: "/Home" },
    { label: "Basket", icon: "cart", href: "/Basket" },
    { label: "Favorites", icon: "heart", href: "/Favorites" },
  ];

  return (
    <>
      <nav className="nav-bar">
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

      <div className="nav-bar-shadow"></div>
    </>
  );
};

export default NavBar;