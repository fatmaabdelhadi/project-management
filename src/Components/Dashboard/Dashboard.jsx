import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Network from "./Network";
import { NavLink, useParams } from "react-router-dom";
import {
  getProjectID,
  getProjectData,
  findProjectByID,
} from "../../Services/ProjectModel";
import { getProjectTasks } from "../../Services/TaskModel";
import { PieChart, BarChart } from "@mui/x-charts";

export default function Dashboard() {
  const [project_ID, setProjectID] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { projectID } = useParams(); // Extract 'projectID' from useParams

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
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    if (projectID) {
      fetchProjectData(projectID);
    } else {
      fetchCurrentProjectData();
    }
  }, [projectID]); // Added projectID as a dependency

  if (!projectData) {
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    <div className="dashboard">
      <h2>{projectData.projectName}</h2>
      <p>{projectData.description}</p>
      <hr />
      <br />
      {tasks && tasks.length > 0 ? (
        <>
          <h3 className="bold">Project Network</h3>
          <Network
            projectID={project_ID}
            border={"1px solid var(--grey)"}
            height={"500px"}
            width={"100%"}
          />
          <div key="PieChart">
            <h3 className="bold">Task Status</h3>
            <TaskStatusPieChart tasks={tasks} />
          </div>
          <div key="StackedBar">
            <h3 className="bold">Task Priority</h3>
            <TaskPriorityBarChart tasks={tasks} />
          </div>
          <div className="createNavigationButtons">
            <NavLink
              to={`/create-tasks/${projectID ? projectID : getProjectID()}`}
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
            to={`/create-tasks/${projectID ? projectID : getProjectID()}`}
          >
            <button>Add Task</button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

const taskStatusColors = {
  Late: "rgb(255, 99, 132)",
  "Not Started": "rgb(255, 159, 64)",
  "In Progress": "rgb(255, 205, 86)",
  Completed: "rgb(75, 192, 192)",
};

const TaskPriorityBarChart = ({ tasks }) => {
  const taskPriorityData = tasks.reduce((acc, task) => {
    const priority = task.priority;
    const status = task.status;

    if (!acc[priority]) {
      acc[priority] = {
        Late: 0,
        "Not Started": 0,
        "In Progress": 0,
        Completed: 0,
      };
    }

    if (acc[priority][status] !== undefined) {
      acc[priority][status]++;
    } else {
      acc[priority][status] = 1;
    }

    return acc;
  }, {});

  return (
    <BarChart
      series={Object.keys(taskPriorityData).map((priority) => ({
        data: Object.keys(taskPriorityData[priority]).map(
          (status) => taskPriorityData[priority][status]
        ),
        stack: priority,
        label: priority,
        color: Object.keys(taskPriorityData[priority]).map(
          (status) => taskStatusColors[status]
        ),
      }))}
      width={600}
      height={350}
    />
  );
};

const TaskStatusPieChart = ({ tasks }) => {
  const taskStatusData = tasks.reduce((acc, task) => {
    const status = task.status;

    if (acc[status] !== undefined) {
      acc[status]++;
    } else {
      acc[status] = 1;
    }

    return acc;
  }, {});

  const pieChartData = Object.keys(taskStatusData).map((status) => ({
    name: status,
    y: taskStatusData[status],
    color: taskStatusColors[status],
  }));

  return (
    <PieChart
      series={[
        {
          data: pieChartData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          label: { visible: true, formatter: (name) => name },
        },
      ]}
      height={200}
    />
  );
};
