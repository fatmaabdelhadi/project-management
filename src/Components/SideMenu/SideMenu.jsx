import React, { useEffect, useState, useMemo } from "react";
import "./SideMenu.css";
import { NavLink, useLocation } from "react-router-dom";
import SideMenuProjects from "./SideMenuProjects";
import { getUserData } from "../../Services/UserModel";
import { useCollapse } from "react-collapsed";
import Logo from "../Logo/Logo";

export default function SideMenu({ currentProject, setCurrentProject }) {
  let ArrowImg = require("../../Assets/Arrow Flip.svg").default;
  let HomeImg = require("../../Assets/Home inactive.svg").default;
  let DashboardImg = require("../../Assets/Dashboard inactive.svg").default;
  let CreateImg = require("../../Assets/Create inactive.svg").default;
  let AccountImg = require("../../Assets/Account inactive.svg").default;
  let SettingsImg = require("../../Assets/Settings inactive.svg").default;
  let LogoutImg = require("../../Assets/Logout inactive.svg").default;
  let DotImg = require("../../Assets/Dot.svg").default;

  const data = useMemo(
    () => [
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
        name: currentProject?.projectName
          ? currentProject.projectName
          : "Select Project",
        class: "dropdown",
        image: "",
        url: "",
      },
      {
        name: "Dashboard",
        class: "link",
        image: DashboardImg,
        url: "/dashboard",
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
        url: "/login",
      },
    ],
    [
      AccountImg,
      CreateImg,
      DashboardImg,
      HomeImg,
      LogoutImg,
      SettingsImg,
      currentProject.projectName,
    ]
  );

  const [navbarItems, setNavbarItems] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

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
    <div className="sideMenu">
      <div className={`menu ${collapse ? "collapsed" : ""}`}>
        <Logo />

        <div className="sideMenuHeader">
          <img alt="Side menu button" src={ArrowImg} onClick={toggleCollapse} />
        </div>
        {navbarItems.map((item, index) => {
          const imgTag = item.image ? (
            <img alt={`${item.name}`} src={`${item.image}`} />
          ) : null;
          const additionalClassName = item.class ? item.class : "";
          const isDropdown = item.class === "dropdown";
          const isLink = item.class === "link";

          return (
            <div className={`menuItem ${additionalClassName}`} key={index}>
              {isLink ? (
                <NavLink
                  className={`NavLink ${
                    isActive(item.url) ? "activeLink" : ""
                  }`}
                  to={item.url}
                  activeClassName="activeLink"
                >
                  <div className={`sideMenuItem`}>
                    <div className="sideMenuItemContent d-flex align-items-center justify-content-center">
                      {imgTag}
                      {!collapse && <p>{item.name}</p>}
                    </div>
                  </div>
                  {/* {isActive(item.url) && (
                    <img className="dot" src={DotImg} alt="Dot" />
                  )} */}
                </NavLink>
              ) : (
                <p className={`${additionalClassName}`} {...getToggleProps()}>
                  {!collapse && !isDropdown && (
                    <div className="sideMenuLabel">{item.name}</div>
                  )}
                  {imgTag}
                  {!collapse && isDropdown && (
                    <div>
                      <p className="sideMenuLabel">
                        {item.name} <span>{isExpanded ? "-" : "+"}</span>
                      </p>
                      <div {...getCollapseProps()}>
                        <SideMenuProjects
                          setCurrentProject={setCurrentProject}
                        />
                      </div>
                    </div>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <p
                  className={`NavLink ${additionalClassName} ${
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
                    <SideMenuProjects setCurrentProject={setCurrentProject} />
                  )}
                </p> */
}