/* eslint-disable no-unused-vars */
import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-info">
                <h3>CROWD FUNDING</h3>
                <p className="pb-3" style={{color: "black"}}>
                  <em>DDPI Dakshina Kannada</em>
                </p>
                <p style={{color: "black"}}>
                 Kottara, Mangaluru, Karnataka <br />
                 575006, India<br /><br />
                  <strong>Phone:</strong> +919448999337<br />
                  <strong>Email:</strong> ddpidk@gmail.com<br />
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                  <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                  <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                  <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4> Links</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#services">About us</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#portfolio">Donate</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#testimonials">Events</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#how">Raise Funds</a></li>
              </ul>
            </div>

     

            
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>cf.dakshinakannada</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="https://www.aiet.org.in/">AIET</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
