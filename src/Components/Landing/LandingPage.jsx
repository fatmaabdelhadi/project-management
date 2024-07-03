import "./Landing.css";
import { NavLink } from "react-router-dom";
import { React, useState } from "react";
import { FaTasks, FaUsers, FaChartLine } from "react-icons/fa";
import Slider from "./Slider";
export default function LandingPage() {
  let progressImg = require("../../Assets/progress.svg").default;
  let teamImg = require("../../Assets/team.svg").default;
  let taskImg = require("../../Assets/taskmg.svg").default;

  return (
    <div className="LandingPage">
      <div className="landingFilter"></div>
      <section className="HeroSection d-flex">
        <div className="SliderContainer">
          <Slider />
        </div>
        <div>
          {/* <div className="SliderContainer"> */}
          {/* </div> */}
          <div>
            <h2>Manage Your Projects Efficiently</h2>

            <p>
              Stay organized and achieve your goals with our project management
              tool.
            </p>
            <button className="landingButton">
              <NavLink to="/signup" className="landingNavLink">
                Get Started
              </NavLink>
            </button>
          </div>
        </div>
      </section>
      <section className="FeatureSection">
        <h1>Features</h1>
        <div className="d-flex flex-wrap data-container">
          <div className="Feature btn">
            <img src={progressImg} alt="" />
            {/* <FaTasks class size={50} color="#4CAF50" /> */}
            <h4>Task Management</h4>
            <p>Organize and prioritize your tasks easily.</p>
          </div>
          <div className="Feature btn">
            <img src={teamImg} alt="" />

            {/* <FaUsers size={50} color="#2196F3" /> */}
            <h4>Team Collaboration</h4>
            <p>Work together with your team in real-time.</p>
          </div>
          <div className="Feature btn">
            <img src={taskImg} alt="" />

            {/* <FaChartLine size={50} color="#FFC107" /> */}
            <h4>Progress Tracking</h4>
            <p>Monitor your project's progress and performance.</p>
          </div>{" "}
        </div>
      </section>
      <p className="footer">&#169; Focus Hive EG. All rights reserved.</p>
    </div>
  );
}
