import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar'>
      <br></br>
      <div className='BreadCrump'>
        <NavLink className='BreadCrumpParent' to=''>SmartHome / </NavLink><NavLink className='BreadCrumpChild' to='/dashboard'>Dashboard</NavLink>
      </div>
      </div>
  )
}
