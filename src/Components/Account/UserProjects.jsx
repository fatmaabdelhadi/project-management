import React, { useState, useEffect } from "react";
import "./Account.css";
import { TimeBadge } from "./Badges";
import { getUserProjects, getUserID } from "../../Services/UserModel";
import { useNavigate } from "react-router";
import axios from "axios";
import { useParams } from "react-router";

export default function UserProjects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("current");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const id = getUserID();
        const userProjects = await getUserProjects(id);
        if (userProjects) {
          setProjects(userProjects);

          for (const project of userProjects) {
            if (project._id) {
              await axios.put(
                `https://pm-platform-backend.onrender.com/api/projects/percentage/${project._id}`
              );
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const isSearchMatch = project.projectName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filterType === "all") {
      return isSearchMatch;
    }

    if (
      !project.progress ||
      project.progress.completionPercentage === undefined
    ) {
      return false;
    }

    switch (filterType) {
      case "current":
        return (
          project.progress.completionPercentage > 0 &&
          project.progress.completionPercentage < 100 &&
          isSearchMatch
        );
      case "not started":
        return project.progress.completionPercentage === 0 && isSearchMatch;
      case "completed":
        return project.progress.completionPercentage === 100 && isSearchMatch;
      default:
        return false;
    }
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (filterType === "all" || filterType === "current") {
      if (a.status === "Completed") return 1;
      if (b.status === "Completed") return -1;
    }
    return 0;
  });

  const redirectToProject = (projectId) => {
    navigate(`/dashboard/${projectId}`);
  };

  const calculateDaysLeft = (dueDate) => {
    const currentDate = new Date();
    const dueDateTime = new Date(dueDate).getTime();
    const differenceInMs = dueDateTime - currentDate.getTime();
    const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return daysLeft < 0 ? 0 : daysLeft;
  };

  if (projects.length === 0) {
    return <h4>You don't have any projects.</h4>;
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    setSearchTerm("");
  };

  return (
    <div className="row">
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
            Current Projects
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
            className={`${
              filterType === "not started" ? "notStartedOn" : "notStartedOff"
            }`}
            id="btnNotStartedTasks"
            onClick={() => handleFilterTypeChange("not started")}
          >
            Not Started
          </button>
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

      {sortedProjects.map((project) => (
        <div
          className="userProjects"
          key={project._id}
          onClick={() => redirectToProject(project._id)}
        >
          <div className="content1">
            <h4 className="bold">{project.projectName}</h4>
            <TimeBadge value={calculateDaysLeft(project.endDate)} />
          </div>
          <div className="progressBar">
            {project.progress && (
              <>
                <div
                  className="progressFill"
                  style={{
                    width: `${
                      project.progress
                        ? project.progress.completionPercentage
                        : 0
                    }%`,
                    borderRadius: "8px",
                  }}
                ></div>
                <div className="progress"></div>
                <span
                  className="progressPer bold"
                  style={{
                    color:
                      project.progress?.completionPercentage === 100
                        ? "white"
                        : "",
                  }}
                >
                  {project.progress ? project.progress.completionPercentage : 0}
                  %
                </span>
              </>
            )}
          </div>
          {/* <div className="settings">
            <a href={`/project-settings/${project._id}`} className="link">
              Settings
            </a>
            &nbsp;
            <a href={`/dashboard/${project._id}`} className="link">
              View Dashboard
            </a>
          </div> */}
        </div>
      ))}
    </div>
  );
}
