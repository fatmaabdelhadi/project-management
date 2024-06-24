import React, { useEffect, useState } from "react";
import axios from "axios";
import { fixDateFormat } from "../../functions";
import { getUserID } from "../../Services/UserModel";
import "./TaskList.css";

export default function TaskList({ addTask, tasks, projectID }) {
  // Empty Task
  const taskTemplate = {
    taskName: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    project: projectID,
    taskCreator: getUserID(),
    assignedUsers: [],
    priority: "",
    dependency: [],
    cost: 0,
    contributers: [],
    // comments: "",
  };

  // State to hold the data of the new task
  const [taskData, setTaskData] = useState(taskTemplate);
  const [users, setUsers] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [selectedContributors, setSelectedContributors] = useState([]);
  const [dependency, setDependeny] = useState([]);
  const [contributers, setContributers] = useState([]);
  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://pm-platform-backend.onrender.com/api/users/all"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setTaskData((taskData) => ({
      ...taskData,
      [name]: value,
    }));
  };

  // Function to handle multi-select changes for dependencies
  const handleDependenciesChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setDependencies(selectedOptions);
  };

  // Function to handle multi-select changes for contributors
  const handleContributorsChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedContributors(selectedOptions);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskData.startDate && taskData.endDate && taskData.cost >= 0) {
      console.log(taskData);
      const url = "https://pm-platform-backend.onrender.com/api/tasks/create/";
      axios
        .post(url, taskData)
        .then((response) => {
          console.log(response.data);
          // Handle successful task creation here
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Start Date, End Date, and Cost must be provided and non-negative");
    }
  };

  return (
    <div className="task-list-container">
      <table className="task-list-table">
        {/* Table headers */}
        <thead>
          <tr className="table-header">
            <th>No.</th>
            <th>
              Task Name<span>*</span>
            </th>
            <th>
              Description<span>*</span>
            </th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Priority</th>
            <th>Cost</th>
            <th>Dependencies</th>
            <th>Contributors</th>
            {/* <th>Comments</th> */}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>{task.priority}</td>
                <td>{task.cost}</td>
                <td>
                  {task.dependency.length > 0
                    ? task.dependency.join(", ")
                    : "-"}
                </td>
                <td>
                  {task.contributers > 0 ? task.contributers.join(", ") : "-"}
                </td>
                {/* <td>{task.comments}</td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No tasks available</td>
            </tr>
          )}
          {/* Form to add a new task */}
          <tr>
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
                type="text"
                name="description"
                className="newDescription"
                required
                value={taskData.description}
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
                className="newEndDate"
                required
                value={taskData.endDate}
                onChange={handleChange}
              />
            </td>
            <td>
              <select
                name="priority"
                className="newPriority"
                required
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="Important">Important</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                name="cost"
                className="newCost"
                required
                value={taskData.cost}
                onChange={handleChange}
                min="0"
              />
            </td>
            <td>
              <select
                name="dependency"
                className="newDependencies"
                multiple
                value={dependencies}
                onChange={handleDependenciesChange}
              >
                {tasks.map((task, index) => (
                  <option key={index} value={task.taskName}>
                    {task.taskName}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                name="contributers"
                className="newContributers"
                multiple
                value={selectedContributors}
                onChange={handleContributorsChange}
              >
                {users.map((user) => (
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </td>
            {/* <td>
              <input
                type="text"
                name="comments"
                className="newComments"
                value={taskData.comments}
                onChange={handleChange}
              />
            </td> */}
          </tr>
          <tr>
            <td colSpan="10" style={{ textAlign: "center" }}>
              <button onClick={handleSubmit}>Add Task</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
