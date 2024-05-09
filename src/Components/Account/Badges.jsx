import React from 'react'
import "./Account.css"


export default function PriorityBadge() {
  return (
    <div class="priorityBadge bold">
      Urgent
    </div>
  )
}

export function TimeBadge() {
  let clockImg = require("../../Assets/Time.svg").default;
  return (
    <div class="timeBadge bold">
      2 days left  &nbsp;
      <img src={clockImg} alt="deadline"/>
    </div>

  )
}