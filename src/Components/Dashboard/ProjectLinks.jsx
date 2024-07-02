import React from "react";
import { NavLink } from "react-router-dom";
export default function ProjectLinks({ projectID }) {
  // assets
  let SettingsImg = require("../../Assets/settings.svg").default;
  let AddImg = require("../../Assets/add.png");
  let DashboardImg = require("../../Assets/dashboard.svg").default;

  return (
    <div className="d-flex flex-row-reverse gap-3 m-5">
      <NavLink to={`/create-tasks/${projectID}`} key="create-tasks">
        <img src={AddImg} />
      </NavLink>
      <NavLink to={`/dashboard/${projectID}`} key="dashboar">
        <img src={DashboardImg} />
      </NavLink>
      <NavLink to={`/project-settings/${projectID}`} key="project-settings">
        <img src={SettingsImg} />
      </NavLink>
    </div>
  );
}
