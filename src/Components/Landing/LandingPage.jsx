import "./Landing.css"
import { NavLink } from "react-router-dom"
import { React, useState } from "react"
import { FaTasks, FaUsers, FaChartLine } from 'react-icons/fa'

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="landingFilter"></div>
      <section className="HeroSection">
        <h2>Manage Your Projects Efficiently</h2>
        <p>Stay organized and achieve your goals with our project management tool.</p>
        <button className="landingButton">
          <NavLink to="/signup" className="landingNavLink">Get Started</NavLink>
        </button>
      </section>
      <section className="FeatureSection">
        <h1>Features</h1>
        <div className="Feature">
          <FaTasks size={50} color="#4CAF50" />
          <h4>Task Management</h4>
          <p>Organize and prioritize your tasks easily.</p>
        </div>
        <div className="Feature">
          <FaUsers size={50} color="#2196F3" />
          <h4>Team Collaboration</h4>
          <p>Work together with your team in real-time.</p>
        </div>
        <div className="Feature">
          <FaChartLine size={50} color="#FFC107" />
          <h4>Progress Tracking</h4>
          <p>Monitor your project's progress and performance.</p>
        </div>
      </section>
      <p className="footer">&#169; Focus Hive EG. All rights reserved.</p>
    </div>
  )
}