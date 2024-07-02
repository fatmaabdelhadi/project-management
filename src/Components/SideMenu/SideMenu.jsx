import React, { useEffect, useState, useMemo } from "react";
import "./SideMenu.css";
import { NavLink, useLocation } from "react-router-dom";
import SideMenuProjects from "./SideMenuProjects";
import { getUserData } from "../../Services/UserModel";
import Logo from "../Logo/Logo";

export default function SideMenu() {
  let ArrowImg = require("../../Assets/Arrow Flip.svg").default;
  let HomeImg = require("../../Assets/Home inactive.svg").default;
  let CreateImg = require("../../Assets/Create inactive.svg").default;
  let AccountImg = require("../../Assets/Account inactive.svg").default;
  let LogoutImg = require("../../Assets/Logout inactive.svg").default;

  const data = useMemo(() => [
    {
      name: getUserData() ? getUserData().user.username : "",
      class: "header",
      image: "",
      url: "",
    },
    {
      name: "Profile",
      class: "link",
      image: AccountImg,
      url: "/account-settings",
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
      name: "My Projects",
      class: "",
      image: "",
      url: "",
    },
    {
      name: "Logout",
      class: "link",
      image: LogoutImg,
      url: "/",
    },
  ], [AccountImg, CreateImg, HomeImg, LogoutImg]);

  const [navbarItems, setNavbarItems] = useState([]);
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    setNavbarItems([...data]);
  }, [data]);

  const location = useLocation();

  const isActive = (url) => {
    return location.pathname.startsWith(url);
  };

  return (
    <div className={`sideMenu ${collapse ? "collapsed" : "expanded"}`}>
      <div className="menu">
        <Logo />

        <div className="sideMenuHeader">
          <img alt="Side menu button" src={ArrowImg} onClick={toggleCollapse} />
        </div>
        {navbarItems.map((item, index) => {
          const imgTag = item.image ? (
            <img alt={`${item.name}`} src={`${item.image}`} />
          ) : null;
          const additionalClassName = item.class ? item.class : "";
          const isLink = item.class === "link";

          return (
            <div className={`menuItem ${additionalClassName}`} key={index}>
              {isLink ? (
                <NavLink
                  className={`NavLink ${isActive(item.url) ? "activeLink" : ""}`}
                  to={item.url}
                >
                  <div className="sideMenuItem">
                    <div className="sideMenuItemContent d-flex align-items-center justify-content-center">
                      {imgTag}
                      {!collapse && <p>{item.name}</p>}
                    </div>
                  </div>
                </NavLink>
              ) : (
                <div className="sideMenuLabel">
                  {!collapse && item.name === "My Projects" && <SideMenuProjects />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
