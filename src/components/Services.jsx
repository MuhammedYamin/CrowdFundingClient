/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";

const Services = () => {
  return (
    <div className="container">
      <div className="section-title" data-aos="fade-in" data-aos-delay="100">
        <h2>WHY CROWDFUNDING?</h2>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box" data-aos="fade-up">
            <div className="icon">
              <i className="bx bxl-dribbble"></i>
            </div>
            <h4 className="title">
              No middle person
            </h4>
            <p className="description">
              Directly engage with project creators without intermediary fees or
              barriers..
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
            <div className="icon">
              <i className="bx bx-file"></i>
            </div>
            <h4 className="title">
              Community
            </h4>
            <p className="description">
              Join a vibrant network of supporters and backers dedicated to
              shared goals and mutual success.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
            <div className="icon">
              <i className="bx bx-tachometer"></i>
            </div>
            <h4 className="title">
              We maintain transparency
            </h4>
            <p className="description">
              Enjoy clear, honest communication and detailed updates throughout
              your investment journey.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
            <div className="icon">
              <i className="bx bx-world"></i>
            </div>
            <h4 className="title">
              Best investment
            </h4>
            <p className="description">
              Maximize returns with high-potential projects curated for
              impactful investments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
