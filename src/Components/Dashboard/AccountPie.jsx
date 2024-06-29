import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";
import axios from "axios";

// Sample task status colors
const taskStatusColors = {
  Late: "#C74857",
  "Not Started": "#FF7F00",
  "In Progress": "#82B83D",
  Completed: "#83BCCD",
  Others: "gray", // Default color for undefined statuses
};

export default function AssignedUsersPieChart({ tasks }) {
  const [usernames, setUsernames] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Function to fetch usernames for all assigned users
  async function fetchUsernames(assignedUsers) {
    const usernameMap = {};
    await Promise.all(
      assignedUsers.map(async (userId) => {
        if (!usernameMap[userId]) {
          const username = await getUsernameById(userId);
          usernameMap[userId] = username;
        }
      })
    );
    setUsernames(usernameMap);
  }

  // Function to aggregate tasks by assigned users and their statuses
  function aggregateTasksByUserAndStatus(tasks) {
    const userStatusCounts = {};

    tasks.forEach((task) => {
      task.assignedUsers.forEach((userId) => {
        if (!userStatusCounts[userId]) {
          userStatusCounts[userId] = {
            Late: 0,
            "Not Started": 0,
            "In Progress": 0,
            Completed: 0,
            Others: 0, // Initialize count for "Others"
          };
        }

        // Increment the count for the corresponding status or "Others"
        if (task.status in taskStatusColors) {
          userStatusCounts[userId][task.status]++;
        } else {
          userStatusCounts[userId]["Others"]++;
        }
      });
    });

    return Object.keys(userStatusCounts).map((userId) => ({
      userId,
      username: usernames[userId] || userId, // Use username if available, fallback to ID
      statusCounts: userStatusCounts[userId],
    }));
  }

  // Function to fetch username by ID
  async function getUsernameById(userId) {
    try {
      const response = await axios.get(
        `https://pm-platform-backend.onrender.com/api/users/find/${userId}`
      );
      return response.data.username; // Assuming your API returns username
    } catch (error) {
      console.error("Error fetching username:", error);
      return ""; // Return empty string or handle error as needed
    }
  }

  // Effect to fetch usernames when tasks change
  useEffect(() => {
    const assignedUsers = tasks.reduce((users, task) => {
      task.assignedUsers.forEach((userId) => {
        if (!users.includes(userId)) {
          users.push(userId);
        }
      });
      return users;
    }, []);

    fetchUsernames(assignedUsers);
  }, [tasks]);

  // Aggregate data for each user
  const aggregatedData = aggregateTasksByUserAndStatus(tasks);

  // Handle user selection change
  const handleUserSelectionChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  // Aggregate data for selected user
  const selectedUserData = aggregatedData.find(
    (userData) => userData.userId === selectedUserId
  );

  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      <div style={{ marginBottom: "20px" }}>
        <h3>Select User:</h3>
        <select
          value={selectedUserId || ""}
          onChange={handleUserSelectionChange}
        >
          <option value="">Select User</option>
          {aggregatedData.map((userData) => (
            <option key={userData.userId} value={userData.userId}>
              {userData.username}
            </option>
          ))}
        </select>
      </div>
      {selectedUserData && (
        <div style={{ marginBottom: "20px" }}>
          <h3>User: {selectedUserData.username}</h3>
          <PieChart
            height={200}
            series={[
              {
                data: Object.keys(selectedUserData.statusCounts).map(
                  (status) => ({
                    value: selectedUserData.statusCounts[status],
                    color:
                      taskStatusColors[status] || taskStatusColors["Others"],
                    label: status,
                  })
                ),
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                label: { visible: true, formatter: (name) => name },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
