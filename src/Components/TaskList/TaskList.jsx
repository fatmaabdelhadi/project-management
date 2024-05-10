import React, { useEffect, useState } from "react";
import "./TaskList.css";
import axios from "axios";

export default function TaskList({ addTask, tasks }) {
  // State to hold the data of the new task
  const [taskData, setTaskData] = useState({
      task_name: "",
      // create_at: "",
      // due_date: "",
      // assigned_user: "",
      // comments: "",
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
      task_name: "",
      create_at: "",
      due_date: "",
      assigned_user: "",
      comments: "",
    });

    const url = 'https://pm-platform-backend.onrender.com/api/tasks/create/'
    axios.post(url, taskData)
  
  }




  return (
    <>
      <table className="taskList">
        {/* Table headers */}
        <thead>
          <tr className="input-wrapper">
            <th>No.</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Contributer</th>
            <th>Start Date?????</th>
            <th>Due Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task.task_name}</td>
              <td>{task.description}</td>
              <td>{task.assignedUser}</td>
              <td>{task.due_date}</td>
              <td>{task.cost}</td>
              <td>{task.owner}</td>
              <td>{task.comments[0].text}</td>
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
                value={taskData.task_name}
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