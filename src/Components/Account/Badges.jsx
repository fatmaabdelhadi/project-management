import React from "react";
import "./Account.css";
import {
  getColorByDaysLeft,
  getColorByPriority,
  getColorByStatus,
} from "../../functions";

export default function PriorityBadge({ value }) {
  return (
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
  );
}

export function TimeBadge({ value }) {
  let clockImg = require("../../Assets/Time.svg").default;
  const isValueNaN = isNaN(value);

  return (
    <div
      className="timeBadge bold"
      style={{
        border: `2px solid ${getColorByDaysLeft(value)}`,
        backgroundColor: getColorByDaysLeft(value),
      }}
    >
      {isValueNaN
        ? "Not Determined"
        : value >= 0
        ? `${value} days left`
        : "Post Deadline"}
      &nbsp; <img src={clockImg} alt="deadline" />
    </div>
  );
}

export function StatusBadge({ value }) {
  return (
    <div
      className="statusBadge bold"
      style={{
        // border: `2px solid ${getColorByStatus(value)}`,
        // backgroundColor: getColorByStatus(value),
        color: getColorByStatus(value),
      }}
    >
      {value}
    </div>
  );
}
