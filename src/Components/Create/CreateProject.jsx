import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Create.css";
import axios from "axios";
import { getIdFromResponse } from "../../functions";
import { getUserID } from "../../Services/UserModel";

export default function CreateProject() {
  const projectTemplate = {
    projectName: "",
    description: "",
    projectManager: getUserID(),
    teamMembers: [],
    tasks: [],
    startDate: new Date(),
    endDate: new Date(),
  };

  const [projectData, setProjectData] = useState(projectTemplate);
  const [projectID, setProjectID] = useState("");
  const {
    register,
    formState: { errors },
  } = useForm();
  const [redirect, setRedirect] = useState(false);

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData((prevProjectData) => ({
      ...prevProjectData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (projectData.projectName) {
      const url =
        "https://pm-platform-backend.onrender.com/api/projects/create/";
      axios
        .post(url, projectData)
        .then((res) => {
          console.log(res.data);
          const projectId = getIdFromResponse(res.data);
          setProjectID(projectId);
          console.log(projectId);
          setRedirect(true);
        })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
        });
    } else {
      alert("Project Name cannot be empty");
    }
  };

  return (
    <div className="createProjectComponent">
      <div className="createProjectLayout">
        <div>
          <h2>Create a New Project</h2>
          <p className="grey">Start managing your project in few minutes</p>
        </div>
        <form
          id="createProjectForm"
          onSubmit={handleSubmit}
          className="createProject"
        >
          <div className="row">
            <label htmlFor="projectName" className="bold">
              Project Name <span className="star">*</span>
            </label>
            <input
              name="projectName"
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div className="row">
            <label htmlFor="description" className="bold">
              Project Description
            </label>
            <input
              name="description"
              type="text"
              style={{ height: "100px" }}
              onChange={handleChange}
            ></input>
          </div>
        </form>

        <div className="createNavigationButtons">
          <div></div>
          <NavLink to={`/create-tasks/${projectID}`} key="create-tasks">
            {redirect && (
              <Navigate to={`/create-tasks/${projectID}`} replace={true} />
            )}
            <input
              type="submit"
              form="createProjectForm"
              value="Next"
              onClick={handleSubmit}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
