import React, { useState, useEffect } from "react";
import "./Account.css";
import PriorityBadge, { TimeBadge, StatusBadge } from "./Badges";
import {
  fixDateFormat,
  GetForiegnData,
  calculateDaysLeft,
} from "../../functions";
import { getUserTasks, getUserID } from "../../Services/UserModel";

export default function UserTasks({ displayedTasks }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks for the logged-in user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userid = getUserID();
        const userTasks = await getUserTasks(userid);
        if (userTasks) {
          setTasks(userTasks);
        }
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchTasks();
  }, []); // Run once on component mount

  const redirectToProject = (projectId) => {};
  // Display message when no tasks are available
  if (tasks.length === 0) {
    return (
      <div className="userTasks">
        <h4 style={{ margin: "20px" }}>
          Congrats, you're out of tasks!{" "}
          <a
            href="https://www.retrogames.cc/genesis-games/sonic-the-hedgehog-3-europe.html"
            className="bold"
            style={{ color: "var(--teal)", fontSize: "20px" }}
          >
            Take some rest
          </a>
        </h4>
      </div>
    );
  }

  // Render tasks when available
  return (
    <div className="row">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="userTasks"
          onClick={redirectToProject(task.project)}
        >
          <div className="d-flex flex-column">
            <h4 className="bold">{task.taskName}</h4>
            <div className="d-flex gap-2 flex-wrap">
              {task.priority && <PriorityBadge value={task.priority} />}
              <TimeBadge value={calculateDaysLeft(task.endDate)} />
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
          <div>
            <p>{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
