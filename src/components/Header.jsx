/* eslint-disable no-unused-vars */
// Header.jsx

import React, { useState, useEffect } from "react";
import "../Styles/style.css";

const Header = () => {
  const [activeLink, setActiveLink] = useState("hero"); // Set default active link
  const [isNavOpen, setIsNavOpen] = useState(false);


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

  return (
    <nav id="navbar" className={`navbar ${isNavOpen ? "navbar-mobile" : ""}`} style={{ padding: "0" }}>
      <div
        className="container  align-items-center justify-content-between "
        style={{padding:"0" }}
      >
        <div className="logo">
          <h1 className="text-light">
            <a href="/">
              <span style={{fontSize: "20px"}}>Crowd Funding</span>
            </a>
          </h1>
        </div>

        <ul>
          <li>
            <a
              className={`nav-link scrollto ${
                activeLink === "hero" ? "active" : ""
              }`}
              href="/"
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
            >
              Contact
            </a>
          </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" onClick={toggleNav}></i>
      </div>
    </nav>
  );
};

export default Header;
