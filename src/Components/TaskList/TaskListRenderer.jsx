import React from "react";
import TaskList from "./TaskList";
import { useState } from "react";
import axios from "axios";

export default function TaskListRenderer({ projectID }) {
  const [tasks, setTasks] = useState([]);
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  // GET Tasks
  console.log(projectID);
  const tasksUrl = `https://pm-platform-backend.onrender.com/api/tasks/project/${projectID}`;

  React.useEffect(() => {
    axios
      .get(tasksUrl)
      .then((res) => {
        const data = res.data;
        if (data) {
          console.log(data);
          const updatedTasks = data.map((task) => ({
            ...task,
            status: "Not Started", // Add default status if not present
          }));
          setTasks(updatedTasks);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [tasksUrl]);

  return <TaskList addTask={addTask} tasks={tasks} projectID={projectID} />;
}
