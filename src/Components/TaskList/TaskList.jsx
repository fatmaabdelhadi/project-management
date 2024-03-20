import React, { useState } from "react";
import "./TaskList.css";

export default function TaskList({ addTask, tasks }) {
  const [taskName, setTaskName] = useState("");
  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask(taskName);
      setTaskName("");
    } else if (event.key === "`") {
      // Tab isnt working idk why T^T
      event.preventDefault();
      addTask(taskName, true);
      setTaskName("");
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Task Name</th>
            <th>Start Date</th>
            <th>Estimated Time</th>
            <th>Cost</th>
            <th>Task Owner</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task.name}</td>
              <td>{task.startDate}</td>
              <td>{task.estimatedTime}</td>
              <td>{task.cost}</td>
              <td>{task.owner}</td>
              <td>{task.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="text"
        className="newTaskName"
        value={taskName}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </>
  );
}
