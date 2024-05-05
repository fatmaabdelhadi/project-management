import React from 'react'
import { NavLink } from 'react-router-dom'

export function LogIn() {
  return (
    <div className='background loginPage'>
      <div className='filter'></div>
      <div className='formLayout loginLayout'>
        <form className='signUp login form' onSubmit={(e) => e.preventDefault()} >
          <div>
            <h2>Login</h2>
            <p>New Here? <NavLink to='/signUp'>Create New Account</NavLink></p>
          </div>
        
        <div className='inputs'>
              <input type='email' id='email' placeholder='Email Address'/>
              <input type='password' id='password' placeholder='Password'/>
          </div>
        <button type='submit'>Log In</button>
        </form>
      </div>
    </div>
  )
}
