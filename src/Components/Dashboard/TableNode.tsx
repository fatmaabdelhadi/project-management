import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import "./Network.css";

function TableNode({
  id,
  data: {
    taskId,
    taskName,
    description,
    earlyStart,
    earlyFinish,
    lateStart,
    lateFinish,
    duration,
    timeSlack,
    dependencies,
    comments,
    taskCreator,
    assignedUsers,
    cost,
  },
}) {
  return (
    <div className="tableNodeContainer">
      {/* {dependencies.length === 0 && ( */}
      <Handle type="source" position={Position.Right} />
      {/* )} */}
      {/* {dependencies.length > 0 && ( */}
      <Handle type="target" position={Position.Left} />
      {/* )} */}

      <div className="table_component" role="region">
        <table>
          <tbody>
            <tr>
              <td>
                {earlyStart ? new Date(earlyStart).toLocaleDateString() : "N/A"}
              </td>
              <td>{taskId}</td>
              <td>
                {earlyFinish
                  ? new Date(earlyFinish).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>{timeSlack}</td>
              <td>{taskName}</td>
              <td></td>
            </tr>
            <tr>
              <td>
                {lateStart ? new Date(lateStart).toLocaleDateString() : "N/A"}
              </td>
              <td>{duration}</td>
              <td>
                {lateFinish ? new Date(lateFinish).toLocaleDateString() : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <MoreInfo description={description} comments={comments} />
    </div>
  );
}

function MoreInfo({ description, comments }) {
  return (
    <div className="moreInfo">
      <p>{description}</p>
      {comments && (
        <>
          <hr />
          <p>{comments}</p>
        </>
      )}
    </div>
  );
}

export default memo(TableNode);
