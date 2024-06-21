import QuickChart from "quickchart-js";

// Create QuickChart instances
export const statusDonut = new QuickChart();
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
    },
  },
});

export const priorityBar = new QuickChart();
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
