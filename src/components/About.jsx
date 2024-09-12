import React from "react";
import invest from '../assets/invest.jpg';
import start from '../assets/start.png';
import share from '../assets/share.png';
import "../Styles/About.css";
import donate2 from "../assets/donate2.jpg";

const About = () => {
  const scrollDown = () => {
    window.scrollBy({
      top: 300,  
      behavior: 'smooth'  
    });
  };

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
          <button onClick={scrollDown} className="btn mt-auto bg-primary">
            Follow the below steps to raise funds for any of your events.
          </button>
        </div>
      </div>

      <div className="App">
        <div className="container">
          <h1>Start a Fundraiser in three simple steps</h1>
          <div className="content">
            <div className="left">
              <div className="steps">
                <div className="step">
                  <div className="icon-wrapper">
                    <img src={start} alt="Start your fundraiser" className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>Start your fundraiser</h2>
                    <p>
                      It’ll take only 2 minutes. Just tell us a few details about you and the ones you are raising funds for.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div className="icon-wrapper">
                    <img src={share} alt="Share your fundraiser" className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>Share your fundraiser</h2>
                    <p>
                      All you need to do is share the fundraiser with your friends and family. In no time, support will start pouring in.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <div className="icon-wrapper">
                    <img src={invest} alt="Withdraw funds" className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>Withdraw Funds</h2>
                    <p>
                      The funds raised can be withdrawn without any hassle directly to your bank account.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="right">
              <div className="phone-wrapper">

                <div className="phone">
                  <div className="dynamic-island">
                    <div className="camera-circle">
                      <div className="camera-icon"></div> {/* Add camera icon here */}
                    </div>
                  </div>
                  <video
                    className="phone-video"
                    src="src\assets\vedio.mp4" // Path to the video in the public folder
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="button power-button"></div>
                  <div className="volume-button volume-up-button"></div>
                  <div className="volume-button volume-down-button"></div>
                  <div className="side-button"></div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
