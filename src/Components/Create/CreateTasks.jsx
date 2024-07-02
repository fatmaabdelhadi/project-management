// import React, { useEffect, useState } from "react";
// import TaskListRenderer from "../TaskList/TaskListRenderer";
// import { NavLink, useParams } from "react-router-dom";
// import { findProjectByID } from "../../Services/ProjectModel";

// export default function CreateTasks() {
//   const { projectID } = useParams();
//   const [projectData, setProjectDataState] = useState(null);

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const data = await findProjectByID(projectID);
//         setProjectDataState(data);
//       } catch (error) {
//         console.error("Error fetching project data:", error);
//       }
//     };

//     fetchProjectData();
//   }, [projectID]);

//   const handleDoneClick = () => {
//     if (projectData) {
//       setProjectData(projectData);

//       // Redirect to dashboard after setting project data
//       window.location.href = `/dashboard/`;
//     }
//   };

//   return (
//     <div>
//       <TaskListRenderer projectID={projectID}></TaskListRenderer>
//       <div className="createNavigationButtons">
//         <NavLink to="/create-project" key="create-project">
//           <button>Prev</button>
//         </NavLink>
//         <button onClick={handleDoneClick} disabled={!projectData}>
//           Done
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function CreateTasks() {
  return <div>CreateTasks</div>;
}
