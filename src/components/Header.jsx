import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Styles/style.css";
import logo from "../assets/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [activeLink, setActiveLink] = useState("hero");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;

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
      setIsNavOpen(false);
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const isDescriptionPage = location.pathname.startsWith("/description");
  const isCompleteDetails = location.pathname.startsWith("/completeDetails");

  return (
    <nav id="navbar" className={`navbar ${isNavOpen ? "navbar-mobile" : ""}`} style={{ padding: "0" }}>
      <div className="container align-items-center justify-content-between" style={{ padding: "0" }}>
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Crowd Funding Logo"
              style={{ width: "40px", height: "30px", marginRight: "3px", marginTop: "-10px" }}
            />
            <h1 className="text-light" style={{ fontSize: "20px" }}>
              Crowd Funding
            </h1>
          </a>
        </div>

       

        {!isDescriptionPage && !isCompleteDetails && (
          <>
            <ul>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === "hero" ? "active" : ""}`}
                  href="#hero"
                  onClick={handleNavLinkClick}
                >
                  {t("home").charAt(0).toUpperCase() + t("home").slice(1)}
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === "about" ? "active" : ""}`}
                  href="#services"
                  onClick={handleNavLinkClick}
                >
                  {t("aboutUs").charAt(0).toUpperCase() + t("aboutUs").slice(1)}
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === "portfolio" ? "active" : ""}`}
                  href="#portfolio"
                  onClick={handleNavLinkClick}
                >
                  {t("donate").charAt(0).toUpperCase() + t("donate").slice(1)}
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === "how" ? "active" : ""}`}
                  href="#how"
                  onClick={handleNavLinkClick}
                >
                  {t("raiseFund").charAt(0).toUpperCase() + t("raiseFund").slice(1)}
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === "team" ? "active" : ""}`}
                  href="#testimonials"
                  onClick={handleNavLinkClick}
                >
                  {t("events").charAt(0).toUpperCase() + t("events").slice(1)}
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === "contact" ? "active" : ""}`}
                  href="#contact"
                  onClick={handleNavLinkClick}
                >
                  {t("contact").charAt(0).toUpperCase() + t("contact").slice(1)}
                </a>
              </li>

              
                <li >
                <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="kn">Kannada</option>
          </select>
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
