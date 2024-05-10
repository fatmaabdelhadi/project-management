import React, { useEffect, useState } from "react";
import "./TaskList.css";
import axios from "axios";

export default function TaskList({ addTask, tasks }) {
  // Empty Task
  const taskTemplate = {
    "taskName": "",
    "startDate": "",
    "endDate": "",
    // "dependency": ""
  }
  // State to hold the data of the new task
  const [taskData, setTaskData] = useState(taskTemplate);

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskData((taskData) => ({
      ...taskData,
      [name]: value,
    }));
  };



  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new task to the task list
    // addTask(taskData);
    // Reset taskData to placeholder values
    // setTaskData(taskTemplate);

    const url = 'http://localhost:5000/api/tasks/create/'
    axios.post(url, taskData)
      .catch((err) => {
        alert(err.message)
    })
  
  }

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
            <th>Dependency</th>
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
              {/* <td>{task.dependency}</td> */}
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
                type="date"
                name="startDate"
                className="newStartDate"
                value={taskData.startDate}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="endDate"
                className="newEndDate"
                value={taskData.endDate}
                onChange={handleChange}
              />
             </td>
            {/*<td>
              <input
                type="text"
                name="cost"
                className="newCost"
                value={taskData.cost}
                onChange={handleChange}
              />
            </td> */}
            {/* <td>
              <input
                type="text"
                name="owner"
                className="newOwner"
                value={taskData.owner}
                onChange={handleChange}
              />
            </td> */}
            {/* <td>
              <input
                type="text"
                name="dependency"
                className="newNotes"
                value={taskData.dependency}
                onChange={handleChange}
              />
            </td> */}
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