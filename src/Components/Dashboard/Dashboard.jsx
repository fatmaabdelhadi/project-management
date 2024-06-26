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
import TaskStatusStackedBar from "./TaskPriority";
import AssignedUsersPieChart from "./AccountPie";

const taskStatusColors = {
  Late: "rgb(255, 99, 132)",
  "Not Started": "rgb(75, 192, 192)",
  "In Progress": "rgb(255, 205, 86)",
  Completed: "rgb(75, 192, 192)",
};

const seriesA = {
  name: "Low",
  data: [5, 8, 10, 3], // Example data for statuses: [Late, Not Started, In Progress, Completed]
};

const seriesB = {
  name: "Medium",
  data: [3, 6, 7, 2],
};

const seriesC = {
  name: "Urgent",
  data: [2, 4, 5, 1],
};

const seriesD = {
  name: "Important",
  data: [1, 2, 3, 0],
};

const series = [seriesA, seriesB, seriesC, seriesD];

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
            <TaskStatusPie tasks={tasks} />
            {/* <LabelGuide data={taskStatusColors} /> */}
          </div>
          <div>
            <AssignedUsersPieChart tasks={tasks} />
            {/* <TaskStatusStackedBar tasks={tasks} /> */}
          </div>
          {/* <div key="StackedBar">
            <h3 className="bold">Task Priority</h3>
            <TaskPriorityBarChart tasks={tasks} />
          </div> */}
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

function StackedBarChart({ series }) {
  return (
    <BarChart
      width={600}
      height={300}
      series={series.map((s) => ({ ...s, stack: "total" }))}
    />
  );
}

// const TaskPriorityBarChart = ({ tasks }) => {
//   const taskPriorityData = tasks.reduce((acc, task) => {
//     const priority = task.priority;
//     const status = task.status;

//     if (!acc[priority]) {
//       acc[priority] = {
//         Late: 0,
//         "Not Started": 0,
//         "In Progress": 0,
//         Completed: 0,
//       };
//     }

//     if (acc[priority][status] !== undefined) {
//       acc[priority][status]++;
//     } else {
//       acc[priority][status] = 1;
//     }

//     return acc;
//   }, {});

//   console.log("Task Priority Data:", taskPriorityData); // Log for debugging

//   return (
//     <BarChart
//       series={Object.keys(taskPriorityData).map((priority) => ({
//         data: Object.keys(taskPriorityData[priority]).map(
//           (status) => taskPriorityData[priority][status]
//         ),
//         stack: priority,
//         label: priority,
//         color: Object.keys(taskPriorityData[priority]).map(
//           (status) => taskStatusColors[status]
//         ),
//       }))}
//       width={600}
//       height={350}
//     />
//   );
// };

function TaskStatusPie({ tasks }) {
  const [taskStatusData, setTaskStatusData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const statusCounts = tasks.reduce((acc, task) => {
          const status = task.status;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        const processedData = Object.keys(statusCounts).map(
          (status, index) => ({
            id: index,
            value: statusCounts[status],
            label: status,
            color: taskStatusColors[status] || "gray",
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
      {/* <LabelGuide data={taskStatusData} /> */}
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
              color: taskStatusColors[d.label] || "gray",
            })),
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={200}
      />
    </div>
  );
}

// function LabelGuide({ data }) {
//   return (
//     <div className="label-guide">
//       <h4>Label Guide</h4>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>
//             <span
//               style={{
//                 display: "inline-block",
//                 width: "12px",
//                 height: "12px",
//                 backgroundColor: item.color,
//                 marginRight: "8px",
//               }}
//             ></span>
//             {item.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
