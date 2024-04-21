import React, { useRef } from 'react';
import { Container } from '@mui/material';
import Navbar from '../components/Navbar';
import AboutPage from '../components/AboutPage';
import FacultyPage from '../components/FacultyPage';
import CoordinatorsPage from '../components/CoordinatorsPage';
import ProjectsPage from "../components/ProjectsPage";
import Footer from "../components/FooterPage";
import Home from "../components/Homepage";

const Homepage = () => {
    const aboutRef = useRef(null);
    const facultyRef = useRef(null);
    const coordinatorsRef = useRef(null);
    const projectsRef = useRef(null);

    const scrollToRef = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <Navbar
                scrollToAbout={() => scrollToRef(aboutRef)}
                scrollToFaculty={() => scrollToRef(facultyRef)}
                scrollToCoordinators={() => scrollToRef(coordinatorsRef)}
                scrollToProjects={() => scrollToRef(projectsRef)}
            />
            <Home />
            <Container>
                <div ref={aboutRef}>
                    <AboutPage />
                </div>
                <div ref={facultyRef}>
                    <FacultyPage />
                </div>
                <div ref={coordinatorsRef}>
                    <CoordinatorsPage />
                </div>
                <div ref={projectsRef}>
                    <ProjectsPage />
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default Homepage;
