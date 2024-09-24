import React from 'react';  
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";
import "../Styles/testimonials.css"

// Unique images
import event1Img from "../assets/Jain Kashi Mudbidri South Kannad Karnataka.jpg";
import event2Img from "../assets/img/home/yak.jpg";
import event3Img from "../assets/kola.jpg";
import event5Img from "../assets/img/home/dasara.jpg";

// Custom Arrow component
const Arrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",               // Use flexbox to center content
        justifyContent: "center",       // Center horizontally
        alignItems: "center",           // Center vertically
        background: "#333",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        zIndex: 3
      }}
      onClick={onClick}
    >
      <span className="arrow-icon"  />
    </div>
  );
};

const Testimonials = () => {
  const settings = {
    dots: true,            // Disable navigation dots
    infinite: true,         // Loop through slides
   speed: 700,             // Transition speed
    slidesToShow: 3,        // Show 3 slides at once
    centerMode: true,       // Center the active slide
    centerPadding: '5%',   // Padding to allow partial visibility of side slides
    slidesToScroll: 1,      // Scroll 1 slide at a time
    autoplay: true,         // Auto-slide
    autoplaySpeed: 3000,    // Slide interval (in ms)
    prevArrow: <Arrow />,   // Custom previous arrow
    nextArrow: <Arrow />,   // Custom next arrow
    responsive: [
      {
        breakpoint: 768,  // For tablet and mobile screens
        settings: {
          slidesToShow: 3,  // Show only 1 slide
          centerMode: true,
          centerPadding: '0',  // No padding for the sides
        
        }
      }
    ]
  };

  return (
    <div className="container">
      <div className="section-title" data-aos="fade-in" data-aos-delay="100">
        <h2>EVENTS!</h2>
        <p
        style={{color:"Black"}}
         >
          Events happening around Daskhina Kannada!
        </p>
      </div>
      
      <Slider {...settings}>
        <div className="carousel-slide">
          <a href="https://karnatakatourism.org/tour-item/dakshina-kannada/" target="_blank" rel="noopener noreferrer">
            <img src={event1Img} alt="Event 1" className="carousel-image" />
          </a>
          <div className="event-description">
            <h3>Jain Kashi Moodbidri</h3>
          </div>
        </div>
        <div className="carousel-slide">
          <a href="https://karnatakatourism.org/tour-item/dakshina-kannada/" target="_blank" rel="noopener noreferrer">
            <img src={event2Img} alt="Event 2" className="carousel-image" />
          </a>
          <div className="event-description">
            <h3>Yakshagana</h3>
          </div>
        </div>
        <div className="carousel-slide">
          <a href="https://karnatakatourism.org/tour-item/dakshina-kannada/" target="_blank" rel="noopener noreferrer">
            <img src={event3Img} alt="Event 3" className="carousel-image" />
          </a>
          <div className="event-description">
            <h3>Kola</h3>
          </div>
        </div>
        
        <div className="carousel-slide">
          <a href="https://karnatakatourism.org/tour-item/dakshina-kannada/" target="_blank" rel="noopener noreferrer">
            <img src={event5Img} alt="Event 5" className="carousel-image" />
          </a>
          <div className="event-description">
            <h3>Dasara</h3>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Testimonials;
