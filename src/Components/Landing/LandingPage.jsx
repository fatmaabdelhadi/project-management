import "./Landing.css"
import { NavLink } from 'react-router-dom'
import { React, useState } from "react";
import { useLocation } from "react-router-dom";

export default function LandingPage() {
   let data = [
    {
      name: "Guest Pages",
      url: "/",
      },
    {
      name: "User Pages",
      url: "/Home",
    }
  ];

  const [navbarItems, setNavbarItems] = useState([...data]);
  const location = useLocation(); // Get the current location
 
  return (
    <div className="landingPage">
              {navbarItems.map((item) => {
                return (
                  <div className='navItem'>
                    <NavLink
                      className={`NavLink ${location.pathname.startsWith(item.url) ? "activeLink" : ""}`}
                      to={item.url}
                      key={`home-${item}`}
                    >{item.name}</NavLink>
                  </div>
                )
              })}
    </div>
  )
}
