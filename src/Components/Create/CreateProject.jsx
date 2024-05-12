import React, { useState } from 'react'
import { NavLink, redirect } from 'react-router-dom'
import { useForm } from "react-hook-form";
import "./Create.css"
import Input from '../Input/Input'
import axios from 'axios';

export default function CreateProject() {
    const projectTemplate = {
        "projectName": "",
        "projectDescription": "",
        "projectManager": "66351fd740946cd8ea2c13c9"
    }
    const [projectData, setProjectDate] = useState(projectTemplate)

    const { formState: { errors } } = useForm();

    // Function to handle changes in the input fields
    const handleChange = (event) => {
        console.log("d")
    const { name, value } = event.target;
    if (!event.target.value) {
      alert("You Must fill all required fields")
    } else {
      setProjectDate((projectData) => ({
        ...projectData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(projectData)
    //   const url = 'https://pm-platform-backend.onrender.com/api/projects/create/'
    //   axios.post(url, projectData)
    //     .catch((err) => {
    //       alert(err.message)
    //     })
    }
    
    return (
        <div className='createProjectComponent'>
            <div className='createProjectLayout'>
                <div>
                    <h2>Create a New Project</h2>
                    <p className='grey'>Start managing your project in few minutes</p>
                </div>
                <form id='createProjectForm' onSubmit={handleSubmit} className='createProject'>
                    <div className='row'>
                        <label htmlFor='projectName' className='bold'>Project Name <span className='star'>*</span></label>
                        {/* <input name='projectName' type='text' required /> */}
                        <Input onChange={handleChange}  id='projectName' type='text' required='required' errorMessage='Fill all required fields' />
                    </div>
                    <div className='row'>
                        <label htmlFor='projectDescription' className='bold'>Project Description</label>
                        {/* <input name='projectDescription' type='text' style={{ height: '100px'}}></input> */}
                        <Input onChange={handleChange} inputStyle={{ height: '100px'}} id='projectDescription' type='text' required='required' />
                    </div>  
                                        <input type='submit' form='createProjectForm' value='Next' onClick={handleSubmit} />

                </form>

            <div className='createNavigationButtons'>
                <div></div>
                <NavLink
                        to='/create-tasks'
                        key='create-tasks'
                >
                    <input type='submit' form='createProjectForm' value='Next' onClick={handleSubmit} />
                </NavLink>
            </div>
            </div>

           
    </div>
    )
}
