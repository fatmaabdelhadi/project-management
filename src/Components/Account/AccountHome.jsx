import React from 'react'
import "./Account.css"
import UserTasks from './UserTasks'
import UserProjects from './UserProjects';

export default function AccountHome() {
  let dropDownImg = require("../../Assets/Dropdown.svg").default;

  return (
    <div>
      <div className="tasks"><h3>Tasks</h3></div>
      <div class ="filtersRow">
        <label>All</label>
        <div className="filterP">
        <button class ="btnDropFilterP" > Filter By Priority <img src={dropDownImg} alt="dropdown"/></button>
          <form>
            <input type="checkbox" />
            <label>Urgent</label><br/>
            <input type="checkbox" />
            <label>Important</label><br/>
            <input type="checkbox" />
            <label>Medium</label><br/>
            <input type="checkbox" />
            <label>Low</label><br/>
          </form>
        </div>
        <div className="filterS">
        <button class="btnDropFilterS">Filter By Status <img src={dropDownImg} alt="dropdown"/></button>

          <form>
            <input type="checkbox" />
            <label>Late</label><br/>
            <input type="checkbox" />
            <label>Not Started</label><br/>
            <input type="checkbox" />
            <label>In progress</label><br/>
            <input type="checkbox" />
            <label>Completed</label><br/>
          </form>
          <div className='search'>
        <input type='text gg-search' placeholder='search'></input>
      </div>
      </div>


      </div>


      <hr/>

      <div className='userTasksLayout'>
        <UserTasks></UserTasks>
      </div>
      <br/>


      <div className="userProjects">
      <h3> Projects</h3>
      <div className='search'>
        <input type='text gg-search' placeholder='search'></input>
      </div>
      <hr/>
      <div className="userProjects">
        <UserProjects></UserProjects>
      </div>

      </div>


    </div>
  )
}
