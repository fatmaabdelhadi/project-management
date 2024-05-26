// REACT
import { useState, useEffect } from "react";

// ASSETS
import logo from "./logo.svg";

// STYLE
import "./App.css";
import "./variables.css";

// LIBRARIES
import axios from "axios";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

// COMPONENTS
import SideMenu from "./Components/SideMenu/SideMenu";
import Home from "./Components/Account/AccountHome";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Network from "./Components/Dashboard/Network";
import CreateTasks from "./Components/Create/CreateTasks";
import CreateNetwork from "./Components/Create/CreateNetwork";
import TaskList from "./Components/TaskList/TaskList";
import TaskListRenderer from "./Components/TaskList/TaskListRenderer";
import SignUp from "./Components/Sign/SignUp";
import { LogIn } from "./Components/Sign/LogIn";
import { UserLayout } from "./Components/Layouts/UserLayout";
import { GuestLayout } from "./Components/Layouts/GuestLayout";
import AccountSettings from "./Components/Account/AccountSettings";
import ProjectSettings from "./Components/Project/ProjectSettings";
import AccountHome from "./Components/Account/AccountHome";
import LandingPage from "./Components/Landing/LandingPage";
import ContactUs from "./Components/Landing/ContactUs";
import CreateProject from "./Components/Create/CreateProject";

function App() {
  // ACCOUNT SESSION HANDLING
  const [isSigned, setSignStatus] = useState(false);

  // CURRENT PROJECT HANDLING
  const [currentProject, setCurrentProject] = useState({
    projectID: JSON.parse(localStorage.getItem("projectID")),
    projectName: JSON.parse(localStorage.getItem("projectName")),
  });
  useEffect(() => {
    setCurrentProject({
      projectID: JSON.parse(localStorage.getItem("projectID")),
      projectName: JSON.parse(localStorage.getItem("projectName")),
    });
  }, []);

  // const { projectID } = useParams();
  // const [currentProject, setCurrentProject] = useState("");
  // useEffect(() => {
  //   if (projectID) {
  //     setCurrentProject({ projectID: projectID });
  //     console.log(projectID);
  //   }
  // }, [projectID]);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="Layout">
          <Routes>
            {/* Guest Layout */}
            <Route element={<GuestLayout />}>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/contact" element={<ContactUs />}></Route>
              <Route path="/signUp" element={<SignUp></SignUp>}></Route>
              <Route path="/logIn" element={<LogIn></LogIn>}></Route>
            </Route>

            {/* User Layout */}
            <Route
              element={<UserLayout currentProject={currentProject} />}
              className="Content"
            >
              <Route path="/:username" element={<AccountHome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard/:projectID" element={<Dashboard />} />
              <Route
                path="/create-tasks/:projectID"
                element={<CreateTasks />}
              />
              <Route
                path="/create-network/:projectID"
                element={<CreateNetwork />}
              />
              <Route path="/create-project" element={<CreateProject />} />
              <Route
                path="/account-settings/:projectID"
                element={<AccountSettings />}
              />
              {/* These items are put for testing and does not display a real
              element */}
              <Route path="/create-tasks/" element={<CreateTasks />} />
              <Route path="/create-network/" element={<CreateNetwork />} />
              <Route path="/dashboard/" element={<Dashboard />} />{" "}
              <Route path="/project-settings" element={<ProjectSettings />} />
              <Route
                path="/account-settings/"
                element={<AccountSettings />}
              />{" "}
            </Route>
          </Routes>
        </div>

        {/* </div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// import { useState } from 'react';

// import SideMenu from './Components/SideMenu/SideMenu';
// import Home from './Components/Home/Home';
// import Navbar from './Components/Navbar/Navbar';
// import Dashboard from './Components/Dashboard/Dashboard';
// import TaskList from './Components/TaskList/TaskList'

// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom"

// function App() {
//  const [tasks, setTasks] = useState([]);
//   const addTask = (taskName, parentIndex = null) => {
//     const newTask = {
//       name: taskName,
//       startDate: 'placeholder',
//       estimatedTime: 'placeholder',
//       cost: 'placeholder',
//       owner: 'placeholder',
//       notes: 'placeholder',
//       subtasks: []
//     };

//     if (parentIndex !== null) { // subtask
//       const updatedTasks = [...tasks];
//       updatedTasks[parentIndex].subtasks.push(newTask);
//       setTasks(updatedTasks);
//     } else { // main task
//       setTasks([...tasks, newTask]);
//     }

//     return newTask
//   };
//   return (
//     <BrowserRouter>
//     <div className="App">

//         <SideMenu></SideMenu>
//         <div className='Layout'>

//             <Navbar></Navbar>

//           <div className='Content'>
//              <Routes>
//                 <Route path='/' element={<Home />} />
//                 <Route path='/home' element={<Home />} />
//                 <Route path='/dashboard' element={<Dashboard/>}></Route>
//                 <Route path='/create' element={<TaskList addTask={addTask} tasks={tasks} />}></Route>
//               </Routes>
//           </div>

//         </div>

//     </div>
//     </BrowserRouter>

//   );
// }

// export default App;
