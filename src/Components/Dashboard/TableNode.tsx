import React, { memo } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import "./Network.css";
// DESCRIPTION, COMMENTS ARE DISPLAYED WHEN HOVER ON NODE

export default function TableNode({
  id,
  data: {
    taskId,
    taskName,
    description,
    earlyStart = new Date(),
    earlyFinish = new Date(),
    lateStart = new Date(),
    lateFinish = new Date(),
    duration,
    timeSlack,
    dependancy,
    comments,
    taskCreator,
    assignedUsers,
    cost,
  },
}) {
  return (
    <div className="tableNodeContainer">
      {id === "1" && <Handle type="source" position={Position.Right} />}
      {id === "2" && <Handle type="target" position={Position.Left} />}

      <div className="table_component" role="region">
        <table>
          <tbody>
            <tr>
              <td>{earlyStart.toLocaleDateString()}</td>
              <td>{taskId}</td>
              <td>{earlyFinish.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>{timeSlack}</td>
              <td>{taskName}</td>
              <td></td>
            </tr>
            <tr>
              <td>{lateStart.toLocaleDateString()}</td>
              <td>{duration}</td>
              <td>{lateFinish.toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <MoreInfo description={description} />
    </div>
  );
}

function MoreInfo({ description }) {
  return (
    <div className="moreInfo">
      <p>{description}</p>
      <hr></hr>
      <h6 className="bold"></h6>
    </div>
  );
}
