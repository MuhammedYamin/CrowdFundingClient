import React, { useState } from "react";
import "../Styles/Faq.css";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      id: 1,
      question: "I want to start a medical fundraiser. What all do I need?",
      answer:
        "For your fundraiser to be as transparent as possible, upload a scanned copy of your hospital bill mentioning the medical condition and the amount you require along with high resolution photograph of the patient.",
    },
    {
      id: 2,
      question:
        "I don’t see the medical treatment I want to raise funds for in the list, what do I do?",
      answer:
        "We are sorry for the inconvenience. Please write to us at info@dakshinakannada.com or call us at 1800 8888 to get more information.",
    },
    {
      id: 3,
      question: "Does the website really help me raise funds for any emergencies?",
      answer:
        "Yes, we certainly do. We have helped numerous individuals raise funds for medical emergencies, including for themselves, friends, family, or even pets.",
    },
    {
      id: 4,
      question: "How do I raise funds?",
      answer:
        "Just log in to org and click on ‘Start a Fundraiser’. Fill in a few details and you’re ready to go!",
    },
  ];

  return (
    <div className="container">
      <div className="main-wrapper py-5 text-center">
        <h4 className="heading mb-4">Frequently Asked Questions</h4>
        <div className="divider mb-4"></div>
        <div className="accordion">
          {faqItems.map((item, index) => (
            <div key={item.id} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${openIndex === index ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => handleToggle(index)}
                >
                  {item.question}
                </button>
              </h2>
              <div
                className={`accordion-collapse ${openIndex === index ? "show" : ""}`}
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
