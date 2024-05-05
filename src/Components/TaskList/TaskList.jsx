import React, { useState } from "react";
import "./TaskList.css";

export default function TaskList({ addTask, tasks }) {
  // State to hold the data of the new task
  const [taskData, setTaskData] = useState({
    taskName: "",
    startDate: "",
    endDate: "",
    cost: "",
    owner: "",
    notes: "",
    subtasks: [],
  });

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new task to the task list
    addTask(taskData);
    // Reset taskData to placeholder values
    setTaskData({
      taskName: "",
      startDate: "",
      endDate: "",
      cost: "",
      owner: "",
      notes: "",
      subtasks: [],
    });
  };

  return (
    <>
      <table className="taskList">
        {/* Table headers */}
        <thead>
          <tr className="input-wrapper">
            <th>No.</th>
            <th>Task Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Cost</th>
            <th>Task Owner</th>
            <th>Notes</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task.taskName}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>{task.cost}</td>
              <td>{task.owner}</td>
              <td>{task.notes}</td>
            </tr>
          ))}
          {/* Form to add a new task */}
          <tr className="input-wrapper">
            <td></td>
            <td>
              <input
                type="text"
                name="taskName"
                className="newTaskName"
                value={taskData.taskName}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="startDate"
                className="newStartDate"
                value={taskData.startDate}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="endDate"
                className="newEndDate"
                value={taskData.endDate}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="cost"
                className="newCost"
                value={taskData.cost}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="owner"
                className="newOwner"
                value={taskData.owner}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="notes"
                className="newNotes"
                value={taskData.notes}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button type="submit" onClick={handleSubmit}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}