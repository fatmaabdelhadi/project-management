
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import SideMenu from './Components/SideMenu/SideMenu';
import Home from './Components/Account/AccountHome';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Network from './Components/Dashboard/Network'
import CreateTasks from './Components/Create/CreateTasks';
import CreateNetwork from './Components/Create/CreateNetwork';
import TaskList from './Components/TaskList/TaskList'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import TaskListRenderer from './Components/TaskList/TaskListRenderer';
import SignUp from './Components/Sign/SignUp';
import {LogIn} from './Components/Sign/LogIn'
import { UserLayout } from './Components/Layouts/UserLayout';
import { GuestLayout } from './Components/Layouts/GuestLayout';
import AccountSettings from './Components/Account/AccountSettings';
import ProjectSettings from './Components/Project/ProjectSettings';
import AccountHome from './Components/Account/AccountHome';
import LandingPage from './Components/Landing/LandingPage';
import ContactUs from './Components/Landing/ContactUs'

function App() {
  const [isSigned, setSignStatus] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <div className='Layout'>        
          <Routes>
            {/* Guest Layout */}
            <Route element={<GuestLayout />}>
              <Route path='/' element={<LandingPage/>}></Route>
              <Route path='/contact' element={<ContactUs/>}></Route>
              <Route path='/signUp' element={<SignUp></SignUp>}></Route>
              <Route path='/logIn' element={<LogIn></LogIn>}></Route>
            </Route>
            
            {/* User Layout */}
              <Route element={<UserLayout></UserLayout>} className='Content' >
                  <Route path='/:username' element={<AccountHome />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/dashboard' element={<Dashboard/>}/>
                  <Route path='/create-tasks' element={<CreateTasks />}/>
                <Route path='/create-network' element={<CreateNetwork />}/>
                <Route path='/account-settings' element={<AccountSettings />}/>
                <Route path='/project-settings' element={<ProjectSettings />}/>
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
