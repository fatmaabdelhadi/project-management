import React, { useState, useEffect } from "react";
import "./Project.css";
import { NavLink, useParams } from "react-router-dom";
import {
  getProjectID,
  getProjectData,
  findProjectByID,
} from "../../Services/ProjectModel";

export default function ProjectSettings() {
  const [project_ID, setProjectID] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const { projectID } = useParams(); // Extract 'id' from useParams

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

  return <div>Project's Settings</div>;
}
