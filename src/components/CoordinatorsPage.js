import React from "react";
import "../styles/CoordinatorsPage.css";
import facultyimage from "../images/facultyimage.png";
import swetha from "../images/swetha.jpg";
import sarika1 from "../images/sarika1.png";
import raghu from "../images/raghu.png";
import lasya from "../images/lasya.png";
import surendra from "../images/surendra.jpg";
import tapaswi from "../images/tapaswi.jpg";
import vamsi from "../images/vamsi.png";
import pk from "../images/pk.jpg";
import reddy from "../images/reddy.jpg";
import mouni from "../images/mouni.jpg";
import praveen from "../images/praveen.jpeg";
import pola from "../images/pola.jpeg";
import swethap from "../images/swetha.jpeg";
import sai from "../images/sai.jpeg";



const coordinatorsData = [
  {
    name: "Raghavendra KIET CSC",
    image: raghu,
  },
  {
    name: "Peri Reddy KIET AID",
    image: reddy,
  },
  {
    name: "Sarika KIEW AID",
    image: sarika1,
  },
  {
    name: "Lasya KIEW CAI",
    image: lasya,
  },
  {
    name: "Swetha KIEW CAI",
    image: swethap,
  },
  {
    name: "Praveen Kumar IIITH Alumini",
    image: praveen,
  },
  
  {
    name: "Sai Kumar IIITH Alumini",
    image: sai,
  },
  // {
  //   name: "Pavan Kalyan KIET",
  //   image: pk,
  // },
  // {
  //   name: "Vamsi KIET",
  //   image: vamsi,
  // },
  {
    name: "Surendra KIET",
    image: surendra,
  },
  {
    name: "Mounika KIET",
    image: mouni,
  },
  // {
  //   name: "Tapaswi KIETW",
  //   image: tapaswi,
  // },
];

function CoordinatorsPage() {
  return (
    <div className="coordinators-page">
      <h2>Our Coordinating Team</h2>
      <div className="coordinator-container">
        {coordinatorsData.map((coordinator, index) => (
          <div className="coordinator" key={index}>
            <img
              src={coordinator.image}
              alt={coordinator.name}
              className="coordinator-image"
            />
            <h3>{coordinator.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoordinatorsPage;
