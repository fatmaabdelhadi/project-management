import React, { useState, useEffect } from "react";
import "./Account.css";
import UserTasks from "./UserTasks";
import UserProjects from "./UserProjects";
import { getUserTasks, getUserID } from "../../Services/UserModel";

export default function AccountHome() {
  const [tasks, setTasks] = useState([]);
  const [priorityFilters, setPriorityFilters] = useState({
    Urgent: false,
    Important: false,
    Medium: false,
    Low: false,
  });
  const [statusFilters, setStatusFilters] = useState({
    Late: false,
    "Not Started": false,
    "In Progress": false,
    Completed: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(true); // State to toggle showing all tasks

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userid = getUserID();
        const userTasks = await getUserTasks(userid);
        if (userTasks) setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Filter tasks based on selected priority and status
  const filteredTasks = tasks.filter((task) => {
    // Check if task matches any selected priority filter
    const isPriorityMatch =
      Object.keys(priorityFilters).some(
        (priority) => priorityFilters[priority] && task.priority === priority
      ) || Object.values(priorityFilters).every((value) => !value);

    // Check if task matches any selected status filter
    const isStatusMatch =
      Object.keys(statusFilters).some(
        (status) => statusFilters[status] && task.status === status
      ) || Object.values(statusFilters).every((value) => !value);

    // Check if task matches search term (case insensitive)
    const isSearchMatch = task.taskName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (isPriorityMatch && isStatusMatch && isSearchMatch) || showAll;
  });

  const handlePriorityFilterChange = (priority) => {
    setPriorityFilters({
      ...priorityFilters,
      [priority]: !priorityFilters[priority],
    });
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilters({
      ...statusFilters,
      [status]: !statusFilters[status],
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApplyFilters = () => {
    setShowAll(false); // Set showAll to false to apply filters
  };

  const handleShowAll = () => {
    setShowAll(true);
    setPriorityFilters({
      Urgent: false,
      Important: false,
      Medium: false,
      Low: false,
    });
    setStatusFilters({
      Late: false,
      "Not Started": false,
      "In Progress": false,
      Completed: false,
    });
    setSearchTerm("");
  };

  return (
    <div>
      <div className="tasks">
        <h3>Your Tasks</h3>
      </div>
      <div className="filtersRow">
        <button
          className={`${showAll ? "allOn" : "allOff"}`}
          id="btnShowAll"
          onClick={handleShowAll}
        >
          All
        </button>
        <div className="filterP">
          <button className="btnDropFilterP">
            Filter By Priority
            {/* Replace with your dropdown icon */}
          </button>
          <form>
            {Object.keys(priorityFilters).map((priority) => (
              <div key={priority}>
                <input
                  type="checkbox"
                  checked={priorityFilters[priority]}
                  onChange={() => handlePriorityFilterChange(priority)}
                />
                <label>{priority}</label>
                <br />
              </div>
            ))}
          </form>
        </div>
        <div className="filterS">
          <button className="btnDropFilterS">
            Filter By Status
            {/* Replace with your dropdown icon */}
          </button>
          <form>
            {Object.keys(statusFilters).map((status) => (
              <div key={status}>
                <input
                  type="checkbox"
                  checked={statusFilters[status]}
                  onChange={() => handleStatusFilterChange(status)}
                />
                <label>{status}</label>
                <br />
              </div>
            ))}
          </form>
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
        <button
          className="btnApplyFilters"
          id="applyFilters"
          style={{ marginLeft: "10px" }}
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>

      <hr />

      <div className="userTasksLayout">
        <UserTasks displayedTasks={filteredTasks} />
      </div>
      <br />

      <div className="projects">
        <h3> Projects</h3>
        <div className="searchBar">
          <input type="text" className="gg-search" placeholder="Search" />
        </div>
        <hr />
        <UserProjects />
      </div>
    </div>
  );
}
