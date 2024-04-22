import { React, useState } from "react";
import "./SideMenu.css";
import { Link, NavLink } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";

export default function SideMenu() {
  let ArrowImg = require("../../Assets/Arrow.svg").default;
  let HomeImg = require("../../Assets/Home inactive.svg").default;
  let DashboardImg = require("../../Assets/Dashboard inactive.svg").default;
  let CreateImg = require("../../Assets//Create inactive.svg").default;
  let DotImg = require("../../Assets/Dot.svg").default;

  let data = [
    {
      name: "home",
      image: HomeImg,
      url: "/home",
    },
    {
      name: "dashboard",
      image: DashboardImg,
      url: "./dashboard",
    },
    {
      name: "create",
      image: CreateImg,
      url: "/create",
    },
  ];

  const [navbarItems, setNavbarItems] = useState([...data]);

  const [collapse, setCollapse] = useState(false);
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const location = useLocation(); // Get the current location
  const isActive = (match, location) => {
     console.log()
    if (!match) return false; // If the link doesn't match the current location, it's not active
     // Check if the current URL includes the link URL
    return location.pathname.includes(match.url);
  };

  return (
    <div>
      <div className="sideMenu">
        <div className="sideMenuHeader">
          <img
            alt="Side menu button"
            src={ArrowImg}
            onClick={() => {
              toggleCollapse();
            }}
          />
        </div>
        <div className="menu ${collapse ? 'collapsed' : ''}">
          {navbarItems.map((item) => {
          {/* let isActive = false */}
            return (
              <div className="menuItem">
                <NavLink
                  className={`NavLink ${location.pathname.startsWith(item.url) ? "activeLink" : ""}`}
              to={item.url}
                  key={`navbar-${item}`}
                  activeClassName='activeLink'
                  isActive={isActive}
                >
                  <div className="sideMenuItem">
                    <div className="sideMenuItemContent">
                      <img alt={`${item.name}`} src={`${item.image}`} />
                      {!collapse && <p>{item.name}</p>}
                    </div>
    {location.pathname.startsWith(item.url) && (
                  <img className="dot" src={DotImg} alt="Dot" />
                )}                </div>
                </NavLink>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
