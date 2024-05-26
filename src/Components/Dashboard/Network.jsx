import React, { useCallback, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "./TableNode.tsx";
import { useMemo } from "react";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "TableNode",
    data: {
      taskId: 1,
      taskName: "Task 1",
      description: "This is the first task",
      earlyStart: new Date(),
      earlyFinish: new Date(),
      lateStart: new Date(),
      lateFinish: new Date(),
      duration: 5,
      timeSlack: 0,
      dependancy: null,
      comments: "No comments",
    },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    type: "TableNode",
    data: {
      taskId: 2,
      taskName: "Task 2",
      description: "This is the second task",
      earlyStart: new Date(),
      earlyFinish: new Date(),
      lateStart: new Date(),
      lateFinish: new Date(),
      duration: 5,
      timeSlack: 0,
      dependancy: "1",
      comments: "No comments",
      taskCreator: "Ganna Mohamed",
      assignedUsers: ["Fatma Mohamed", "Hadeer Mamdouh"],
      cost: 200,
    },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = { TableNode: TableNode };

export default function Network({ projectID, height, width, border }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div>
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
    </div>
  );
}
