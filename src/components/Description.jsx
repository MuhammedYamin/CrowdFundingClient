/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../Styles/style.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footers.jsx";
import { useParams } from "react-router-dom";

const Description = () => {
  const { id, category } = useParams();
  const [itemDetails, setItemDetails] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails();
  }, []); // Added empty dependency array to avoid infinite loop

  const fetchItemDetails = async () => {
    let endpoint = "";
    switch (category) {
      case "events":
        endpoint = `http://localhost:2000/users/getApprovedEventDetails/${id}`;
        break;
      case "education":
        endpoint = `http://localhost:2000/users/getApprovedEducationDetails/${id}`;
        break;
      case "publicSpaces":
        endpoint = `http://localhost:2000/users/getApprovedPublicSpacesDetails/${id}`;
        break;
      case "health":
        endpoint = `http://localhost:2000/users/getApprovedHealthDetails/${id}`;
        break;
      default:
        console.error("Invalid category:", category);
        return;
    }

    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      setItemDetails(Array.isArray(result) ? result : [result]);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const calculateDaysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const daysFromNowToEnd = differenceInCalendarDays(end, now);
    return daysFromNowToEnd;
  };

  return (
    <>
      <header id="header" className="head fixed-top header-transparent">
        <Header />
      </header>
      {itemDetails.map((item, index) => (
        <section
          id="title"
          style={{
            width: "100%",
            height: "80vh",
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${
              item.imagePath ? item.imagePath[0] : ""
            }) top center`,
            backgroundSize: "cover",
            position: "relative",
            marginBottom: "-90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            backgroundRepeat: "no-repeat",
          }}
          key={index}
        >
          <div className="container">
            <h1 className="display-4 fst-italic">
              {item.name || item.schoolName || item.projectName}
            </h1>
            <p className="lead my-3">
              The {category === "events" ? "Organizers" : "fundraiser"} of this{" "}
              {category === "events" ? "event" : "project"} is{" "}
              {item.organizers || item.fundRaiserName}
            </p>
          </div>
        </section>
      ))}

      <main className="container my-5">
        {itemDetails.length > 0 && itemDetails[0].imagePath ? (
          <section id="testimonials" className="testimonials section-bg my-5">
            <div className="container">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {itemDetails.length > 0 &&
                    itemDetails[0]?.imagePath?.map((image, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <div className="swiper-slide">
                          <div className="testimonial-item">
                            <img
                              src={image}
                              className="img-fluid"
                              alt=""
                              style={{ width: "100%", borderRadius: "10px" }}
                            />
                          </div>
                        </div>
                      </div>
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
          </section>
        ) : (
          <></>
        )}

        {itemDetails.map((item, index) => (
          <div className="row g-5" key={index}>
            <div className="col-md-8">
              <article className="blog-post">
                <h2
                  className="display-5 link-body-emphasis mb-1"
                  style={{ color: "black" }}
                >
                  {item.name || item.schoolName || item.projectName}
                </h2>
                <p className="blog-post-meta" style={{ color: "black" }}>
                  {formatDate(item.edate)} by{" "}
                  {item.organizers || item.fundRaiserName}
                </p>
                <p style={{ color: "black" }}>{item.description}</p>
                <hr />
                <h2 style={{ color: "black" }}>Details</h2>
                <p style={{ color: "black" }}>
                  {item.details ||
                    "This is a detailed description of the project or event. It includes all relevant information that attendees or participants need to know."}
                </p>
                <blockquote
                  className="blockquote"
                  style={{
                    color: "black",
                    backgroundColor: "#f8f9fa",
                    padding: "1em",
                    borderRadius: "5px",
                  }}
                >
                  <p className="mb-0 text-dark">
                    {item.quote ||
                      "This is a sample quote related to the project or event."}
                  </p>
                </blockquote>
              </article>
            </div>

            <div className="col-md-4">
              <div className="position-sticky" style={{ top: "2rem" }}>
                <div className="p-4 mb-3 bg-light rounded">
                  <h4 className="fst-italic">Project Info</h4>
                  <p className="mb-0">
                    <strong>
                      Days Left:{" "}
                      {calculateDaysLeft(item.edate) < 0
                        ? 0
                        : calculateDaysLeft(item.edate)}{" "}
                      days
                    </strong>
                  </p>
                  <p className="mb-0">
                    <strong>Target: {item.amount}</strong>
                  </p>
                  <p className="mb-0">
                    <strong>Amount Raised: {item.amountRecived}</strong>
                  </p>
                  <div className="progress mt-3">
                    <div
                      className="progress-bar progress-bar-success"
                      role="progressbar"
                      aria-valuenow={(item.amountRecived / item.amount) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${(item.amountRecived / item.amount) * 100}%`,
                      }}
                    >
                      {isNaN(((item.amountRecived / item.amount) * 100).toFixed(2)) ? 0 : ((item.amountRecived / item.amount) * 100).toFixed(2)}%
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary mt-4 w-100"
                    onClick={() => alert("Thank you for your donation!")}
                  >
                    Donate Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
};

export default Description;
