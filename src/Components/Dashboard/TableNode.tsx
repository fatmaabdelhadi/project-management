import React, { useState, useEffect, memo } from "react";
import { Handle, Position } from "reactflow";
import "./Network.css";
import PriorityBadge, { TimeBadge, StatusBadge } from "../Account/Badges";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { calculateDaysLeft } from "../../functions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getUsernameById } from "../../Services/UserModel";

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
    dependencies,
    comments,
    priority,
    status,
    startDate,
    endDate,
    assignedUsers,
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
        assignedUsers={assignedUsers}
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
  assignedUsers,
}) {
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernameMap = {};
      for (const userId of assignedUsers) {
        if (!usernameMap[userId]) {
          const username = await getUsernameById(userId);
          usernameMap[userId] = username;
        }
      }
      setUsernames(usernameMap);
    };

    fetchUsernames();
  }, [assignedUsers]);

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

      <div className="d-flex gap-2 align-items-center">
        <AccountCircleIcon style={{ opacity: "0.5" }} />
        <p className="bold">
          {assignedUsers
            .map((userId) => usernames[userId])
            .join(", ")}
        </p>
      </div>
      <p className="moreInfoDesc">
        <InfoOutlinedIcon /> {description}
      </p>
      {/* {comments && (
        <>
          <p>{comments}</p>
        </>
      )} */}
    </div>
  );
}

export default memo(TableNode);
