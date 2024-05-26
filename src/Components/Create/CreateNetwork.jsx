import React from "react";
import Network from "../Dashboard/Network";
import { NavLink, useParams } from "react-router-dom";

export default function CreateNetwork() {
  const { projectID } = useParams();
  return (
    <div>
      <div>
        <Network
          projectID={projectID}
          height={"80vh"}
          width={"100%"}
          border={"1px solid var(--grey)"}
        ></Network>
      </div>
      <div className="createNavigationButtons">
        <NavLink to={`/create-tasks/${projectID}`} key="create-tasks">
          <button>Prev</button>
        </NavLink>
        <NavLink to={`/dashboard/${projectID}`} key="/dashboard">
          <button>Done</button>
        </NavLink>
      </div>
    </div>
  );
}
