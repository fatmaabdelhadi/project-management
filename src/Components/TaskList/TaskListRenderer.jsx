import React from 'react'
import TaskList from './TaskList';
import { useState } from 'react';
import axios, {} from 'axios';

export default function TaskListRenderer({projectID}) {
    const [tasks, setTasks] = useState([]);
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    }; 
  // GET Tasks
  const tasksUrl = `https://pm-platform-backend.onrender.com/api/tasks/project/${projectID}`
//   const tasksUrl = `https://pm-platform-backend.onrender.com/api/projects/${projectID}`
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
