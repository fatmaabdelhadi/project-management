import React, { useState, useEffect } from "react";
import "./Account.css";
import { TimeBadge } from "./Badges";
import { getUserProjects, getUserID } from "../../Services/UserModel";
import { useNavigate } from "react-router";
import axios from "axios";

export default function UserProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const id = getUserID();
        const userProjects = await getUserProjects(id);
        if (userProjects) {
          setProjects(userProjects);

          for (const project of userProjects) {
            if (project._id)
              await axios.put(
                `https://pm-platform-backend.onrender.com/api/projects/percentage/${project._id}`
              );
          }
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    fetchProjects();
  }, []); // Removed `projects` from the dependency array

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

  return (
    <div className="row">
      <h3 className="HomeLabel">My Projects</h3>
      <p className="bold" style={{ color: "var(--grey)" }}>
        Projects that you've created and can manage
      </p>
      {projects.map((project) => (
        <div
          className="userProjects"
          key={project._id}
          onClick={() => redirectToProject(project._id)}
        >
          <div className="content1">
            <h4 className="bold">{project.projectName}</h4>
            <TimeBadge value={calculateDaysLeft(project.endDate)}></TimeBadge>
          </div>
          <div className="progressBar">
            <div
              className="progressFill"
              style={{
                width: `${
                  project.progress ? project.progress.completionPercentage : 0
                }%`,
                borderRadius: "8px",
              }}
            ></div>
            <div className="progress"></div>
            <span className="progressPer bold">
              {project.progress ? project.progress.completionPercentage : 0}%
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
