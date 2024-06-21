import React, { useState, useEffect } from "react";
import "./Account.css";
import PriorityBadge, { TimeBadge, StatusBadge } from "./Badges";
import axios from "axios";
import {
  fixDateFormat,
  GetForiegnData,
  calculateDaysLeft,
} from "../../functions";
import { getUserTasks, getUserID } from "../../Services/UserModel";
export default function UserTasks() {
  const [tasks, setTasks] = useState([]);
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // GET Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userid = getUserID();

        const userTasks = await getUserTasks(userid);
        if (userTasks) setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    fetchTasks();
  });

  if (tasks.length === 0) {
    return (
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
    );
  }

  return (
    <div className="row">
      {tasks.map((task) => {
        return (
          <div className="userTasks">
            <div>
              <h4 class="bold">{task.taskName}</h4>
              <PriorityBadge value={task.priority}></PriorityBadge>
              <TimeBadge value={calculateDaysLeft(task.endDate)}></TimeBadge>
            </div>

            <div>
              <p>
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

            <div>{/* <p>{task.comments[0].text}</p> */}</div>
          </div>
        );
      })}
    </div>
  );
}
