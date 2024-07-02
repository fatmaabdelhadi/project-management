import axios from "axios";

// export function setProjectData(project) {
//   try {
//     localStorage.setItem("currentProject", JSON.stringify(project));
//   } catch (error) {
//     console.error("Error storing project data:", error);
//   }
// }

// export function getProjectData() {
//   const currentStoredProject = localStorage.getItem("currentProject");
//   if (currentStoredProject) {
//     return JSON.parse(currentStoredProject);
//   } else {
//     console.log("Project data not found in local storage");
//     return null;
//   }
// }

export function getProjectID() {
  const currentStoredProject = localStorage.getItem("currentProject");
  if (currentStoredProject) {
    const projectData = JSON.parse(currentStoredProject);
    return projectData._id; // Fixed property name
  } else {
    console.log("Project data not found in local storage");
    return null;
  }
}

export const findProjectByID = async (id) => {
  try {
    const response = await axios.get(
      `https://pm-platform-backend.onrender.com/api/projects/find/${id}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle 404 error silently
      return null;
    } else {
      console.error("Error fetching project by ID:", error);
      throw error;
    }
  }
};
