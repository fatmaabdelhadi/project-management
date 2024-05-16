import React from 'react'
import GuestNavbar from '../Navbar/GuestNavbar'
import { Outlet } from 'react-router'

export const GuestLayout = ({children}) => {
  return (
      <div className='guestLayout'>
          <GuestNavbar></GuestNavbar>
          {children}
          <Outlet></Outlet>
      </div>
  )
}
