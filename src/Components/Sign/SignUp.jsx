import React from 'react'
import "./Sign.css"
import { NavLink } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='background'>
      <div className='filter'></div>
      <div className='formLayout'>
        <form className='signUp form' onSubmit={(e) => e.preventDefault()} >
          <div>
            <h2>Create New Account</h2>
            <p>Already a member? <NavLink to='/logIn'>Log In</NavLink></p>
          </div>
        
        <div className='inputs'>
              <input type='text' id='full_name' placeholder='Full Name'/>
              <input type='text' id='username' placeholder='Username'/>
              <input type='email' id='email' placeholder='Email Address'/>
              <input type='password' id='password' placeholder='Password'/>
              <input type='password' placeholder='Repeat Password'/>
          </div>
        <button type='submit'>Create Account</button>
        </form>
      </div>
    </div>
  )
}
