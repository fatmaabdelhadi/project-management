import axios from "axios";

export function isUserLoggedIn() {
  const storedUserData = localStorage.getItem("PMLogin");
  return !!storedUserData; // Convert to boolean
}

export function loginUser(data) {
  localStorage.setItem("PMLogin", JSON.stringify(data));
}

export function getUserData() {
  const storedUserData = localStorage.getItem("PMLogin");
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    return userData;
  } else {
    console.log("User data not found in local storage");
    return null;
  }
}

export function getUserID() {
  const storedUserData = localStorage.getItem("PMLogin");
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    return userData.user._id;
  } else {
    console.log("User data not found in local storage");
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem("PMLogin");
}

export async function getUserProjects(userid) {
  const url = `https://pm-platform-backend.onrender.com/api/projects/user/${userid}`;
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

export async function getUserTasks(userid) {
  const url = `https://pm-platform-backend.onrender.com/api/tasks/user/${userid}`;
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

// Example usage:
// const userProjects = await getUserProjects(userID);
// console.log(userProjects);
