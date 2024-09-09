/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import commu from '../assets/commu.jpg';
import heart from '../assets/heart.jpg';
import invest from '../assets/invest.jpg';
import money from '../assets/money.jpg';
const AboutUs = () => {
  return (
    <div className="container">
  <div className="section-title" data-aos="fade-in" data-aos-delay="100">
    <h2>About Us</h2>
  </div>
  <div className="row no-gutters">
    <div className="content col-xl-4 d-flex align-items-stretch" data-aos="fade-up">
      <div className="content bg-primary p-5" style={{textAlign:"center",margin:"30px"}}>
        <h3 style={{color:"white"}}>Why choose us?</h3>
        <Link to="/aboutdc" className="about-btn">More About The Portal<i className="bx bx-chevron-right"></i>
        </Link>
        </div>
    </div>
    <div className="col-xl-8 d-flex align-items-stretch">
      <div className="icon-boxes d-flex flex-column justify-content-center">
        <div className="row">
          <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
          <i className="bx" style={{ display: "block", width: "1.5em", height: "1.5em", borderRadius: "50%", overflow: "hidden"}}>
              <img src={money} alt="" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
            </i>
            <h4>No Middle Person</h4>
            <p>We believe in direct connections. Our platform ensures that every contribution goes directly to the project creator, without unnecessary intermediaries.</p>
          </div>
          <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
          <i className="bx" style={{ display: "block", width: "1.5em", height: "1.5em", borderRadius: "50%", overflow: "hidden" }}>
              <img src={commu} alt="" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
            </i>
            <h4>Community-Driven</h4>
            <p>We are more than just a platform; we are a community. Our supportive network helps creators gain the visibility and backing they need to succeed.</p>
          </div>
          <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
          <i className="bx" style={{ display: "block", width: "1.5em", height: "1.5em", borderRadius: "50%", overflow: "hidden" }}>
              <img src={heart} alt="" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
            </i>
            <h4>Transparent Operations</h4>
            <p>Transparency is at the heart of what we do. Our processes are designed to ensure that all transactions and project updates are clear and accessible.</p>
          </div>  
          <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
            <i className="bx" style={{ display: "block", width: "1.5em", height: "1.5em", borderRadius: "50%", overflow: "hidden" }}>
              <img src={invest} alt="" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
            </i>
            <h4>Best Investment</h4>
            <p>Investing in dreams is the best kind of investment. Whether you are supporting a innovation or a heartwarming community project, your contributions make a lasting impact.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default AboutUs;
