import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser, logoutUser } from "../../Services/UserModel";

export function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://pm-platform-backend.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      // Store the token in localStorage
      loginUser(response.data);

      // Redirect to the Account Home page
      navigate("/accountHome");
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("Login failed. Please try again.");
      }
      console.error(
        "Error logging in:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="background loginPage">
      <div className="filter"></div>
      <div className="formLayout loginLayout">
        <form className="signUp login form" onSubmit={handleSubmit}>
          <div>
            <h2>Login</h2>
            <p>
              New Here? <NavLink to="/signUp">Create New Account</NavLink>
            </p>
          </div>

          <div className="inputs">
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
          </div>
          <button type="submit">Log In</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
