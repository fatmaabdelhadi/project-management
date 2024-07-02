import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";
import { getUserID } from "../../Services/UserModel";

export const UserLayout = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  // const [currentProject, setCurrentProject] = useState(() => {
  //   const savedProject = JSON.parse(localStorage.getItem("currentProject"));
  //   return savedProject || { projectID: "", projectName: "" };
  // });

  const unauthorizedImg = require("../../Assets/unauthorized.png");

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserID();
      setUserId(id);
      setIsLoading(false); // Set loading to false after fetching user ID
    };
    fetchUserId();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("currentProject", JSON.stringify(currentProject));
  // }, [currentProject]);

  if (isLoading) {
    // Display a loading indicator while fetching user ID
    return <div>Loading...</div>;
  }

  return (
    <>
      {!userId ? (
        <div className="App">
          <div className="unauthorized-container w-100 d-flex flex-column justify-content-center align-items-center">
            <img
              src={unauthorizedImg}
              alt="Unauthorized Access"
              style={{ height: "300px" }}
            />
            <h2>You don't have access to this page</h2>
            <NavLink
              to="/logIn"
              className="btn btn-primary"
              style={{ background: "var(--teal)" }}
            >
              Login
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="App">
          {/* <SideMenu
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
          /> */}
          <SideMenu />
          <div className="userLayout">
            {/* <Navbar currentProject={currentProject} /> */}
            <Navbar />
            <div className="Content">
              {children}
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
