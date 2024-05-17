import React, {useState} from 'react'
import "./Account.css"
import  {TimeBadge} from './Badges'
import axios from 'axios'

export default function UserProjects() {
    const [projects, setProjects] = useState([]);
    const addProject = (newProject) => {
        setProjects([...projects, newProject]);
    };
// GET Projects
const url = 'https://pm-platform-backend.onrender.com/api/projects/user/6629442719d2130518b601a8'
React.useEffect(() => {
axios.get(url)
    .then((res) => {
    const data = res.data
            if (data) {
            setProjects(data);
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
    { projects.map(project => {
        // console.log(project)
    return (

        <div className='userProjects'>
            <div className='content1'>
                <h4 class="bold">{project.projectName}</h4>
                <TimeBadge value={calculateDaysLeft(project.dueDate)}></TimeBadge>
            </div>
            <div>
            <div className='progressBar'>
            <div className="progressFill"></div>
                <div className='progress' style={{innerWidth:'25%' }}></div>
                <span class="progressPer">50%</span>

            </div>
        </div>
        {/* <div className ="settings"> <h4 className="bold">Settings  View Dashboard</h4></div> */}
        <div className ="settings"> <a href="/project-settings" className='link'>Settings</a>   &nbsp;<a href="/dashboard" className='link'>View Dashboard</a></div>

        </div>
        // </div>
            )
        })
        }
        <div className = "userProjects">
        <div className="projectName"><h4 className="bold">Smart Home</h4><TimeBadge></TimeBadge>

        </div>

        {/* progressBar */}
        <div className="progress">
            <div className="progressFill"></div>
            <span class="progressPer">50%</span>
        </div>
        <br/>
        <div className='linkContainer'>
        <div className ="settings"> <a href="/project-settings" className='link'>Settings</a>   &nbsp;<a href="/dashboard" className='link'>View Dashboard</a></div>
        </div>


    </div>
    </div>
    )

}
