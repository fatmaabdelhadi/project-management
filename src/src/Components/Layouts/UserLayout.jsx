import React, { Children } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'

export const UserLayout = ({children}) => {
  return (
    <div className='App'>
        <SideMenu></SideMenu>
        <div className='userLayout'>
        <Navbar></Navbar>
          <div className='Content'>
            {children}
            <Outlet></Outlet>
          </div>
        </div> 
      </div>  )
}

// export const UserLayout = ({children}) => {
//   return (
//  <div>
//           <Navbar></Navbar>
//           <div className='App'>
//               <SideMenu></SideMenu>
//               <div className='Content'>

//                 {children}
//               </div>
//                <Outlet></Outlet>
//           </div>
         
//       </div>  )
// }

