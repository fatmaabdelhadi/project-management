import axios from "axios";

const currentStoredProject = localStorage.getItem("currentProject");

export function setProjectData(project) {
  try {
    localStorage.setItem("currentProject", JSON.stringify(project));
  } catch (error) {
    console.error("Error storing project data:", error);
    // Handle error appropriately
  }
}
export function getProjectData() {
  if (currentStoredProject) {
    const projectData = JSON.parse(currentStoredProject);
    return projectData;
  } else {
    console.log("Project data not found in local storage");
  }
}

export function getProjectID() {
  if (currentStoredProject) {
    const projectData = JSON.parse(currentStoredProject);
    return projectData.ProjectID;
  } else {
    console.log("Project data not found in local storage");
  }
}

export const findProjectByID = async (id) => {
  try {
    const response = await axios.get(
      `https://pm-platform-backend.onrender.com/api/projects/find/${id}`
    );
    return response.data; // Assuming the response data contains the project details
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error; // Propagate the error for handling in the calling function
  }
};
