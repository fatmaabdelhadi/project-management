import React, { useState, useEffect } from "react";
import "./Account.css";
import UserTasks from "./UserTasks";
import UserProjects from "./UserProjects";
import { getUserTasks, getUserID } from "../../Services/UserModel";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function AccountHome() {
  document.title = "Home"

  const [userId, setUserId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("current");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const id = getUserID() ? getUserID() : "";
        setUserId(id);
        const userTasks = await getUserTasks(id);
        if (userTasks) setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  // Filter tasks based on selected filters and search term
  const filteredTasks = tasks.filter((task) => {
    const isPriorityMatch = !priorityFilter || task.priority === priorityFilter;
    const isStatusMatch = !statusFilter || task.status === statusFilter;
    const isSearchMatch = task.taskName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    switch (filterType) {
      case "current":
        return task.status !== "Completed" && isSearchMatch;
      case "urgent":
        return task.priority === "Urgent" && isSearchMatch && task.status !== "Completed";
      case "completed":
        return task.status === "Completed" && isSearchMatch;
      case "all":
      default:
        return isSearchMatch;
    }
  });

  // Sort tasks: urgent tasks first and completed tasks last in the normal view
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (filterType === "all" || filterType === "current") {
      if (a.status === "Completed") return 1;
      if (b.status === "Completed") return -1;
      if (a.priority === "Urgent") return -1;
      if (b.priority === "Urgent") return 1;
    }
    return 0;
  });

  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    setPriorityFilter("");
    setStatusFilter("");
    setSearchTerm("");
  };

  return (
    <div>
      <div>
        <h3 className="HomeLabel">My Tasks</h3>
        <p className="bold" style={{ color: "var(--grey)" }}>
        Tasks that are assigned to you
      </p>
      </div>
      <div className="filtersRow d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="filterButtons">
          <button
            className={`${filterType === "all" ? "allOn" : "allOff"}`}
            id="btnShowAll"
            onClick={() => handleFilterTypeChange("all")}
          >
            All
          </button>
          <button
            className={`${
              filterType === "current" ? "currentOn" : "currentOff"
            }`}
            id="btnCurrentTasks"
            onClick={() => handleFilterTypeChange("current")}
          >
            Current Tasks
          </button>
          <button
            className={`${
              filterType === "completed" ? "completedOn" : "completedOff"
            }`}
            id="btnCompletedTasks"
            onClick={() => handleFilterTypeChange("completed")}
          >
            Completed
          </button>
          <button
            className={`${filterType === "urgent" ? "urgentOn" : "urgentOff"}`}
            id="btnUrgentTasks"
            onClick={() => handleFilterTypeChange("urgent")}
          >
            Urgent
          </button>
        </div>

        <div className="d-flex gap-3">
          
          {/* <FormControl>
            <InputLabel id="priority-filter-label">By Priority</InputLabel>
            <Select
              labelId="priority-filter-label"
              className="filterBySelection"
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
              className="filterBySelection"
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
          </FormControl> */}
        </div>
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

      <div className="userTasksLayout">
        <UserTasks displayedTasks={sortedTasks} />
      </div>
      <br />
      <hr />

      <div className="projects">
      <div className="row">

      <h3 className="HomeLabel">My Projects</h3>
      <p className="bold" style={{ color: "var(--grey)" }}>
        Projects that you've created and can manage
      </p>
        <UserProjects />
      </div>
      </div>

    </div>
  );
}
