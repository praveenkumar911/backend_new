import React, { useContext } from "react";
import "../styles/AboutPage.css";
import Card from "./Card";
import HeartEmoji from "../images/heartemoji.png";
import Glasses from "../images/glasses.png";
import Humble from "../images/humble.png";
import { motion } from "framer-motion";


const AboutPage = () => {
  
  const transition = {
    duration: 1,
    type: "spring",
  };
  return (
    <div className="services" id="services">
      {/* left side */}
      <div className="awesome">
        {/* dark mode */}
        <span >Who We Are??</span>
        <span>
      </span>
        <span>
        {/* Get to know our passionate coding enthusiasts and tech aficionados. */}
        </span>
        {/* <a href={Resume} download>
          <button className="button s-button">Download CV</button>
        </a> */}
        <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div>
      </div>
      {/* right */}
      <div className="cards">
        {/* first card */}
        <motion.div
          className="card1"
          initial={{ right: "2rem",}}
          whileInView={{ left: "25rem" }}
          transition={transition}
        >
          <Card
            emoji={HeartEmoji}
            heading={"Our Mission"}
            detail={"Uniting students for coding, collaboration, and innovation."}
          />
        </motion.div>
        {/* second card */}
        <motion.div
          initial={{ left: "-11rem", top: "12rem" }}
          whileInView={{ left: "1rem" }}
          transition={transition}
        >
          <Card
            emoji={Glasses}
            heading={"What We Do"}
            detail={"Exploring projects, tech stacks, and more."}
          />
        </motion.div>
        {/* 3rd */}
        <motion.div
          initial={{ top: "22rem", left: "25rem" }}
          whileInView={{ left: "22rem" }}
          transition={transition}
        >
          <Card
            emoji={Humble}
            heading={"Learning Opportunities"}
            detail={
              "Elevate your coding skills with us."
            }
            color="rgba(252, 166, 31, 0.45)"
          />
        </motion.div>
        <div
          className="blur s-blur2"
          style={{ background: "var(--purple)" }}
        ></div>
      </div>
    </div>
  );
};

export default AboutPage;
