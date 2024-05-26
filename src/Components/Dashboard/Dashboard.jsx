import React, { useState } from "react";
import QuickChart from "quickchart-js";
import "./Dashboard.css";
import Network from "./Network";
import Gannt from "./Gannt";
import { NavLink, useParams } from "react-router-dom";

export default function Dashboard() {
  const { projectID } = useParams();

  const statusDonut = new QuickChart();
  statusDonut.setConfig({
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [94, 25, 72, 70],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          label: "Dataset 1",
        },
      ],
      labels: ["Late", "Not Started", "In Progress", "Completed"],
    },
    options: {
      title: {
        display: true,
        // text: 'Task Status',
      },
    },
  });

  const priorityBar = new QuickChart();
  priorityBar.setConfig({
    type: "bar",
    data: {
      labels: ["Urgent", "Important", "Medium", "Low"],
      datasets: [
        {
          label: "Late",
          backgroundColor: "rgb(255, 99, 132)",
          data: [52, 93, 25, 67, 51, 97, 9],
        },
        {
          label: "Not Started",
          backgroundColor: "rgb(255, 159, 64)",
          data: [17, 13, 38, 89, 10, 75, 52],
        },
        {
          label: "In Progress",
          backgroundColor: "rgb(255, 205, 86)",
          data: [84, 33, 80, 75, 83, 34, 50],
        },
        {
          label: "Completed",
          backgroundColor: "rgb(75, 192, 192)",
          data: [84, 33, 80, 75, 83, 34, 50],
        },
      ],
    },
    options: {
      title: {
        display: true,
        // text: 'Chart.js Bar Chart - Stacked',
      },
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  });

  let data = [
    {
      name: "Task Status",
      data: statusDonut.getUrl(),
      className: "statusDonut",
    },
    {
      name: "Task Priority",
      data: priorityBar.getUrl(),
      className: "priorityBar",
    },
  ];

  const [diagrams, setDiagrams] = useState([...data]);

  return (
    <div className="dashboard">
      <h3 className="bold">Project Network</h3>
      <Network
        projectID={projectID}
        border={"1px solid var(--grey)"}
        height={"400px"}
        width={"100%"}
      ></Network>
      <Gannt
        projectID={projectID}
        border={"1px solid var(--grey)"}
        height={"400px"}
        width={"100%"}
      ></Gannt>
      {diagrams.map((item) => {
        return (
          <div>
            <h3 className="bold">{item.name}</h3>
            <img
              alt={item.name}
              className={`diagram ${item.className}`}
              src={item.data}
            />
          </div>
        );
      })}
      <div className="createNavigationButtons">
        <NavLink to={`/create-network/${projectID}`} key="create-network">
          <button>Prev</button>
        </NavLink>
      </div>
    </div>
  );
}
