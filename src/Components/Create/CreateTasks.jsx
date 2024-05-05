import React from 'react'
import TaskListRenderer from '../TaskList/TaskListRenderer'
import { NavLink } from 'react-router-dom'

export default function CreateTasks() {
  return (
      <div>
           <NavLink
                    to='/create-network'
                    key='craete-network'
            ><button>Next</button></NavLink>
          <TaskListRenderer></TaskListRenderer>
    </div>
  )
}
