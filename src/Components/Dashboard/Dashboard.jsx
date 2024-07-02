import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Network from "./Network";
import { NavLink, useParams } from "react-router-dom";
import { findProjectByID } from "../../Services/ProjectModel";
import { getUsernameById } from "../../Services/UserModel";
import { getProjectTasks } from "../../Services/TaskModel";
import { PieChart } from "@mui/x-charts";
import AssignedUsersPieChart from "./AccountPie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ProjectLinks from "./ProjectLinks";

const taskStatusColors = {
  Late: "#C74857",
  "Not Started": "#FF7F00",
  "In Progress": "#82B83D",
  Completed: "#83BCCD",
  Others: "gray",
};

export default function Dashboard() {
  document.title = "Dashboard";
  const [projectManager, setProjectManager] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { projectID } = useParams(); // Extract 'projectID' from useParams

  useEffect(() => {
    const fetchProjectData = async (id) => {
      try {
        const projectData = await findProjectByID(id);
        setProjectData(projectData);

        const projectTasks = await getProjectTasks(id);
        setTasks(projectTasks);

        const managerName = await getUsernameById(projectData.projectManager);
        setProjectManager(managerName);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    if (projectID) {
      fetchProjectData(projectID);
    }
  }, [projectID]);

  useEffect(() => {
    if (projectData?.progress) {
      const progressFill = document.querySelector(".progressFill");
      const progressPer = document.querySelector(".progressPer");
      const progressValue = projectData.progress.completionPercentage || 0;

      // Start the width from 0%
      progressFill.style.width = "0%";

      // Force a reflow to ensure the transition works
      void progressFill.offsetHeight;

      // Set the final width after a delay
      setTimeout(() => {
        progressFill.style.width = `${progressValue}%`;
      }, 100);

      // Animate the progress percentage
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        if (counter > progressValue) {
          clearInterval(interval);
        } else {
          progressPer.innerText = `${counter}%`;
          // Change color when progress reaches 100%
          if (counter === 100) {
            progressPer.style.color = "white";
          }
        }
      }, 20);
    }
  }, [projectData?.progress]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <ProjectLinks />

      <h1 style={{ marginTop: "20px" }} className="bold">
        {projectData.projectName}
      </h1>
      <div className="d-flex gap-2">
        <AccountCircleIcon style={{ opacity: "0.5" }} />
        <p className="grey">Managed by </p>
        <p className="bold">{projectManager}</p>
      </div>
      <div className="d-flex gap-2">
        {projectData.description && (
          <>
            <InfoOutlinedIcon style={{ opacity: "0.7" }} />
            <p className="grey">Description </p>
            <p className="bold">{projectData.description}</p>
          </>
        )}
      </div>
      <div className="d-flex gap-2">
        {projectData.progress && (
          <>
            <ChecklistIcon style={{ opacity: "0.7" }} />
            <p className="grey">Progress </p>
            <p className="bold">
              {projectData.progress.completedTasks} /{" "}
              {projectData.progress.totalTasks} Tasks Done
            </p>
          </>
        )}
      </div>
      <div className="progressBar">
        {projectData.progress && (
          <>
            <div
              className="progressFill"
              style={{
                width: `${
                  projectData.progress
                    ? projectData.progress.completionPercentage
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
                  projectData.progress?.completionPercentage === 100
                    ? "white"
                    : "",
              }}
            >
              {projectData.progress
                ? projectData.progress.completionPercentage
                : 0}
              %
            </span>
          </>
        )}
      </div>
      <hr />
      <br />
      {tasks && tasks.length > 0 ? (
        <>
          <h3 className="bold grey">Project Network</h3>
          <Network
            projectID={projectID}
            border={"1px solid var(--grey)"}
            height={"500px"}
            width={"100%"}
          />
          <br></br>
          <div
            key="PieChart"
            style={{ minWidth: "200px", maxWidth: "700px" }}
            className="d-flex flex-column justify-content-center"
          >
            <h3 className="bold grey">Task Status</h3>
            <TaskStatusPie tasks={tasks} />
          </div>
          <br></br>
          <div>
            <h3 className="bold grey">Contributers Performance</h3>
            <AssignedUsersPieChart tasks={tasks} />
          </div>
          <br></br>
          <br></br>
          <br></br>
        </>
      ) : (
        <div>
          <p>No tasks yet, add one.</p>
          <NavLink to={`/create-tasks/${projectID}`}>
            <button>Add Task</button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

function TaskStatusPie({ tasks }) {
  const [taskStatusData, setTaskStatusData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const statusCounts = tasks.reduce((acc, task) => {
          const status = task.status || "Others"; // Default to "Others" if status is undefined
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        const processedData = Object.keys(statusCounts).map(
          (status, index) => ({
            id: index,
            value: statusCounts[status],
            label: status,
            color: taskStatusColors[status] || taskStatusColors["Others"], // Use specified colors or default to "Others" color
          })
        );

        setTaskStatusData(processedData);
      } catch (error) {
        console.error("Error fetching tasks data", error);
      }
    };

    fetchData();
  }, [tasks]);

  return (
    <div className="TaskStatusPie d-flex flex-column align-items-around">
      <TaskStatusPieChart data={taskStatusData} />
    </div>
  );
}

function TaskStatusPieChart({ data }) {
  return (
    <div>
      <PieChart
        series={[
          {
            data: data.map((d) => ({
              ...d,
              color: d.color,
            })),
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            label: { visible: true, formatter: (name) => name },
          },
        ]}
        height={200}
      />
    </div>
  );
}
