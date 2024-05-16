import React from 'react'
import Network from '../Dashboard/Network'
import { NavLink } from 'react-router-dom'

export default function CreateNetwork() {
  return (
    <div>
        <div>
            <Network></Network>
      </div>
       <div className='createNavigationButtons'>
          <NavLink
                    to='/create-tasks'
                    key='create-tasks'
            ><button>Prev</button></NavLink>
          <NavLink
                    to='/dashboard'
                    key='/dashboard'
            ><button>Done</button></NavLink>
        </div>
    </div>
  )
}
