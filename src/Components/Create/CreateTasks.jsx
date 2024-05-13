import React from 'react'
import TaskListRenderer from '../TaskList/TaskListRenderer'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function CreateTasks() {
  const { id } = useParams

  return (
    <div>   
      <TaskListRenderer projectID={"6638cb129ebc1e809dd23fe4"}/>
      <div className='createNavigationButtons'>
        <NavLink
                    to='/create-project'
                    key='create-project'
            ><button>Prev</button></NavLink>
           <NavLink
                    to='/create-network'
                    key='craete-network'
            ><button>Next</button></NavLink>
      </div>
    </div>
  )
}
