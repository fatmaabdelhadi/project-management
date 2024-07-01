import React from "react";
import "./Navbar.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar({ currentProject }) {
  // const location = useLocation();
  // const { pathname } = location;

  // // List of user-specific paths
  // const userLinks = ["/home", "/create-project", "/account-settings", "/logIn"];

  // // Function to check if the current path is a user link
  // const isUserLink = (path) => {
  //   return userLinks.includes(path);
  // };

  return (
    <div className="navbar">
      {/* <br></br>
      <div className="BreadCrumb">
        {isUserLink(pathname) ? (
          <NavLink to={pathname}>{pathname.replace("/", "")}</NavLink>
        ) : (
          <>
            {currentProject.projectName}
            <NavLink>&nbsp;{pathname.replace("/", "/")}</NavLink>
          </>
        )}
      </div> */}
    </div>
  );
}
