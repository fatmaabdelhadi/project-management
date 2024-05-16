import React, { useState } from 'react'
import { NavLink, Redirect, Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import "./Create.css"
import Input from '../Input/Input'
import axios from 'axios';
import { getIdFromResponse } from '../../functions';

export default function CreateProject() {
    const projectTemplate = {
        "projectName": "",
        "projectDescription": "",
        "projectManager": "66351fd740946cd8ea2c13c9"
    }
    const [projectData, setProjectDate] = useState(projectTemplate)
    const [projectID, setProjectID] = useState('')
    const { formState: { errors } } = useForm();
    const [redirect, setRedirect] = useState(false);

    // Function to handle changes in the input fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProjectDate((projectData) => ({
            ...projectData,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        // let id
        // event.preventDefault();
        // if (projectData.projectName) {
        //     const url = 'https://pm-platform-backend.onrender.com/api/projects/create/'
        //     axios.post(url, projectData)
        //         .then((res) => {
        //             console.log(res.data)
        //             id = getIdFromResponse(res.data)
        //             setProjectID(id)
        //             console.log(id)
        //             setRedirect(true)
        //         })
        //         .then(() => {
        //             //   this.props.history.push(`/create-tasks/${id}`)

        //         })
        //     .catch((err) => {
        //         console.log(err.message)
        //         alert(err.message)
        //     })
        // } else {
        //     alert('Project Name cannot be empty')
        // }

      
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
                        <label htmlFor='projectName' onChange={handleChange} className='bold'>Project Name <span className='star'>*</span></label>
                        <input name='projectName' onChange={handleChange} type='text' required />
                        {/* <Input onChange={handleChange}  id='projectName' type='text' required='required' errorMessage='Fill all required fields' /> */}
                    </div>
                    <div className='row'>
                        <label htmlFor='projectDescription' className='bold'>Project Description</label>
                        <input name='projectDescription' type='text' style={{ height: '100px'}}></input>
                        {/* <Input onChange={handleChange} inputStyle={{ height: '100px'}} id='projectDescription' type='text' required='required' /> */}
                    </div>  
                    {/* <input type='submit' form='createProjectForm' value='Next' onClick={handleSubmit} /> */}

                </form>

            <div className='createNavigationButtons'>
                <div></div>
                <NavLink
                        // to='/create-tasks/'
                        to='/create-tasks/6638cb129ebc1e809dd23fe4'
                        key='create-tasks'
                    >
                        {/* {redirect && <Navigate to={`/create-tasks/${projectID}`} />} */}
                    <input type='submit' form='createProjectForm' value='Next' onClick={handleSubmit} />
                </NavLink>
            </div>
            </div>

           
    </div>
    )
}
