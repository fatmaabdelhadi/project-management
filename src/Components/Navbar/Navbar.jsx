import React from 'react'
import './Navbar.css'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
    const { hash, pathname, search } = location;

  return (
    <div className='navbar'>
      <br></br>
      <div className='BreadCrumb'>
        {/* <NavLink className='BreadCrumbParent' to=''>SmartHome / </NavLink><NavLink className='BreadCrumpChild' to='/dashboard'>Dashboard</NavLink> */}
              ProjectName&nbsp;
        <NavLink>
          &nbsp;{pathname}
        </NavLink>
      </div>
      </div>
  )
}
