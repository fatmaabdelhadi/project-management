import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function GuestNavbar() {
    let data = [
    {
      name: "home",
      url: "/",
      },
    {
      name: "Contact Us",
      url: "/contact",
    },
    {
      name: "Log In",
      url: "./logIn",
    },
    {
      name: "Sign Up",
      url: "/signUp",
    },
  ];

  const [navbarItems, setNavbarItems] = useState([...data]);
  const location = useLocation(); // Get the current location
  const isActive = (match, location) => {
     console.log()
    if (!match) return false; // If the link doesn't match the current location, it's not active
     // Check if the current URL includes the link URL
    return location.pathname.includes(match.url);
  };
  return (
    <div className='guestNavbar'>
      {navbarItems.map((item) => {
        return (
          <div className='navItem'>
             <NavLink
              className={`NavLink ${location.pathname.startsWith(item.url) ? "activeLink" : ""}`}
              to={item.url}
              key={`navbar-${item}`}
              activeClassName='activeLink'
              isActive={isActive}
            >{item.name}</NavLink>
          </div>
        )
      })}
    </div>
  )
}
