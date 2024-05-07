import React from 'react'
import TaskList from './TaskList';
import { useState } from 'react';
import axios from 'axios';

export default function TaskListRenderer() {
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
