import React from "react";
import "../styles/Homepage.css";
import students from "../images/students.svg";
import Github from "../images/github.png";
import LinkedIn from "../images/linkedin.png";
import Instagram from "../images/instagram.png";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div className="Intro" id="Intro">
      {/* left name side */}
      <div className="i-left">
        <div className="i-name">
          <span>Welcome To</span>
          <span>Global Coding Club</span>
          <span>
            Self-learning is the key to unlocking the world of coding, enabling
            you to embark on projects that lead to remarkable achievements.
          </span>
        </div>
        <div className="i-icons">
          <a href="https://github.com/KIET-SpecialCodingBatch">
            <img src={Github} alt="Github" />
          </a>
          <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A90519816&keywords=global%20coding%20club%20%40kiet&origin=RICH_QUERY_SUGGESTION&position=0&searchId=d455fa41-a741-48f1-ad97-89cc97d28eff&sid=L7W&spellCorrectionEnabled=false">
            <img src={LinkedIn} alt="LinkedIn" />
          </a>
          <a href="https://www.instagram.com/kiet_global_coding_club/?hl=en">
            <img src={Instagram} alt="Instagram" />
          </a>
        </div>
      </div>
      {/* right image side */}
      <div className="i-right">
        <img src={students} alt="Students" />
        <div className="blur"></div>
      </div>
    </div>
  );
};

export default Home;
