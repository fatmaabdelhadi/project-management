import React, {useState, useEffect} from 'react'
import "./Account.css"
import PriorityBadge, {TimeBadge, StatusBadge} from './Badges'
import axios from 'axios'
import { fixDateFormat, GetForiegnData, calculateDaysLeft } from '../../functions'

export default function UserTasks() {
    const [tasks, setTasks] = useState([]);
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

  // GET Tasks
    const url = 'https://pm-platform-backend.onrender.com/api/tasks/user/6629442719d2130518b601a6'
    React.useEffect(() => {
    axios.get(url)
        .then((res) => {
        const data = res.data
                if (data) {
                setTasks(data);
                }
    }).catch(error => {
    console.error('Error fetching data:', error);
    });
    }, []);

    return (
    <div className='row'>
    {tasks.map(task => {
    return (
        <div className='userTasks'>
            <div>
                <h4 class="bold">{task.taskName}</h4>
                <PriorityBadge value={task.priority}></PriorityBadge>
                <TimeBadge value={calculateDaysLeft(task.endDate)}></TimeBadge>
            </div>

            <div>
                <p><GetForiegnData object={"projects"} method={"find"} id={task.project} attr={"projectName"} /></p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <p><StatusBadge value={task.status} /></p>
                <p>{fixDateFormat(task.endDate)}</p>
            </div>

            <hr/>

            <div>
                {/* <p>{task.comments[0].text}</p> */}
            </div>
        </div>
            )
        })
    }
    </div>
    )
}
