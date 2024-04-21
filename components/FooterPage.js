import React from "react";
import "../styles/FooterPage.css";
import logo from "../images/favicon.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from '@mui/icons-material/GitHub';

function FooterPage() {
  return (
    <div className="footer">
      <div className="footer-left">
        <div className="logo">
          <img src={logo} className="logo_img" alt="logo" />
        </div>
        <div className="description">A club for Achievements and milestones</div>
        <div className="social-media-icons">
          <a href="https://www.instagram.com/kiet_global_coding_club/">
            <InstagramIcon />
          </a>
          <a href="https://www.linkedin.com/company/kiet-special-coding/">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/KIET-SpecialCodingBatch">
            <GitHubIcon />
          </a>
          <p>Contact Us - globalcodingclubkiet@gmail.com </p> 
        </div>
      </div>
      <div className="footer-right">
        <h2>Contact Developers</h2>
        <div className="developer">
          <div className="developer-name">Praveen kumar P</div>
          <div className="developer-email">praveenkumarpalaboyina@gmail.com</div>
        </div>
        <div className="developer">
          <div className="developer-name">Swetha P</div>
          <div className="developer-email">swethapoppoppu@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

export default FooterPage;
