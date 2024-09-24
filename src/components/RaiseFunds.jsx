import React from "react";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import invest from '../assets/invest.jpg';
import start from '../assets/start.png';
import share from '../assets/share.png';
import "../Styles/About.css";
import donate2 from "../assets/donate2.jpg";

const About = () => {
  const { t } = useTranslation(); // Initialize useTranslation

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
        <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
          <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
            {t('stepsTitle')}
          </h3>
          <button onClick={scrollDown} className="btn mt-auto bg-white" style={{ color: "black" }}>
            {t('followSteps')}
          </button>
        </div>
      </div>

      <div className="App">
        <div className="container">
          <div className="content">
            <div className="left">
              <div className="steps">
                {/* Step 1 */}
                <div className="step">
                  <div className="icon-wrapper">
                    <img src={start} alt={t('selectSchool')} className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>{t('selectSchool')}</h2>
                    <p>{t('selectSchoolDesc')}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="step">
                  <div className="icon-wrapper">
                    <img src={share} alt={t('chooseQuantity')} className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>{t('chooseQuantity')}</h2>
                    <p>{t('chooseQuantityDesc')}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="step">
                  <div className="icon-wrapper">
                    <img src={invest} alt={t('confirmOTP')} className="step-icon" />
                  </div>
                  <div className="step-content">
                    <h2>{t('confirmOTP')}</h2>
                    <p>{t('confirmOTPDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="phone-wrapper">
                <div className="phone">
                  <div className="dynamic-island">
                    <div className="camera-circle">
                      <div className="camera-icon"></div>
                    </div>
                  </div>
                  <video
                    className="phone-video"
                    src="src/assets/process.mp4" // Path to the video
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    Video not supported
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
