import React from 'react'
import "./Account.css"
import PriorityBadge, {TimeBadge} from './Badges'

export default function UserTasks() {
  return (
    <div className='userTasks'>
        <div>
            <h4 class ="bold">  Task name</h4>
            <PriorityBadge></PriorityBadge>
            <TimeBadge></TimeBadge>
        </div>

        <div>
            <p> Smart Home</p>

        </div>

        <div>
            <p> in progress</p>
            <p> 12/2/2025 </p>
        </div>

        <hr/>

        <div>
            <p> comments </p>
        </div>

    </div>
  )
}