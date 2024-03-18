import React, { useState } from 'react';
import './App.css';
import TaskList from './Components/TaskList/TaskList.jsx';

function App() {

  const [tasks, setTasks] = useState([]);
  const addTask = (taskName, parentIndex = null) => {
    const newTask = {
      name: taskName,
      startDate: 'placeholder',
      estimatedTime: 'placeholder',
      cost: 'placeholder',
      owner: 'placeholder',
      notes: 'placeholder',
      subtasks: []
    };
  
    if (parentIndex !== null) { // subtask
      const updatedTasks = [...tasks];
      updatedTasks[parentIndex].subtasks.push(newTask);
      setTasks(updatedTasks);
    } else { // main task
      setTasks([...tasks, newTask]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* empty for now */}
      </header>
      <TaskList addTask={addTask} tasks={tasks} />
    </div>
  );
}

export default App;