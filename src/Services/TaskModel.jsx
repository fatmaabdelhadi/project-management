import axios from "axios";

export async function getProjectTasks(projectId) {
  const url = `https://pm-platform-backend.onrender.com/api/tasks/project/${projectId}`;
  try {
    const response = await axios.get(url);
    return response.data; // Return the data from the response
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Do not log anything if the error status is 404
      return null; // or handle 404 error as needed
    } else {
      console.error("Error fetching data:", error);
    }
  }
}
