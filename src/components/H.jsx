import { useEffect, useRef } from "react";
import Header from "../components/Header.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Statistics from "../components/Statistics.jsx";
import Portfolio from "../components/Portfolio.jsx";
import About from "../components/About.jsx";
import Action from "../components/Action.jsx";
import Services from "../components/Services.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Faq from "./Faq";
import Contact from "../components/Contact.jsx";
import Footers from "../components/Footers.jsx";
import "../Styles/style.css";
import kamblaImage from "../assets/img/home/kambla.jpg";
import huliImage from "../assets/img/home/huli.jpg";
import fishermanImage from "../assets/img/home/fisherman.jpeg";
import amrithShettyImage from "../assets/img/home/amrith-shetty-yxfgsX1rlNM-unsplash.jpg";
import didupeWaterfallsImage from "../assets/img/home/Didupe-waterfalls46091.jpg";

const images = [
  kamblaImage,
  huliImage,
  fishermanImage,
  amrithShettyImage,
  didupeWaterfallsImage,
];
const H = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const slides = carouselRef.current.children;
    let currentSlide = 0;

    const interval = setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="head fixed-top header-transparent">
        <header id="header">
          <Header />
        </header>
      </div>
      <section id="hero" className="hero">
        <div className="carousel" ref={carouselRef} style={{height: "100vh"}}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="hero-text-container">
          <h1>Welcome to Dakshina Kannada Funding Portal</h1>
          <h2>Be the change maker</h2>
          <a href="#about" className="btn-get-started scrollto">
            <i className="bx bx-chevrons-down"></i>
          </a>
        </div>
      </section>

      <main id="main">

      <section id="services" className="services">
          <Services />
        </section>

        
        <section id="counts" className="counts  section-bg">
          <Statistics />
        </section>

        <section id="portfolio" className="portfolio">
          <Portfolio />
        </section>

        <section id="how">
          <About />
        </section>

        <section id="cta" className="cta">
          <Action />
        </section>

      
        <section id="testimonials" className="testimonials section-bg">
          <Testimonials />
        </section>

        <Faq />

        <section id="contact" className="contact section-bg">
          <Contact />
        </section>
      </main>
      <footer id="footer">
        <Footers />
      </footer>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default H;
