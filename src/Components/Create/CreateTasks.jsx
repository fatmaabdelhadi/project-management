import React, { useEffect, useState } from "react";
import TaskListRenderer from "../TaskList/TaskListRenderer";
import { useParams } from "react-router-dom";
import { findProjectByID } from "../../Services/ProjectModel";
import { getUsernameById } from "../../Services/UserModel";
import ProjectLinks from "../Dashboard/ProjectLinks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateTasks() {
  const navigate = useNavigate();
  const { projectID } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [projectManager, setProjectManager] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const data = await findProjectByID(projectID);
        setProjectData(data);

        if (data && data.projectManager) {
          const managerName = await getUsernameById(data.projectManager);
          setProjectManager(managerName);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [projectID]);

  // const handleDoneClick = async () => {
   

  if (!projectData) {
    return <div>Loading...</div>; // Placeholder for when projectData is null
  }

  return (
    <div>
      <ProjectLinks></ProjectLinks>

      <h1 style={{ marginTop: "20px" }} className="bold">
        {projectData.projectName}
      </h1>
      <div className="d-flex gap-2">
        <AccountCircleIcon style={{ opacity: "0.5" }} />
        <p className="grey">Managed by </p>
        <p className="bold">{projectManager}</p>
      </div>
      <div className="d-flex gap-2">
        {projectData.description && (
          <>
            <InfoOutlinedIcon style={{ opacity: "0.7" }} />
            <p className="grey">Description </p>
            <p className="bold">{projectData.description}</p>
          </>
        )}
      </div>
      <TaskListRenderer projectID={projectID}></TaskListRenderer>
      <div className="createNavigationButtons">
        {/* <NavLink to="/create-project" key="create-project">
          <button>Prev</button>
        </NavLink> */}
        {/* <button onClick={handleDoneClick} disabled={!projectData}>
          Done
        </button> */}
      </div>
    </div>
  );
}
