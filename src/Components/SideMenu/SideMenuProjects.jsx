import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getUserProjects, getUserID } from "../../Services/UserModel";
import { findProjectByID, setProjectData } from "../../Services/ProjectModel";
// import "./SideMenu.css";
import "./Sidemenu.css"
export default function SideMenuProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      const userid = getUserID();
      const projectsData = await getUserProjects(userid);
      if (projectsData) {
        const formattedProjects = projectsData.map((project) => ({
          projectID: project._id,
          projectName: project.projectName,
        }));
        setProjects(formattedProjects);
      }
    };
    fetchProjects();
  }, []);

  // const handleProjectClick = async (project) => {
  //   const data = await findProjectByID(project.projectID);
  //   setProjectData(data);
  //   localStorage.setItem("currentProject", JSON.stringify(project));
  //   const currentPath = window.location.pathname;
  //   const newPath = currentPath.replace(params.projectID, project.projectID);
  //   navigate(newPath, { replace: true });
  //   window.location.reload();
  // };

  return (
    <div className="sideMenuProjects">
      {projects.map((project) => (
        <div key={project.projectID} className="sideMenuProjectsItem">
          <NavLink
            to={`/dashboard/${project.projectID}`}
            // onClick={() => handleProjectClick(project)}
            className={({ isActive }) =>
              isActive ? "activeProjectLink" : "projectLink"
            }
          >
            <p>{project.projectName}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
}


// export default function SideMenuProjects({ setCurrentProject }) {
//     const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();
//   const params = useParams();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const userid = getUserID();
//       const projectsData = await getUserProjects(userid);
//       if (projectsData) {
//         const formattedProjects = projectsData.map((project) => ({
//           projectID: project._id,
//           projectName: project.projectName,
//         }));
//         setProjects(formattedProjects);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleProjectClick = (project) => {
//     setCurrentProject(project);

//     const fetchProjectData = async () => {
//       try {
//         const data = await findProjectByID(project.projectID);
//         setProjectData(data); // Set project data in state
//         window.location.reload();
//       } catch (error) {
//         console.error("Error fetching project data:", error);
//       }
//     };

//     if (project.projectID) {
//       fetchProjectData();
//     }

//     localStorage.setItem("currentProject", JSON.stringify(project));
//     const currentPath = window.location.pathname;
//     const newPath = currentPath.replace(params.projectID, project.projectID);
//     navigate(newPath, { replace: true });
//   };

//   return (
//     <div className="sideMenuProjects">
//       {projects.map((project) => (
//         <div
//           key={project.projectID}
//           onClick={() => handleProjectClick(project)}
//           className="sideMenuProjectsItem"
//         >
//           <p>{project.projectName}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
