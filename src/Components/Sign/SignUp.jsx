import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { loginUser } from "../../Services/UserModel"
import "./Sign.css"

export default function SignUp() {
  const [fullName, setFullName] = useState("") // State for full name
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [jobTitle, setJobTitle] = useState("") // State for job title
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== repeatPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      const response = await axios.post(
        "https://pm-platform-backend.onrender.com/api/users/signup",
        {
          username,
          email,
          password,
          profile: {
            fullName,
            jobTitle // Include jobTitle in the profile object
          }
        }
      )

      loginUser(response.data)

      navigate("/logIn")
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } else {
        setError("Sign up failed. Please try again.")
      }
      console.error(
        "Error signing up:",
        error.response ? error.response.data : error
      )
    }
  }

  return (
    <div className="background">
      <div className="filter"></div>
      <div className="formLayout">
        <form className="signUp form" onSubmit={handleSubmit}>
          <div>
            <h2>Create New Account</h2>
            <p>
              Already a member? <NavLink to="/logIn">Log In</NavLink>
            </p>
          </div>

          <div className="inputs">
            <input
              type="text"
              id="full_name"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <input
              type="text"
              id="job_title"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Account</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  )
}