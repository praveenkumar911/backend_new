import React from "react";
import "../styles/ProjectsPage.css";
import aichatbot from "../images/aichatbot.svg";
import mlprediction from "../images/mlprediction.svg";
import datascienceanalysis from "../images/datascienceanalysis.svg";
import webapplications from "../images/webapplications.svg";

const projectsData = [
  {
    name: "AI Chatbot",
    description: "A conversational AI chatbot for customer support.",
    image: aichatbot,
  },
  {
    name: "Machine Learning Predictions",
    description:
      "Predictive models for various applications using machine learning techniques.",
    image: mlprediction,
  },
  {
    name: "Data Science Analysis",
    description:
      "Exploratory data analysis and insights for business intelligence.",
    image: datascienceanalysis,
  },
  {
    name: "Full Stack Web Application",
    description:
      "A complete web application with front-end and back-end development.",
    image: webapplications,
  },
];

function ProjectsPage() {
  return (
    <div className="projects-page">
      <h2>Projects We Take Up</h2>
      <div className="project-list">
        {projectsData.map((project, index) => (
          <div className="project" key={index}>
            <img
              src={project.image}
              alt={project.name}
              className="project-image"
            />
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
