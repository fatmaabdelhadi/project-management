
import { React, useState } from 'react'
import './SideMenu.css'

import { Link, NavLink } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';



export default function SideMenu() {
  let ArrowImg = require('../../Assets/Arrow.svg').default
  
  let HomeImg = require('../../Assets/Home inactive.svg').default
  let DashboardImg = require('../../Assets/Dashboard inactive.svg').default
  let CreateImg = require('../../Assets//Create inactive.svg').default
  
  let DotImg = require('../../Assets/Dot.svg').default

  let data = [{
    name: 'home',
    image: HomeImg,
    url: '/content'
    },
    {
    name: 'dashboard',
    image: DashboardImg,
    url: './dashboard'
    },
    {
    name: 'create',
    image: CreateImg,
    url: '/create'
    },
    
]
  const [navbarItems, setNavbarItems] = useState([...data])

  return (
    <div>
      <Sidebar className='sideMenu'>
        <div className='sideMenuHeader'>
         <img alt="Side menu button" src={ArrowImg}/>
        </div>
        <Menu>
          {navbarItems.map(item => {
            return <MenuItem
              component={<NavLink
                // className={({ isActive}) => (isActive ? 'activeDot':'')}
                to={`/${item.name}`}
                key={`navbar-${item}`}>
                
                </NavLink>}
            >
              {/* {({ isActive }) =>( */}
                <div className='sideMenuItem'>
                  <div className='sideMenuItemContent'>
                    <img alt={`${item.name}`} src={`${item.image}`} />
                    <p>{item.name}</p>
                  </div>
                  {/* <img class={isActive ? "activeDot" : ""} className={'dot'} src={DotImg} */}
                  {/* /> */}
                </div>
          {/* )} */}
            </MenuItem>
          })}
        </Menu>
      </Sidebar></div>
  )
}
