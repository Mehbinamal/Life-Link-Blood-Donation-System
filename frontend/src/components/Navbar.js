import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // List of pages where navbar should NOT appear
  const noNavbarPages = [
    "/welcome",
    "/login",
    "/signup",
    "/requestBlood",
    "/requestPage",
    "/details",
  ];

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If the current page is in noNavbarPages, show LifeLink title instead of navbar
  if (noNavbarPages.includes(location.pathname)) {
    return (
      <div className="page-header">
        <h1>LifeLink</h1>
      </div>
    );
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className="website-name">LifeLink</h1>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
