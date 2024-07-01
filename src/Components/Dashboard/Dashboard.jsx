import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Network from "./Network";
import { NavLink, useParams } from "react-router-dom";
import {
  getProjectID,
  getProjectData,
  findProjectByID,
} from "../../Services/ProjectModel";
import { getUsernameById } from "../../Services/UserModel";
import { getProjectTasks } from "../../Services/TaskModel";
import { PieChart } from "@mui/x-charts";
import AssignedUsersPieChart from "./AccountPie";
import { getUserData } from "../../Services/UserModel";

const taskStatusColors = {
  Late: "#C74857",
  "Not Started": "#FF7F00",
  "In Progress": "#82B83D",
  Completed: "#83BCCD",
  Others: "gray",
};

export default function Dashboard() {
  const [projectID, setProjectID] = useState(null);
  const [projectManager, setProjectManager] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { projectID: routeProjectID } = useParams(); // Extract 'projectID' from useParams

  useEffect(() => {
    const fetchCurrentProjectData = async () => {
      try {
        const storedProjectData = getProjectData();
        setProjectData(storedProjectData);

        const storedProjectID = getProjectID();
        setProjectID(storedProjectID);

        const projectTasks = await getProjectTasks(storedProjectID);
        setTasks(projectTasks);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    const fetchProjectData = async (id) => {
      try {
        const projectData = await findProjectByID(id);
        setProjectData(projectData);
        setProjectID(id);

        const projectTasks = await getProjectTasks(id);
        setTasks(projectTasks);

        const managerName = await getUsernameById(projectData.projectManager);
        setProjectManager(managerName);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    if (routeProjectID) {
      fetchProjectData(routeProjectID);
    } else {
      fetchCurrentProjectData();
    }
  }, [routeProjectID]); // Added projectID as a dependency

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>{projectData.projectName}</h2>
      <h6>{projectManager}</h6>

      <p>{projectData.description}</p>
      <hr />
      <br />
      {tasks && tasks.length > 0 ? (
        <>
          <h3 className="bold">Project Network</h3>
          <Network
            projectID={projectID}
            border={"1px solid var(--grey)"}
            height={"500px"}
            width={"100%"}
          />
          <div key="PieChart">
            <TaskStatusPie tasks={tasks} />
          </div>
          <div>
            <AssignedUsersPieChart tasks={tasks} />
          </div>
          <div className="createNavigationButtons">
            <NavLink
              to={`/create-tasks/${
                routeProjectID ? routeProjectID : getProjectID()
              }`}
              key="create-tasks"
            >
              <button>Prev</button>
            </NavLink>
          </div>
        </>
      ) : (
        <div>
          <p>No tasks yet, add one.</p>
          <NavLink
            to={`/create-tasks/${
              routeProjectID ? routeProjectID : getProjectID()
            }`}
          >
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
      <h3 className="statsHeading">Task Status</h3>
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
