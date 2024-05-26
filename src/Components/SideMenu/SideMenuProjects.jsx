import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function SideMenuProjects() {
  // render projects from axios
  const [projects, setProjects] = useState([]);
  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  // change current project
  const [currentProject, setCurrentProject] = useState({
    projectID: "",
    projectName: "",
  });
  //change current project in the url
  const navigate = useNavigate();
  const params = useParams();

  const url =
    "https://pm-platform-backend.onrender.com/api/projects/user/6629442719d2130518b601a8";
  React.useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data) {
          setProjects(
            data.map((project) => ({
              projectID: project._id,
              projectName: project.projectName,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleProjectClick = (project) => {
    setCurrentProject({ ...project });
    // save current url in local storage
    localStorage.setItem("projectID", JSON.stringify(project.projectID));
    localStorage.setItem("projectName", JSON.stringify(project.projectName));

    console.log(JSON.parse(localStorage.getItem("projectID")));
    console.log(JSON.parse(localStorage.getItem("projectName")));
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(params.projectID, project.projectID);
    navigate(newPath, { replace: true });
  };

  return (
    <div className="sideMenuProjects">
      {projects.map((project) => (
        <div
          key={project.projectID}
          onClick={() => handleProjectClick(project)}
        >
          <p>{project.projectName}</p>
        </div>
      ))}
    </div>
  );
}
