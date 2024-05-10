import React, {useState} from 'react'
import "./Account.css"
import PriorityBadge, {TimeBadge, StatusBadge} from './Badges'
import axios from 'axios'

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

        const calculateDaysLeft = (dueDate) => {
        const currentDate = new Date();
        const dueDateTime = new Date(dueDate).getTime();
        const differenceInMs = dueDateTime - currentDate.getTime();
        const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
        if (daysLeft < 0)
            return 0
        return daysLeft;
    };

    return (
    <div className='row'>
    { tasks.map(task => {
    return (

        <div className='userTasks'>
            <div>
                <h4 class="bold">{task.taskName}</h4>
                <PriorityBadge value={task.priority}></PriorityBadge>
                <TimeBadge value={calculateDaysLeft(task.dueDate)}></TimeBadge>
            </div>

            <div>
                <p>{task.project}</p>

            </div>

            <div>
                <p><StatusBadge value={task.status} /></p>
                <p>{task.dueDate}</p>
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
