import React from "react";
import "./Contact.css";

const developers = [
  {
    name: 'Fatma AbdelHadi',
    linkedin: 'https://www.linkedin.com/in/fatmaabdelhad1',
    github: 'https://github.com/fatmaabdelhadi'
  },
  {
    name: 'Ganna Mohamed',
    linkedin: 'https://www.linkedin.com/in/ganna-mohamed-b04807240/',
    github: 'https://github.com/GannaMohamed'
  },
  {
    name: 'Hadeer Mamdouh',
    linkedin: 'https://www.linkedin.com/in/hadeer-mam-43a5a324a/',
    github: 'https://github.com/HadeerMamdouh'
  }
];

export default function ContactUs() {
  document.title = "Contact Us";
  return (
    <div className="contact-us contactPage">
      <div className="developer-list">
        {developers.map((developer, index) => (
          <div key={index} className="developer">
            <h3>{developer.name}</h3>
            <div className="icons">
            <p>
              <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </p>
            <p>
              <a href={developer.github} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
