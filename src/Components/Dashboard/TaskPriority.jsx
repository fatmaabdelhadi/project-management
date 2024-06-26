import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { StackOffsetType } from "@mui/x-charts/models";
import React, { useState } from "react";

const availableStackOffset = ["expand", "diverging", "none"];

const TaskStackedBarChart = () => {
  const [stackOffset, setStackOffset] = useState("expand");

  const tasks = [
    { priority: "Low", status: "Completed" },
    { priority: "Medium", status: "In Progress" },
    { priority: "Urgent", status: "Not Started" },
    { priority: "Low", status: "Completed" },
    { priority: "Important", status: "In Progress" },
    { priority: "Medium", status: "Completed" },
    { priority: "Urgent", status: "In Progress" },
    { priority: "Important", status: "Not Started" },
  ];

  const getSeries = ({ tasks, stackOffset }) => {
    const priorityLabels = ["Low", "Medium", "Urgent", "Important"];
    const statusLabels = ["Completed", "In Progress", "Not Started"];

    // Custom colors
    const taskPriorityColors = {
      Low: "#2196f3",
      Medium: "#4caf50",
      Urgent: "#ff9800",
      Important: "#f44336",
    };

    const seriesData = priorityLabels.map((priority) => ({
      label: priority,
      stack: "total",
      stackOffset,
      data: statusLabels.map(
        (status) =>
          tasks.filter(
            (task) => task.priority === priority && task.status === status
          ).length
      ),
      color: taskPriorityColors[priority] || "gray",
    }));

    return seriesData;
  };

  return React.createElement(
    Box,
    { sx: { width: "100%", maxWidth: 600 } },
    React.createElement(
      Stack,
      { direction: "row", spacing: 2, sx: { mb: 2 } },
      React.createElement(
        TextField,
        {
          select: true,
          label: "Stack Offset",
          value: stackOffset,
          onChange: (event) => setStackOffset(event.target.value),
          sx: { minWidth: 150 },
        },
        availableStackOffset.map((offset) =>
          React.createElement(MenuItem, { key: offset, value: offset }, offset)
        )
      )
    ),
    React.createElement(BarChart, {
      height: 300,
      series: getSeries({ tasks, stackOffset }),
      xAxisLabel: "Task Priority",
      yAxisLabel: "Number of Tasks",
    })
  );
};

export default TaskStackedBarChart;
