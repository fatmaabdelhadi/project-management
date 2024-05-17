import React, { useEffect, useState } from "react";
import "./TaskList.css";
import axios from "axios";
import { fixDateFormat } from "../../functions";

export default function TaskList({ addTask, tasks, projectID }) {
  // Empty Task
  const taskTemplate = {
    "taskName": "",
    "startDate": "",
    "endDate": "",
    "project": projectID,
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
    if (taskData.startDate < taskData.endDate) {
      const url = 'https://pm-platform-backend.onrender.com/api/tasks/create/'
      axios.post(url, taskData)
        .then(console.log(taskData))
        .catch((err) => {
          alert(err.message)
        })
    } else {
      alert("Start date must be later than end date")
    }
  }


  return (
    <>
      <table className="taskList">
        {/* Table headers */}
        <thead>
          <tr className="input-wrapper">
            <th>No.</th>
            <th>Task Name<span>*</span></th>
            <th>Start Date<span>*</span></th>
            <th>End Date<span>*</span></th>
            <th>Dependency</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task.taskName}</td>
              <td>{fixDateFormat(task.startDate)}</td>
              <td>{fixDateFormat(task.endDate)}</td>
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
                required
                value={taskData.taskName}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="startDate"
                className="newStartDate"
                required
                value={taskData.startDate}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="endDate"
                required
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
              <input type="submit" onClick={handleSubmit} value="Add"
                
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}