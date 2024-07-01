import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import "./Network.css";
import PriorityBadge, { TimeBadge, StatusBadge } from "../Account/Badges";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { calculateDaysLeft } from "../../functions";
function TableNode({
  id,
  data: {
    taskId,
    taskName,
    description,
    ES,
    EF,
    LS,
    LF,
    duration,
    // timeSlack,
    dependencies,
    comments,
    priority,
    status,
    startDate,
    endDate,
  },
}) {
  return (
    <div className="tableNodeContainer">
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />

      <div className="table_component" role="region">
        <table>
          <tbody>
            <tr>
              {/* <td>{ES ? new Date(ES).toLocaleDateString() : "N/A"}</td>
              <td>{taskId}</td>
              <td>{EF ? new Date(EF).toLocaleDateString() : "N/A"}</td> */}
              <td>{ES}</td>
              <td>No.{taskId}</td>
              <td>{EF}</td>
            </tr>
            <tr>
              <td></td>
              <td>{taskName}</td>
              <td>
                <StatusBadge value={status} />
              </td>
            </tr>
            <tr>
              {/* <td>{LS ? new Date(LS).toLocaleDateString() : "N/A"}</td>
              <td>{duration}</td>
              <td>{LF ? new Date(LF).toLocaleDateString() : "N/A"}</td> */}
              <td>{LS}</td>
              <td>{duration} days</td>
              <td>{LF}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <MoreInfo
        description={description}
        comments={comments}
        priority={priority}
        status={status}
        endDate={endDate}
        id={id}
        // timeSlack={timeSlack}
      />
    </div>
  );
}

function MoreInfo({
  description,
  comments,
  priority,
  status,
  endDate,
  id,
  // , timeSlack
}) {
  return (
    <div className="moreInfo d-flex flex-column gap-2">
      <div className="badges d-flex gap-2">
        {status !== "Completed" && priority && (
          <PriorityBadge
            isCompleted={status === "Completed" ? true : false}
            value={priority}
          />
        )}

        {status !== "Completed" && (
          <TimeBadge
            isCompleted={status === "Completed" ? true : false}
            taskId={id}
            value={calculateDaysLeft(endDate)}
          />
        )}
      </div>

      <p className="moreInfoDesc">
        <InfoOutlinedIcon></InfoOutlinedIcon> {description}
      </p>
      {/* <hr /> */}

      {/* {comments && (
        <>
          <p>{comments}</p>
        </>
      )} */}
    </div>
  );
}

export default memo(TableNode);
