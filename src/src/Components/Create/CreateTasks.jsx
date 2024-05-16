import React from 'react'
import TaskListRenderer from '../TaskList/TaskListRenderer'
import { NavLink } from 'react-router-dom'

export default function CreateTasks() {
  const projectID = 'project789'
  return (
    <div>   
      <TaskListRenderer projectID={projectID}></TaskListRenderer>
      <div className='createNavigationButtons'>
        <NavLink
                    to='/create-project'
                    key='create-project'
            ><button>Prev</button></NavLink>
           <NavLink
                    to='/create-network'
                    key='create-network'
            ><button>Next</button></NavLink>
      </div>
    </div>
  )
}
