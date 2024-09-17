/* eslint-disable no-unused-vars */
// Header.jsx

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "../Styles/style.css";
import logo from "../assets/logo.png";

const Header = () => {
  const [activeLink, setActiveLink] = useState("hero"); // Set default active link
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation(); // Get the current route


  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50; // Adjusted for header height

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveLink(section.getAttribute("id"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

const toggleNav = () => {
  setIsNavOpen(!isNavOpen);
};


const handleNavLinkClick = () => {
  if (window.innerWidth <= 768) {
    setIsNavOpen(false); // Close the nav on mobile after clicking a link
  }
};

const isDescriptionPage = location.pathname.startsWith("/description");

  return (
    <nav id="navbar" className={`navbar ${isNavOpen ? "navbar-mobile" : ""}`} style={{ padding: "0" }}>
      <div
        className="container  align-items-center justify-content-between "
        style={{padding:"0" }}
      >
        
         <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Crowd Funding Logo"
              style={{ width: "40px", height: "40px", marginRight: "3px" , marginTop: "-10px"}}
            />
            <h1 className="text-light" style={{ fontSize: "20px" }}>
              Crowd Funding
            </h1>
          </a>
        </div>

        {!isDescriptionPage &&  (
          <>

        <ul>
          <li>
            <a
              className={`nav-link scrollto ${
                activeLink === "hero" ? "active" : ""
              }`}
              href="#hero"
              onClick={handleNavLinkClick}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={`nav-link scrollto ${
                activeLink === "about" ? "active" : ""
              }`}
              href="#services"
              onClick={handleNavLinkClick}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              className={`nav-link scrollto ${
                activeLink === "portfolio" ? "active" : ""
              }`}
              href="#portfolio"
              onClick={handleNavLinkClick}
            >
              Donate
            </a>
          </li>
          <li>
            <a
              className={`nav-link scrollto ${
                activeLink === "how" ? "active" : ""
              }`}
              href="#how"
              onClick={handleNavLinkClick}
            >
              Raise Fund
            </a>
          </li>
          
          <li>
            <a
              className={`nav-link scrollto ${
                activeLink === "team" ? "active" : ""
              }`}
              href="#testimonials"
              onClick={handleNavLinkClick}
            >
              Events
            </a>
          </li>
         
          
          <li>
            <a
              className={`nav-link scrollto ${
                activeLink === "contact" ? "active" : ""
              }`}
              href="#contact"
              onClick={handleNavLinkClick}
            >
              Contact
            </a>
          </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" onClick={toggleNav}></i>
        </>
      )}
      </div>
            
    </nav>
  );
};

export default Header;
