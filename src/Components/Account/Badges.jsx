import React from 'react'
import "./Account.css"


export default function PriorityBadge({value}) {
  return (
    <div class="priorityBadge bold">
      {value}
    </div>
  )
}

export function TimeBadge({value}) {
  let clockImg = require("../../Assets/Time.svg").default;
  return (
    <div class="timeBadge bold">
      {value} days left  &nbsp;
      <img src={clockImg} alt="deadline"/>
    </div>

  )
}

export function StatusBadge({value}) {
  return (
    <div>{value}</div>
  )
}
