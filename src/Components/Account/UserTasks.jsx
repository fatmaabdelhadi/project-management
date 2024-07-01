import React, { useState, useEffect } from "react";
import "./Account.css";
import axios from "axios";
import PriorityBadge, { TimeBadge, StatusBadge } from "./Badges";
import {
  fixDateFormat,
  GetForiegnData,
  calculateDaysLeft,
} from "../../functions";
import { useNavigate } from "react-router";
import { getUserTasks, getUserID } from "../../Services/UserModel";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Tooltip } from "@mui/material";

export default function UserTasks({ displayedTasks }) {
  const [tasks, setTasks] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(displayedTasks);
  }, [displayedTasks]);

  const redirectToProject = (projectId) => {
    navigate(`/dashboard/${projectId}`);
  };

  const handleMouseEnter = (taskId) => {
    setHoveredTask(taskId);
  };

  const handleMouseLeave = () => {
    setHoveredTask(null);
  };

  const handleCompleteTask = async (currentStatus, taskId, projectId) => {
    console.log(taskId);
    try {
      // Update the task status to "Completed"
      if (currentStatus !== "Completed") {
        await axios.put(
          `https://pm-platform-backend.onrender.com/api/tasks/update/${taskId}`,
          { status: "Completed" }
        );
      } else {
        alert("Task Already Completed");
      }

      await axios
        .put(
          `https://pm-platform-backend.onrender.com/api/projects/percentage/${projectId}`
        )
        .then(() => {
          window.location.reload();
        });

      // Reload or update state to reflect changes without full page reload
      // You can call a function to refresh the state or use a state update here instead of window.location.reload()
      // refreshProjectData(); // Example function to refresh project data
    } catch (error) {
      alert("Error completing task");
      console.error("Error completing task:", error);
    }
  };

  return (
    <div className="row">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="userTasks"
          onMouseEnter={() => handleMouseEnter(task.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => redirectToProject(task.project)}
        >
          {hoveredTask === task.id && task.status !== "Completed" && (
            <Tooltip title="Mark as Completed">
              <button
                className="complete-task-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent redirect
                  handleCompleteTask(task.status, task._id, task.project);
                }}
              >
                <CheckIcon />
              </button>
            </Tooltip>
          )}
          {task.status === "Completed" && (
            <DoneAllIcon className="completed-task-icon" />
          )}
          <div className="d-flex flex-column">
            <h4 className="bold">{task.taskName}</h4>
            <div className="d-flex gap-2 flex-wrap">
              {task.status !== "Completed" && task.priority && (
                <PriorityBadge value={task.priority} />
              )}
              {task.status !== "Completed" && (
                <TimeBadge
                  taskId={task.id}
                  value={calculateDaysLeft(task.endDate)}
                  isCompleted={task.status === "Completed" ? true : false}
                />
              )}
            </div>
          </div>
          <div>
            <p className="d-flex">
              <p>Project &nbsp;</p>
              <span className="bold grey">
                <GetForiegnData
                  object={"projects"}
                  method={"find"}
                  id={task.project}
                  attr={"projectName"}
                />
              </span>
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              <StatusBadge value={task.status} />
            </p>
            <p>{fixDateFormat(task.endDate)}</p>
          </div>
          <hr />
          <div className="d-flex gap-2">
            {task.description && (
              <>
                <InfoOutlinedIcon />
                <p>{task.description}</p>
              </>
            )}
          </div>

          <div className="task-overlay" />
        </div>
      ))}
    </div>
  );
}
