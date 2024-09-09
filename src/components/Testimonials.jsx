/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';  
  
const Testimonials = () => {
  const apiUrl = import.meta.env.VITE_DATABASE_URL;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  })

  const getEvents = async() => {
    const response = await fetch(`${apiUrl}/users/getApprovedData`);
    let result = await response.json();
    if (response.status === 200)
    {
      const upcomingEvents = result.filter((event) => new Date(event.sdate) > new Date());
      setEvents(upcomingEvents);
    }
  }

  return (
    <div className="container">
      <div className="section-title" data-aos="fade-in" data-aos-delay="100">
        <h2>EVENTS!</h2>
        <p style={{ color: "black" }}>
          Discover the exciting events coming up in our district. Stay informed
          about the latest initiatives and be a part of the community's growth
          and development.
        </p>
      </div>

      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {events.length > 0 &&
            events.map((event, index) => (
              <>
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <p style={{ color: "black" }}>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        {event.description}
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                      <img
                        src={event.imagePath ? event.imagePath[0] : ""}
                        className="testimonial-img"
                        alt="Upcomming event"
                      />
                      <h3>{event.organizers}</h3>
                      <h4>
                        Starting: {new Date(event.sdate).toLocaleDateString()}
                      </h4>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            style={{ filter: "invert(100%)", color: "black" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            style={{ filter: "invert(100%)", color: "black" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
