import React, { useEffect, useState } from "react";
import axios from "axios";
import { fixDateFormat } from "../../functions";
import { getUserID } from "../../Services/UserModel";
import { getTaskByID } from "../../Services/TaskModel";
import "./TaskList.css";
import Multiselect from "multiselect-react-dropdown";

export default function TaskList({ addTask, tasks, projectID }) {
  // Empty Task
  const taskTemplate = {
    taskName: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0], // Set to current date
    endDate: new Date().toISOString().split("T")[0], // Set to current date
    project: projectID,
    taskCreator: getUserID(),
    assignedUsers: [],
    priority: "",
    dependency: [],
    cost: 0,
  };

  // State to hold the data of the new task
  const [taskData, setTaskData] = useState(taskTemplate);
  const [users, setUsers] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [selectedDependencies, setSelectedDependencies] = useState([]);
  const [selectedAssignedUsers, setSelectedAssignedUsers] = useState([]);

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

  // Fetch task dependencies when the component mounts
  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const taskDependencies = await Promise.all(
          tasks.map(async (task) => {
            const taskDeps = await Promise.all(
              task.dependency.map((depId) => getTaskByID(depId))
            );
            return { ...task, dependencyDetails: taskDeps };
          })
        );
        setDependencies(taskDependencies);
      } catch (error) {
        console.error("Error fetching task dependencies:", error);
      }
    };

    if (tasks.length > 0) {
      fetchDependencies();
    }
  }, [tasks]);

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setTaskData((taskData) => ({
      ...taskData,
      [name]: value,
    }));
  };

  // Function to handle multi-select changes for dependencies
  const handleDependenciesSelect = (selectedList, selectedItem) => {
    setSelectedDependencies(selectedList);
  };

  const handleDependenciesRemove = (selectedList, removedItem) => {
    setSelectedDependencies(selectedList);
  };

  // Function to handle multi-select changes for assigned users
  const handleAssignedUsersSelect = (selectedList, selectedItem) => {
    setSelectedAssignedUsers(selectedList);
  };

  const handleAssignedUsersRemove = (selectedList, removedItem) => {
    setSelectedAssignedUsers(selectedList);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (taskData.startDate && taskData.endDate && taskData.cost >= 0) {
      const taskToSubmit = {
        ...taskData,
        status: "Not Started", // Add default status if not present
        dependency: selectedDependencies.map((dep) => dep.id),
        assignedUsers: selectedAssignedUsers.map((user) => user.id),
      };

      console.log(taskToSubmit);
      const url = "https://pm-platform-backend.onrender.com/api/tasks/create/";

      try {
        const response = await axios.post(url, taskToSubmit);
        console.log(response.data);
        // Handle successful task creation here
        addTask(response.data); // Add the new task to the task list
        setTaskData(taskTemplate); // Reset the form
        setSelectedDependencies([]); // Clear selected dependencies
        setSelectedAssignedUsers([]); // Clear selected assigned users
        window.location.reload();
      } catch (err) {
        alert(err.message);
      }
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
            <th>Assigned Users</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => {
              const taskWithDependencies = dependencies.find(
                (depTask) => depTask._id === task._id
              );

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td>{fixDateFormat(task.startDate)}</td>
                  <td>{fixDateFormat(task.endDate)}</td>
                  <td>{task.priority}</td>
                  <td>{task.cost}EGP</td>
                  <td>
                    <ul>
                      {taskWithDependencies?.dependencyDetails?.length > 0 ? (
                        taskWithDependencies.dependencyDetails.map((dep) => (
                          <li key={dep._id}>{dep.taskName}</li>
                        ))
                      ) : (
                        <li>-</li>
                      )}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {task.assignedUsers?.length > 0 ? (
                        users
                          .filter((user) =>
                            task.assignedUsers.includes(user._id)
                          )
                          .map((user) => (
                            <li key={user._id}>{user.username}</li>
                          ))
                      ) : (
                        <li>-</li>
                      )}
                    </ul>
                  </td>
                </tr>
              );
            })
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
              <Multiselect
                options={tasks.map((task) => ({
                  name: task.taskName,
                  id: task._id,
                }))}
                selectedValues={selectedDependencies}
                onSelect={handleDependenciesSelect}
                onRemove={handleDependenciesRemove}
                displayValue="name"
              />
            </td>
            <td>
              <Multiselect
                options={users.map((user) => ({
                  username: user.username,
                  id: user._id,
                }))}
                selectedValues={selectedAssignedUsers}
                onSelect={handleAssignedUsersSelect}
                onRemove={handleAssignedUsersRemove}
                displayValue="username"
              />
            </td>
          </tr>
          <tr>
            <td colSpan="9" style={{ textAlign: "center" }}>
              <button onClick={handleSubmit}>Add Task</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
