import React, { useState, useEffect } from "react"
import "./Account.css"
import UserTasks from "./UserTasks"
import UserProjects from "./UserProjects"
import { getUserTasks, getUserID } from "../../Services/UserModel"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export default function AccountHome() {
  const [userId, setUserId] = useState("")
  const [tasks, setTasks] = useState([])
  const [priorityFilter, setPriorityFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [showCompleted, setShowCompleted] = useState(false)
  const [showUrgent, setShowUrgent] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const id = getUserID() ? getUserID() : "";
        setUserId(id);
        const userTasks = await getUserTasks(userId);
        if (userTasks) setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  // Filter tasks based on selected priority, status, and search term
  const filteredTasks = tasks.filter((task) => {
    const isPriorityMatch = !priorityFilter || task.priority === priorityFilter;
    const isStatusMatch = !statusFilter || task.status === statusFilter;
    const isSearchMatch = task.taskName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (showCompleted) {
      return task.status === "Completed" && isSearchMatch;
    } else if (showUrgent) {
      return task.priority === "Urgent" && isSearchMatch;
    } else if (showAll) {
      return isSearchMatch;
    } else {
      return isPriorityMatch && isStatusMatch && isSearchMatch;
    }
  });

  // Sort tasks: urgent tasks first and completed tasks last in the normal view
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (showAll) {
      if (a.status === "Completed") return 1;
      if (b.status === "Completed") return -1;
      if (a.priority === "Urgent") return -1;
      if (b.priority === "Urgent") return 1;
    }
    return 0;
  });

  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
    setShowAll(false);
    setShowCompleted(false);
    setShowUrgent(false);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setShowAll(false);
    setShowCompleted(false);
    setShowUrgent(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowAll = () => {
    setShowAll(true);
    setShowCompleted(false);
    setShowUrgent(false);

    setPriorityFilter("");
    setStatusFilter("");
    setSearchTerm("");
  };

  const handleShowCompleted = () => {
    setShowCompleted(true);
    setShowAll(false);
    setShowUrgent(false);
    setPriorityFilter("");
    setStatusFilter("");
    setSearchTerm("");
  };

  const handleShowUrgent = () => {
    setShowUrgent(true);
    setShowAll(false);
    setShowCompleted(false);
    setPriorityFilter("");
    setStatusFilter("");
    setSearchTerm("");
  };

  return (
    <div>
      <div className="tasks">
        <h3>Your Tasks</h3>
      </div>
      <div className="filtersRow d-flex align-items-center justify-content-between gap-3">
        <div>
          <button
            className={`${showAll ? "allOn" : "allOff"}`}
            id="btnShowAll"
            onClick={handleShowAll}
          >
            All
          </button>
          <button
            className={`${showCompleted ? "completedOn" : "completedOff"}`}
            id="btnCompletedTasks"
            onClick={handleShowCompleted}
          >
            Completed
          </button>
          <button
            className={`${showUrgent ? "urgentOn" : "urgentOff"}`}
            id="btnUrgentTasks"
            onClick={handleShowUrgent}
          >
            Urgent
          </button>
        </div>

        <FormControl>
          <InputLabel id="priority-filter-label">By Priority</InputLabel>
          <Select
            labelId="priority-filter-label"
            id="priority-filter"
            value={priorityFilter}
            onChange={handlePriorityFilterChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
            <MenuItem value="Important">Important</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="status-filter-label">By Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Late">Late</MenuItem>
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <div className="searchBar">
          <input
            type="text"
            className="gg-search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <hr />

      <div className="userTasksLayout">
        <UserTasks displayedTasks={sortedTasks} />
      </div>
      <br />

      <div className="projects">
        <h3>Projects</h3>
        <hr />
        <UserProjects />
      </div>
    </div>
  );
}