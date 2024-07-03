import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function Slider() {
  const [index, setIndex] = useState(0);
  const pdmImg = require("../../Assets/pm.png");
  const perImg = require("../../Assets/performance.png");
  const taskImg = require("../../Assets/task.png");

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="slider">
      <Carousel.Item>
        <div className="d-flex justify-content-center">
          <img className="SliderImg" src={pdmImg} alt="Project Management" />
        </div>
        <Carousel.Caption>
          <h3>Project Management</h3>
          <p>Manage your project easily and with our features.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex justify-content-center">
          <img className="SliderImg" src={perImg} alt="Team Contribution" />
        </div>
        <Carousel.Caption>
          <h3>Team Followup</h3>
          <p>Follow up on your contributors' performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex justify-content-center">
          <img className="SliderImg" src={taskImg} alt="Task Management" />
        </div>
        <Carousel.Caption>
          <h3>Task Management</h3>
          <p>Assign tasks to your contributors and follow up on deadlines.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
