/* eslint-disable no-unused-vars */
import React from "react";
import money from '../assets/money.jpg';
import commu from '../assets/commu.jpg';
import heart from '../assets/heart.jpg';
import invest from '../assets/invest.jpg';

import donate2 from "../assets/donate2.jpg";
const About = () => {
  return (
    <>
      <div
        className="card card-cover h-100 overflow-hidden text-bg-dark rounded-0 shadow-lg"
        style={{
          backgroundImage: `url(${donate2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginTop: "20px",
        }}
      >
        <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
          <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
            Steps to follow to <span style={{ color: "red" }}>Raise Funds</span>
          </h3>
          <button className="btn mt-auto bg-primary">
            Follow the below steps to raise funds for any of your events.
          </button>
        </div>
      </div>

      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div className="feature-item d-flex flex-column align-items-center gap-2 cardd">
              <div
                className="feature-image rounded-circle overflow-hidden"
                style={{
                  backgroundImage: `url(${money})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <svg className="bi" width="5em" height="5em">
                  <use xlinkHref="#collection"></use>
                </svg>
              </div>
              <h6 className=" mb-0 text-body-emphasis">No middle person</h6>
              <p
                className="text-body-secondary"
                style={{ textAlign: "center" }}
              >
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="feature-item d-flex flex-column align-items-center gap-2 cardd">
              <div
                className="feature-image rounded-circle overflow-hidden"
                style={{
                  backgroundImage: `url(${commu})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <svg className="bi" width="5em" height="5em">
                  <use xlinkHref="#collection"></use>
                </svg>
              </div>
              <h6 className=" mb-0 text-body-emphasis">Community</h6>
              <p
                className="text-body-secondary"
                style={{ textAlign: "center" }}
              >
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="feature-item d-flex flex-column align-items-center gap-2 cardd">
              <div
                className="feature-image rounded-circle overflow-hidden"
                style={{
                  backgroundImage: `url(${heart})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <svg className="bi" width="5em" height="5em">
                  <use xlinkHref="#collection"></use>
                </svg>
              </div>
              <h6 className=" mb-0 text-body-emphasis">
                We maintain transparency
              </h6>
              <p
                className="text-body-secondary"
                style={{ textAlign: "center" }}
              >
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="feature-item d-flex flex-column align-items-center gap-2 cardd">
              <div
                className="feature-image rounded-circle overflow-hidden"
                style={{
                  backgroundImage: `url(${invest})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <svg className="bi" width="5em" height="5em">
                  <use xlinkHref="#collection"></use>
                </svg>
              </div>
              <h6 className=" mb-0 text-body-emphasis">Best investment</h6>
              <p
                className="text-body-secondary"
                style={{ textAlign: "center" }}
              >
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
