import React from 'react'
import TaskListRenderer from '../TaskList/TaskListRenderer'
import { NavLink, useParams } from 'react-router-dom'

export default function CreateTasks() {
  
  const { projectID } = useParams();

  return (
    <div>   
      <TaskListRenderer projectID={projectID}></TaskListRenderer>
      <div className='createNavigationButtons'>
        <NavLink
                    to='/create-project'
                    key='create-project'
            ><button>Prev</button></NavLink>
           <NavLink
                    to={`/create-network/${projectID}`}
                    key='create-network'
            ><button>Next</button></NavLink>
      </div>
    </div>
  )
}
