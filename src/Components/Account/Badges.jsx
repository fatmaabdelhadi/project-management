import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Account.css";
import { getColorByPriority } from "../../functions";
import { getColorByStatus } from "../../functions";
import { getColorByDaysLeft } from "../../functions";

export default function PriorityBadge({ value, isCompleted }) {
  return (
    <>
      {!isCompleted && (
        <div
          className="priorityBadge bold"
          style={{
            border: `2px solid ${getColorByPriority(value)}`,
            backgroundColor: "white",
            color: getColorByPriority(value),
          }}
        >
          {value}
        </div>
      )}
    </>
  );
}

export function TimeBadge({ taskId, value, isCompleted }) {
  const [clockImg, setClockImg] = useState(
    require("../../Assets/Time.svg").default
  );
  const isValueNaN = isNaN(value);

  const updateLateTaskStatus = async () => {
    try {
      await axios.put(
        `https://pm-platform-backend.onrender.com/api/tasks/update/${taskId}`,
        { status: "Late" }
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const printValue = () => {
    if (isValueNaN) {
      return "Not Determined";
    } else if (isCompleted) {
      return "Completed";
    } else {
      return value >= 0 ? `${value} days left` : "Post Deadline";
    }
  };

  useEffect(() => {
    if (printValue() === "Post Deadline" && !isCompleted) {
      updateLateTaskStatus();
      setClockImg(require("../../Assets/Warning.svg").default);
    }
  }, [value]);

  return (
    <>
      {!isCompleted && (
        <div
          className="timeBadge bold"
          style={{
            border: `2px solid ${getColorByDaysLeft(value)}`,
            backgroundColor: getColorByDaysLeft(value),
          }}
        >
          {printValue()}
          &nbsp; <img src={clockImg} alt="deadline" />
        </div>
      )}
    </>
  );
}

export function StatusBadge({ value }) {
  return (
    <div
      className="statusBadge bold"
      style={{
        color: getColorByStatus(value),
      }}
    >
      {value}
    </div>
  );
}
