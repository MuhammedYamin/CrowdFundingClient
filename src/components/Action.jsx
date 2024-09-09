/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "../Styles/Downloadpdf.css"; // Import the CSS file for styling

const CallToAction = () => {
  useEffect(() => {
    const downloadBtn = document.getElementById("downloadBtn");
    const handleClick = () => {
      const link = document.createElement("a");
      link.href = "/EventDetails.pdf";
      link.download = "EventDetails.pdf";
      link.click();
    };

    if (downloadBtn) {
      downloadBtn.addEventListener("click", handleClick);
    }

    return () => {
      if (downloadBtn) {
        downloadBtn.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div className="container" data-aos="zoom-in">
      <div className="text-center">
        <h3>Download Template</h3>
        <p>
          To begin the process of raising funds, please download the template
          form by clicking the button below. Once downloaded, fill out the form
          with the necessary details. After completing the form, take it to the
          DC (Documentation Center) for further validation and confirmation.
          This step is crucial to ensure that all information is accurate and
          meets the required standards for fundraising.
        </p>

        <button className="cta-btn" id="downloadBtn">
          Download Template
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
