import React, { useState, useEffect } from "react";
import "./Account.css";
import { TimeBadge } from "./Badges";
import { getUserProjects, getUserID } from "../../Services/UserModel";
import { useParams } from "react-router";

export default function UserProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const id = getUserID();
        const userProjects = await getUserProjects(id);
        if (userProjects) {
          console.log(userProjects);
          setProjects(userProjects);
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    fetchProjects();
  }, []);

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

  return (
    <div className="row">
      {projects.map((project) => (
        <div className="userProjects" key={project._id}>
          <div className="content1">
            <h4 className="bold">{project.projectName}</h4>
            <TimeBadge value={calculateDaysLeft(project.endDate)}></TimeBadge>
          </div>
          <div className="progressBar">
            <div
              className="progressFill"
              style={{
                width: `${
                  project.progress ? project.progress.completion_percentage : 0
                }%`,
              }}
            ></div>
            <div className="progress"></div>
            <span className="progressPer">
              {project.progress ? project.progress.completion_percentage : 0}%
            </span>
          </div>
          <div className="settings">
            <a href={`/project-settings/${project._id}`} className="link">
              Settings
            </a>
            &nbsp;
            <a href={`/dashboard/${project._id}`} className="link">
              View Dashboard
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
