import axios from "axios";
import React, { useState, useEffect } from "react";

export const fixDateFormat = (date) => {
  // If date is NaN or null, return an empty string or placeholder
  if (isNaN(Date.parse(date)) || date === null) {
    return ""; // Or return a placeholder like "N/A"
  }

  // Parse the input date
  const parsedDate = new Date(date);

  // Extract day, month, and year components
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = parsedDate.getFullYear();

  // Format the date as "dd-mm-yyyy"
  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  return formattedDate;
};

// Calculate Days Left
export const calculateDaysLeft = (endDate) => {
  const currentDate = new Date();
  const dueDateTime = new Date(endDate).getTime();
  const differenceInMs = dueDateTime - currentDate.getTime();
  const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) return -1;
  return daysLeft;
};

// Get/post/.. any SINGLE attribute
export function GetForiegnData({ object, method, id, attr }) {
  // Destructure projectId from props
  const [projectName, setProjectName] = useState(null);
  // id = "6629441119d2130518b601a4";
  useEffect(() => {
    const getDataFromProject = async () => {
      // No need to modify projectId within the component
      const url = `https://pm-platform-backend.onrender.com/api/${object}/${method}/${id}`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        setProjectName(data[attr]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProjectName(null);
      }
    };

    getDataFromProject();
  }); // Include projectId in the dependency array

  return <>{projectName}</>;
}

export function getIdFromResponse(message) {
  const regex = /ID\s+(\w+)/;
  const match = message.match(regex);

  if (match) {
    const id = match[1];
    return id;
  } else {
    console.log("ID not found in message");
  }
}

export const getUserByID = async (API, userid) => {
  let users = "";
  await axios
    .get(`https://pm-platform-backend.onrender.com//api/users/find/${userid}`)
    .then((response) => {
      users = response.data;
    })
    .then(() => {
      const user = users.find((user) => user.id === user.userid);
      return user || null;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      return null;
    });
};

export const taskStatusColors = {
  Late: "#C74857",
  "Not Started": "#FF7F00",
  "In Progress": "#82B83D",
  Completed: "#83BCCD",
};

export const taskPriorityColors = {
  Urgent: "#C74857",
  Important: "#FF7F00",
  Medium: "#82B83D",
  Low: "#83BCCD",
};

export function getColorByStatus(status) {
  return taskStatusColors[status] || "gray";
}

// Function to get color by priority
export function getColorByPriority(priority) {
  return taskPriorityColors[priority] || "gray";
}

export function getColorByDaysLeft(daysLeft) {
  if (daysLeft <= 5) {
    return "#C74857";
  } else if (daysLeft <= 14) {
    return "#FF7F00";
  } else if (daysLeft <= 30) {
    return "#82B83D";
  } else {
    return "#83BCCD";
  }
}
