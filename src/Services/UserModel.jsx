import axios from "axios";
const storedUserData = localStorage.getItem("PMLogin");

export function isUserLoggedIn() {
  if (storedUserData) {
    return true;
  } else {
    return false;
  }
}

export function loginUser(data) {
  localStorage.setItem("PMLogin", JSON.stringify(data));
}

export function getUserData() {
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    return userData;
  } else {
    console.log("User data not found in local storage");
  }
}

export function getUserID() {
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    return userData.user._id;
  } else {
    console.log("User data not found in local storage");
  }
}

export function logoutUser() {
  if (localStorage.getItem("PMLogin")) {
    localStorage.removeItem("PMLogin");
  }
}

export async function getUserProjects() {
  const userid = getUserID();
  const url = `https://pm-platform-backend.onrender.com/api/projects/user/${userid}`;

  try {
    const response = await axios.get(url);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
// this is how to use it:
//          const userProjects = await getUserProjects();
//          console.log(userProjects);

export async function getUserTasks() {
  const userid = getUserID();
  const url = `https://pm-platform-backend.onrender.com//api/tasks/user/${userid}`;

  try {
    const response = await axios.get(url);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
// this is how to use it:
//          const userProjects = await getUserProjects();
//          console.log(userProjects);
