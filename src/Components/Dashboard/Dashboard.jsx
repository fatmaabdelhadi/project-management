import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Network from "./Network";
import Gantt from "./Gantt";
import { NavLink, useParams } from "react-router-dom";
import {
  getProjectID,
  getProjectData,
  findProjectByID,
} from "../../Services/ProjectModel";
import { statusDonut, priorityBar } from "./diagramsData";

export default function Dashboard() {
  const [project_ID, setProjectID] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const { id: projectID } = useParams(); // Extract 'id' from useParams

  useEffect(() => {
    const fetchCurrentProjectData = async () => {
      try {
        const storedProjectData = getProjectData();
        console.log("Project Data:", storedProjectData);
        setProjectData(storedProjectData);

        const storedProjectID = getProjectID();
        console.log("Project ID:", storedProjectID);
        setProjectID(storedProjectID);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    const fetchProjectData = async (id) => {
      try {
        const projectData = await findProjectByID(id);
        console.log("Project Data:", projectData);
        setProjectData(projectData);
        setProjectID(id);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    if (projectID) {
      fetchProjectData(projectID);
    } else {
      fetchCurrentProjectData();
    }
  }, [projectID]); // Added projectID as a dependency

  if (!projectData) {
    return <div>Loading...</div>; // Loading indicator
  }

  const diagrams = [
    {
      name: "Task Status",
      data: statusDonut.getUrl(),
      className: "statusDonut",
    },
    {
      name: "Task Priority",
      data: priorityBar.getUrl(),
      className: "priorityBar",
    },
  ];

  return (
    <div className="dashboard">
      <h2>{projectData.projectName}</h2>
      <p>{projectData.description}</p>
      <hr />
      <br />
      <h3 className="bold">Project Network</h3>
      <Network
        projectID={project_ID}
        border={"1px solid var(--grey)"}
        height={"400px"}
        width={"100%"}
      />
      <Gantt
        projectID={project_ID}
        border={"1px solid var(--grey)"}
        height={"400px"}
        width={"100%"}
      />
      {diagrams.map((item, index) => (
        <div key={index}>
          <h3 className="bold">{item.name}</h3>
          <img
            alt={item.name}
            className={`diagram ${item.className}`}
            src={item.data}
          />
        </div>
      ))}
      <div className="createNavigationButtons">
        <NavLink to={`/create-network/${projectID}`} key="create-network">
          <button>Prev</button>
        </NavLink>
      </div>
    </div>
  );
}
