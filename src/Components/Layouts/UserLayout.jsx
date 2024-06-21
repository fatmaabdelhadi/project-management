import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";

export const UserLayout = ({ children }) => {
  const [currentProject, setCurrentProject] = useState(() => {
    const savedProject = JSON.parse(localStorage.getItem("currentProject"));
    return savedProject || { projectID: "", projectName: "" };
  });

  useEffect(() => {
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
  }, [currentProject]);

  return (
    <div className="App">
      <SideMenu
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />

      <div className="userLayout">
        <Navbar currentProject={currentProject} />
        <div className="Content">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
