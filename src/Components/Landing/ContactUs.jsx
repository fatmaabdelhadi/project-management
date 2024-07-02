import React from "react";
import "./Contact.css";

const fatma = require("../../Assets/fatma.jpeg")
const ganna = require("../../Assets/ganna.jpeg")
const hadeer = require("../../Assets/hadeer.jpeg")


const developers = [
  {
    photo: fatma,
    name: 'Fatma AbdelHadi',
    linkedin: 'https://www.linkedin.com/in/fatmaabdelhad1',
    github: 'https://github.com/fatmaabdelhadi',
    email: 'mailto: fatmaabdelhadi2002@gmail.com',
    phone: '011 2339 2100'
  },
  {
    photo: ganna,
    name: 'Ganna Mohamed',
    linkedin: 'https://www.linkedin.com/in/ganna-mohamed-b04807240/',
    github: 'https://github.com/GannaMohamed',
    email: 'mailto: gannamohamed7776@gmail.com',
    phone: '012 7413 9381'
  },
  {
    photo: hadeer,
    name: 'Hadeer Mamdouh',
    linkedin: 'https://www.linkedin.com/in/hadeer-mam-43a5a324a/',
    github: 'https://github.com/HadeerMamdouh',
    email: 'mailto: mamhadeer@gmail.com',
    phone: '011 1565 6057'
  }
]

export default function ContactUs() {
  document.title = "Contact Us";
  return (
    <div className="contact-us contactPage">
      <div className="developer-list">
        {developers.map((developer, index) => (
          <div key={index} className="developer">
            <img src={developer.photo} alt={developer.name} className="developer-photo" />
            <h3>{developer.name}</h3>
            <div className="icons">
              <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={developer.github} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href={developer.email} target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
            <p>
              <i className="fa-solid fa-phone phone"></i><span>{developer.phone}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}