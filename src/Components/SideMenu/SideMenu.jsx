import { React, useState } from "react";
import "./SideMenu.css";
import { Link, NavLink } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";
import SideMenuProjects from "./SideMenuProjects";

export default function SideMenu({ currentProject }) {
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
      name: "Ganna Mohamed",
      class: "header",
      image: "",
      url: "",
    },
    {
      name: "Profile",
      class: "link",
      image: AccountImg,
      url: "./account-settings",
    },
    {
      name: "",
      class: "divider",
      image: "",
      url: "",
    },
    {
      name: "Home",
      class: "link",
      image: HomeImg,
      url: "/home",
    },
    {
      name: "Create",
      class: "link",
      image: CreateImg,
      url: "/create-project",
    },
    {
      name: "",
      class: "divider",
      image: "",
      url: "",
    },
    {
      name: currentProject.projectName + ">",
      class: "dropdown",
      image: "",
      url: { useLocation },
    },
    {
      name: "Dashboard",
      class: "link",
      image: DashboardImg,
      url: "./dashboard",
    },
    {
      name: "Project Settings",
      class: "link",
      image: SettingsImg,
      url: "/project-settings",
    },
    {
      name: "Logout",
      class: "link",
      image: LogoutImg,
      url: "/logIn",
    },
  ];

  const [navbarItems, setNavbarItems] = useState([...data]);
  const [showDropdown, setShowDropdown] = useState(false);

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
        <div className={`menu ${collapse ? "collapsed" : ""}`}>
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
            const imgTag = item.image ? (
              <img alt={`${item.name}`} src={`${item.image}`} />
            ) : null;
            const additionalClassName = item.class ? item.class : "";
            const isDropdown = item.class === "dropdown";
            const isLink = item.class === "link";

            return (
              <div className={`menuItem ${additionalClassName}`}>
                {isLink ? (
                  <NavLink
                    className={`NavLink ${
                      location.pathname.startsWith(item.url) ? "activeLink" : ""
                    }`}
                    to={item.url}
                    key={`navbar-${item}`}
                    activeClassName="activeLink"
                    isActive={isActive(location.pathname)}
                  >
                    <div className={`sideMenuItem`}>
                      <div className="sideMenuItemContent">
                        {imgTag}
                        {!collapse && <p>{item.name}</p>}
                      </div>
                    </div>
                    {isLink && <img className="dot" src={DotImg} alt="Dot" />}
                  </NavLink>
                ) : (
                  <p
                    className={`NavLink ${additionalClassName}  ${
                      isDropdown ? "dropdown" : ""
                    }`}
                    onClick={() => {
                      if (isDropdown) {
                        setShowDropdown(!showDropdown);
                      }
                    }}
                  >
                    {imgTag}
                    {!collapse && <p>{item.name}</p>}
                    {!collapse && isDropdown && showDropdown && (
                      <SideMenuProjects />
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
