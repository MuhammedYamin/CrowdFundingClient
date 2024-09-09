/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const sendContactDetails = async (event) => {
    event.preventDefault();

    try {
      setLoader(true);
      const response = await fetch("http://localhost:2000/users/ContactUS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      let result = await response.json();
      if (response.status === 200) {
        alert(result.message);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else if (response.status === 403) {
        alert(result.message);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      alert("An error occurred while sending the message.");
      console.error("Error sending contact details:", error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className="container" data-aos="fade-up">
      <div className="section-title">
        <h2
        
        >
          CONTACT US</h2>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="info-box mb-4">
            <i className="bx bx-map"></i>
            <h3>Our Address</h3>
            <p style={{ color: "black" }}>
              A108 Adam Street, New York, NY 535022
            </p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="info-box mb-4">
            <i className="bx bx-envelope"></i>
            <h3>Email Us</h3>
            <p style={{ color: "black" }}>contact@example.com</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="info-box mb-4">
            <i className="bx bx-phone-call"></i>
            <h3>Call Us</h3>
            <p style={{ color: "black" }}>+1 5589 55488 55</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <iframe
            className="mb-4 mb-lg-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3719802292076!2d74.83289117513247!3d12.861060837444267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35bac4fbefcc7%3A0xfc0d1557e07f1a70!2sDistrict%20Collector%20Office%2C%20Bunder%2C%20Mangaluru%2C%20Karnataka%20575001%2C%20India!5e1!3m2!1sen!2sus!4v1720673348070!5m2!1sen!2sus"
            frameBorder="0"
            style={{ border: 0, width: "100%", height: "384px" }}
            allowFullScreen
            title="Google Maps"
          ></iframe>
        </div>

        <div className="col-lg-6">
          <form className="email-form" onSubmit={sendContactDetails}>
            <div className="row">
              <div className="col-md-6 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <textarea
                className="form-control"
                name="message"
                rows="5"
                placeholder="Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="my-3">
              <div className="loading">Loading</div>
              <div className="error-message"></div>
              <div className="sent-message"></div>
            </div>
            <div className="text-center">
              <button type='submit' className="button-submit" disabled={loader}>{loader ? "Sending...":"Send Message"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
