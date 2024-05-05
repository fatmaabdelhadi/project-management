import React from 'react'
import TaskList from './TaskList';
import { useState } from 'react';
export default function TaskListRenderer() {
    const [tasks, setTasks] = useState([]);
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    }; 
    
    return (
        <TaskList addTask={addTask} tasks={tasks}/>
    )
}
