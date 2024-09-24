/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
const backend = import.meta.env.VITE_BACKEND_URL;

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
      const response = await fetch(
        // "http://localhost:2000/users/ContactUS",
        `${backend}/users/ContactUS`,
        {
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
  };

  return (
    <div className="container" data-aos="fade-up">
      <div className="section-title">
        <h2>CONTACT US</h2>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="info-box mb-4">
            <i className="bx bx-map"></i>
            <h3>Our Address</h3>
            <p style={{ color: "black" }}>
            DDPI Dakshina Kannada, Kottara, Mangaluru, Karnataka 575006, India
            </p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="info-box mb-4">
            <i className="bx bx-envelope"></i>
            <h3>Email Us</h3>
            <p style={{ color: "black" }}> ddpidk@gmail.com</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="info-box mb-4">
            <i className="bx bx-phone-call"></i>
            <h3>Call Us</h3>
            <p style={{ color: "black" }}>+919448999337</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <iframe
            className="mb-4 mb-lg-0"
             src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15556.268261446536!2d74.8368274!3d12.9034091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b223a7ed603%3A0x34c90bd5c753d82b!2sDDPI%20DAKSHINA%20KANNADA!5e0!3m2!1sen!2sin!4v1727100270242!5m2!1sen!2sin" 
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
              <button type="submit" className="button-submit" disabled={loader}>
                {loader ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
