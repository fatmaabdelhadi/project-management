import React, { useState, useEffect } from "react";
import "./Account.css";
import { TimeBadge } from "./Badges";
import axios from "axios";
import { getCUserProjects, getUserProjects } from "../../Services/UserModel";
import { getUserID } from "../../Services/UserModel";

export default function UserProjects() {
  const [projects, setProjects] = useState([]);
  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };
  // GET Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userProjects = await getUserProjects();
        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    fetchProjects();
  });
  const calculateDaysLeft = (dueDate) => {
    const currentDate = new Date();
    const dueDateTime = new Date(dueDate).getTime();
    const differenceInMs = dueDateTime - currentDate.getTime();
    const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 0;
    return daysLeft;
  };

  if (projects.length === 0) {
    return <h4>You don't have any projects.</h4>;
  }
  return (
    <div className="row">
      {projects.map((project) => {
        return (
          <div className="userProjects">
            <div className="content1">
              <h4 class="bold">{project.projectName}</h4>
              <TimeBadge value={calculateDaysLeft(project.endDate)}></TimeBadge>
            </div>
            <div>
              <div className="progressBar">
                <div
                  className="progressFill"
                  style={{
                    width: `${
                      project.progress
                        ? project.progress.completion_percentage
                        : 0
                    }%`,
                  }}
                ></div>
                <div className="progress"></div>
                <span class="progressPer">
                  {project.progress
                    ? project.progress.completion_percentage
                    : 0}
                  %
                </span>
              </div>
            </div>
            {/* <div className ="settings"> <h4 className="bold">Settings  View Dashboard</h4></div> */}
            <div className="settings">
              {" "}
              <a href="/project-settings" className="link">
                Settings
              </a>{" "}
              &nbsp;
              <a href="/dashboard" className="link">
                View Dashboard
              </a>
            </div>
          </div>
          // </div>
        );
      })}
      <div className="userProjects">
        <div className="projectName">
          <h4 className="bold">Smart Home</h4>
          <TimeBadge></TimeBadge>
        </div>

        {/* progressBar */}
        <div className="progress">
          <div className="progressFill"></div>
          <span class="progressPer">50%</span>
        </div>
        <br />
        <div className="linkContainer">
          <div className="settings">
            {" "}
            <a href="/project-settings" className="link">
              Settings
            </a>{" "}
            &nbsp;
            <a href="/dashboard" className="link">
              View Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
