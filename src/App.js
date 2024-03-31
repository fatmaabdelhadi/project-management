import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import SideMenu from './Components/SideMenu/SideMenu';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import TaskList from './Components/TaskList/TaskList'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"


function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = (taskName, parentIndex = null) => {
    const newTask = {
      name: taskName,
      startDate: "placeholder",
      estimatedTime: "placeholder",
      cost: "placeholder",
      owner: "placeholder",
      notes: "placeholder",
      subtasks: [],
    };

    if (parentIndex !== null) {
      // subtask
      const updatedTasks = [...tasks];
      updatedTasks[parentIndex].subtasks.push(newTask);
      setTasks(updatedTasks);
    } else {
      // main task
      setTasks([...tasks, newTask]);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <SideMenu></SideMenu>
        <div className='Layout'>

            <Navbar></Navbar>

          <div className='Content'>
             <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard/>}></Route>
                <Route path='/create' element={<TaskList addTask={addTask} tasks={tasks} />}></Route>
              </Routes>
          </div>
           

        </div>
  
   
    </div>
    </BrowserRouter>
  );
}

export default App;
