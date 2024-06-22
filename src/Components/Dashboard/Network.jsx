import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "./TableNode.tsx";
import { getProjectTasks } from "../../Services/TaskModel.jsx";

// const initialNodes = [
//   {
//     id: "1",
//     position: { x: 0, y: 0 },
//     type: "TableNode",
//     data: {
//       taskId: 1,
//       taskName: "Task 1",
//       description: "This is the first task",
//       earlyStart: new Date(),
//       earlyFinish: new Date(),
//       lateStart: new Date(),
//       lateFinish: new Date(),
//       duration: 5,
//       timeSlack: 0,
//       dependencies: [],
//       comments: "No comments",
//     },
//   },
//   {
//     id: "2",
//     position: { x: 0, y: 100 },
//     type: "TableNode",
//     data: {
//       taskId: 2,
//       taskName: "Task 2",
//       description: "This is the second task",
//       earlyStart: new Date(),
//       earlyFinish: new Date(),
//       lateStart: new Date(),
//       lateFinish: new Date(),
//       duration: 5,
//       timeSlack: 0,
//       dependencies: ["1"],
//       comments: "No comments",
//       taskCreator: "Ganna Mohamed",
//       assignedUsers: ["Fatma Mohamed", "Hadeer Mamdouh"],
//       cost: 200,
//     },
//   },
// ];

// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = { TableNode: TableNode };

const calculateNodeXPosition = (taskStartDate, earliestDate) => {
  const daysDifference = (taskStartDate - earliestDate) / (1000 * 3600 * 24); // Difference in days
  return daysDifference * 50;
};
export default function Network({ projectID, height, width, border }) {
  const [tasks, setTasks] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [earliestStartDate, setEarliestStartDate] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const projTasks = await getProjectTasks(projectID);
        console.log("Fetched tasks:", projTasks);

        if (projTasks.length > 0) {
          // remove the first task (it's not workable)
          const filteredTasks = projTasks.slice(1);
          setTasks(filteredTasks);
          console.log("Filtered tasks:", tasks);

          // make the first task on the left
          setEarliestStartDate(
            new Date(Math.min(...tasks.map((task) => new Date(task.startDate))))
          );

          const newNodes = tasks.map((task, index) => ({
            id: task._id,
            position: {
              x: calculateNodeXPosition(
                new Date(task.startDate),
                earliestStartDate
              ),
              y: index * 100,
            },
            type: "TableNode",
            data: {
              taskId: index + 1,
              taskName: task.taskName,
              description: task.description,
              earlyStart: new Date(task.startDate),
              earlyFinish: new Date(task.endDate),
              lateStart: task.lateStart ? new Date(task.lateStart) : null,
              lateFinish: task.lateFinish ? new Date(task.lateFinish) : null,
              duration: task.duration,
              timeSlack: task.timeSlack || 0,
              dependencies: task.dependency || [], // Default to empty array if undefined
              comments: task.comments.length
                ? task.comments[0].text
                : "No comments",
              taskCreator: task.taskCreator,
              assignedUsers: task.assignedUsers,
              cost: task.cost,
            },
          }));

          tasks.map((task) => {
            console.log(task.dependency);
          });

          console.log("New nodes:", newNodes);

          const newEdges = tasks.flatMap((task) =>
            (task.dependency || []).map((dep) => {
              console.log(`Creating edge from ${dep} to ${task._id}`);
              return {
                id: `e${dep}-${task._id}`,
                source: dep,
                target: task._id,
              };
            })
          );
          console.log("New edges:", newEdges);

          // setTasks(filteredTasks);
          setNodes(newNodes);
          setEdges(newEdges);
        }
      } catch (error) {
        console.error("Error fetching project tasks:", error);
      }
    };

    fetchTasks();
  }, [projectID, setNodes, setEdges, earliestStartDate, tasks]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div>
      {" "}
      {tasks.length > 0 ? (
        <div style={{ width: width, height: height, border: border }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </div>
      ) : (
        <h4 style={{ margin: "20px" }}>
          No tasks found!
          <a
            href="https://www.retrogames.cc/genesis-games/sonic-the-hedgehog-3-europe.html"
            className="bold"
            style={{ color: "var(--teal)", fontSize: "20px" }}
          >
            Play a game
          </a>
        </h4>
      )}
    </div>
  );
}
