import React from "react";
import '../styles/FacultyPage.css';
import facultyimage from "../images/facultyimage.png";
import rksir from "../images/rksir.jpg";
import revathimam from "../images/revathimam.jpg";
import dean from "../images/dean.jpg";
import PKP from "../images/PKP.jpg";
import gopisir from "../images/gopisir.jpg";

const facultyData = [
  {
    name: "Rama krishna sir",
    image: rksir,
    description: "Principal KIET W",
  },
  {
    name: "Revathi mam ",
    image: revathimam,
    description: "Principal KIET",
  },
  {
    name: "Gopi Sir ",
    image: gopisir,
    description: "vice-principal KIET",
  },
  {
    name: "Somesh Sir ",
    image: facultyimage,
    description: "Incharge Programs GCC",
  },
  {
    name: "Ramkiran Sir",
    image: dean,
    description: "Dean Academics KIET",
  },

];

function FacultyPage() {
  return (
    <div className="faculty-page">
      <h2>Our Faculty</h2>
      <div className="faculty-container">
        {facultyData.map((faculty, index) => (
          <div className="faculty" key={index}>
            <img
              src={faculty.image}
              alt={faculty.name}
              className="faculty-image"
            />
            <h3>{faculty.name}</h3>
            <p className="faculty-description">{faculty.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyPage;
