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

export default function UserTasks({ displayedTasks }) {
  const [tasks, setTasks] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const navigate = useNavigate();

  // Fetch tasks for the logged-in user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userid = await getUserID();
        const userTasks = await getUserTasks(userid);
        if (userTasks) {
          setTasks(userTasks);
        }
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const updateCompletedTaskStatus = async (taskId) => {
    try {
      await axios.put(
        `https://pm-platform-backend.onrender.com/api/tasks/update/${taskId}`,
        { status: "Completed" }
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const redirectToProject = (projectId) => {
    navigate(`/dashboard/${projectId}`);
  };

  const handleMouseEnter = (taskId) => {
    setHoveredTask(taskId);
  };

  const handleMouseLeave = () => {
    setHoveredTask(null);
  };

  const handleCompleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.put(
        `https://pm-platform-backend.onrender.com/api/tasks/update/${taskId}`,
        { status: "Completed" }
      );
      window.location.reload();
    } catch (error) {
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
            <button
              className="complete-task-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent redirect
                handleCompleteTask(task._id);
              }}
            >
              <CheckIcon />
            </button>
          )}
          {task.status === "Completed" && (
            <DoneAllIcon className="completed-task-icon" />
          )}
          <div className="d-flex flex-column">
            <h4 className="bold">{task.taskName}</h4>
            <div className="d-flex gap-2 flex-wrap">
              {task.priority && <PriorityBadge value={task.priority} />}
              <TimeBadge
                taskId={task.id}
                value={calculateDaysLeft(task.endDate)}
              />
            </div>
          </div>
          <div>
            <p className="d-flex">
              <p className="bold">Project: </p>
              <GetForiegnData
                object={"projects"}
                method={"find"}
                id={task.project}
                attr={"projectName"}
              />
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
