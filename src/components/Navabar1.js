import React from "react";
import "../styles/Navbar.css";
import logo from "../images/favicon.png";

import { useNavigate } from "react-router-dom";
function Navbar1() {
    const navigate=useNavigate()
    const handlechange=()=>{
        navigate('/')
     }
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} onClick={handlechange} className="logo_img" alt="logo" />
      </div>
    </div>
  );
}

export default Navbar1;
