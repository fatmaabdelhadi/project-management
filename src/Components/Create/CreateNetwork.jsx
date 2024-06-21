import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { setProjectData } from "../../Services/ProjectModel";

export default function CreateNetwork() {
  const { projectID } = useParams();

  const handleDoneClick = () => {
    const projectData = {
      projectName: "Your Project Name",
      description: "Your Project Description",
      status: "In Progress",
      // Add more fields as needed
    };

    setProjectData(projectData);

    // Redirect to dashboard after setting project data
    window.location.href = `/dashboard/`;
  };

  return (
    <div>
      <div>{/* Network component */}</div>
      <div className="createNavigationButtons">
        <NavLink to={`/create-tasks/${projectID}`} key="create-tasks">
          <button>Prev</button>
        </NavLink>
        <button onClick={handleDoneClick}>Done</button>
      </div>
    </div>
  );
}
