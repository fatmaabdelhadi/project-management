import { useState, useEffect } from "react";
import "./App.css";
import "./variables.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ProjectSettings from "./Components/Dashboard/ProjectSettings";
import AccountHome from "./Components/Account/AccountHome";
import LandingPage from "./Components/Landing/LandingPage";
import ContactUs from "./Components/Landing/ContactUs";
import CreateProject from "./Components/Create/CreateProject";

function App() {
  const [isSigned, setSignStatus] = useState(false);
  const [currentProject, setCurrentProject] = useState(() => {
    const savedProject = JSON.parse(localStorage.getItem("currentProject"));
    return savedProject || { projectID: "", projectName: "" };
  });

  useEffect(() => {
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
  }, [currentProject]);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="Layout">
          <Routes>
            {/* Guest Layout */}
            <Route element={<GuestLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/logIn" element={<LogIn />} />
            </Route>

            {/* User Layout */}
            <Route
              element={<UserLayout currentProject={currentProject} />}
              className="Content"
            >
              <Route path="/:username" element={<AccountHome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard/" element={<Dashboard />} />
              <Route path="/dashboard/:projectID" element={<Dashboard />} />

              <Route path="/create-tasks/" element={<CreateTasks />} />
              <Route
                path="/create-tasks/:projectID"
                element={<CreateTasks />}
              />
              <Route
                path="/create-network/:projectID"
                element={<CreateNetwork />}
              />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/project-settings/" element={<ProjectSettings />} />
              <Route
                path="/project-settings/:projectID"
                element={<ProjectSettings />}
              />
              <Route path="/account-settings/" element={<AccountSettings />} />
            </Route>
          </Routes>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
        crossorigin
      ></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossorigin
      ></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin
      ></script>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
      />
    </BrowserRouter>
  );
}

export default App;
