
import React from 'react';
import logo from "../images/favicon.png";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";



function Navbar({ scrollToAbout, scrollToFaculty, scrollToCoordinators, scrollToProjects }) {
  const navigate=useNavigate()
  const  handlechange=()=>{
    navigate('/choose')
  }
    return (
        <Box className="navbar" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
            <Link to="/">
                <div className="logo">
<img src={logo} className="logo_img" alt="logo" />
</div>
            </Link>
            <div className="nav-items">
                
                <a onClick={scrollToAbout}>About</a>
                <a onClick={scrollToFaculty}>Faculty</a>
                <a onClick={scrollToCoordinators}>Coordinators</a>
                <a onClick={scrollToProjects}>Projects</a>
                <a onClick={handlechange}>Login</a>
            </div>
        </Box>
    );
}

export default Navbar;
