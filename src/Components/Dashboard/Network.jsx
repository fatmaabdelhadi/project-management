import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "./TableNode.tsx";
import { getProjectTasks } from "../../Services/TaskModel.jsx";

const nodeTypes = { TableNode: TableNode };

const calculateNodeXPosition = (taskStartDate, earliestDate) => {
  const daysDifference = (taskStartDate - earliestDate) / (1000 * 3600 * 24); // Difference in days
  return daysDifference * 50;
};

export default function Network({ projectID, height, width, border }) {
  const [tasks, setTasks] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const earliestStartDateRef = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const projTasks = await getProjectTasks(projectID);
        console.log("Fetched tasks:", projTasks);

        if (projTasks.length > 0) {
          // remove the first task (it's not workable)
          const filteredTasks = projTasks;
          setTasks(filteredTasks);
        }
      } catch (error) {
        console.error("Error fetching project tasks:", error);
      }
    };

    fetchTasks();
  }, [projectID]);

  useEffect(() => {
    if (tasks.length > 0) {
      const earliestDate = new Date(
        Math.min(...tasks.map((task) => new Date(task.startDate)))
      );
      earliestStartDateRef.current = earliestDate;

      const newNodes = tasks.map((task, index) => ({
        id: task._id,
        position: {
          x: calculateNodeXPosition(
            new Date(task.startDate),
            earliestStartDateRef.current
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

      const newEdges = tasks.flatMap((task) =>
        (task.dependency || []).map((dep) => ({
          id: `e${dep}-${task._id}`,
          source: dep,
          target: task._id,
        }))
      );

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [setEdges, setNodes, tasks]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div>
      {/* {tasks.length > 0 ? ( */}
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
      {/* ) : (
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
      )} */}
    </div>
  );
}
