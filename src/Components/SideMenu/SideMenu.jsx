import { React, useState } from "react";
import "./SideMenu.css";
import { Link, NavLink } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";

export default function SideMenu() {
  let ArrowImg = require("../../Assets/Arrow Flip.svg").default;
  let HomeImg = require("../../Assets/Home inactive.svg").default;
  let DashboardImg = require("../../Assets/Dashboard inactive.svg").default;
  let CreateImg = require("../../Assets//Create inactive.svg").default;
  let AccountImg = require("../../Assets/Account inactive.svg").default;
  let SettingsImg = require("../../Assets/Settings inactive.svg").default;
  let LogoutImg = require("../../Assets/Logout inactive.svg").default;

  let DotImg = require("../../Assets/Dot.svg").default;

  let data = [
    {
      name: "Account Settings",
      image: AccountImg,
      url: "./account-settings",
    },
    {
      name: "Home",
      image: HomeImg,
      url: "/home",
    },

    {
      name: "Dashboard",
      image: DashboardImg,
      url: "./dashboard",
    },
    {
      name: "Create",
      image: CreateImg,
      url: "/create-tasks",
    },
    {
      name: "Project Settings",
      image: SettingsImg,
      url: "/project-settings",
    },
    {
      name: "Logout",
      image: LogoutImg,
      url: "/logIn",
    },
  ];

  const [navbarItems, setNavbarItems] = useState([...data]);

  const [collapse, setCollapse] = useState(false);
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const location = useLocation(); // Get the current location
  const isActive = (match, location) => {
    if (!match) return false; // If the link doesn't match the current location, it's not active
     // Check if the current URL includes the link URL
    // return location.pathname.includes(match.url);
    return true;
  };

  return (
    <div>
      <div className="sideMenu">
        <div className={`menu ${collapse ? 'collapsed' : ''}`}>
          <div className="sideMenuHeader">
          <img
            alt="Side menu button"
            src={ArrowImg}
            onClick={() => {
              toggleCollapse();
            }}
          />
        </div>
          {navbarItems.map((item) => {
            {
              //test if link is active
              console.log(isActive(location.pathname))
            }
            return (
              <div className="menuItem">
                <NavLink
                  className={`NavLink ${location.pathname.startsWith(item.url) ? "activeLink" : ""}`}
                  to={item.url}
                  key={`navbar-${item}`}
                  activeClassName='activeLink'
                  isActive={isActive(location.pathname)}
                >
                  <div className="sideMenuItem">
                    <div className="sideMenuItemContent">
                      <img alt={`${item.name}`} src={`${item.image}`} />
                      {!collapse && <p>{item.name}</p>}
                    </div>
                  </div>
                  <img className="dot" src={DotImg} alt="Dot" />
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
