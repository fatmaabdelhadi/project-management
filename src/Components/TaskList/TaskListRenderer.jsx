import React from 'react'
import TaskList from './TaskList';
import { useState } from 'react';
import axios from 'axios';

export default function TaskListRenderer({projectID}) {
    const [tasks, setTasks] = useState([]);
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };
    
    // GET project
    const projectsUrl = 'https://pm-platform-backend.onrender.com/api/projects/find/'


  // GET Tasks
  const tasksUrl = 'https://pm-platform-backend.onrender.com/api/tasks/user/6629442719d2130518b601a6'
   React.useEffect(() => {
     axios.get(tasksUrl)
         .then((res) => {
             const data = res.data
             if (data) {
                 console.log(data)
                 setTasks(data);
             }
    }).catch(error => {
    console.error('Error fetching data:', error);
  });
   }, []);


    return (
        <TaskList addTask={addTask} tasks={tasks}/>
    )
}
