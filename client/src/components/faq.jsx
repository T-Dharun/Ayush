import React, { useState } from "react";
import './guide.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h3>Frequently Asked Questions</h3>
      <ul>
        {faqData.map((faq, index) => (
          <li key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
            <div className="faq-question">
              <span className="faq-icon">
                {activeIndex===index?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
                }
              </span>
              {faq.question}
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

const faqData = [
  { question: "What is the purpose of this project?", answer: "The purpose of this project is to build a comprehensive platform for AYUSH startup registration." },
  { question: "How do I register a startup?", answer: "To register a startup, you need to fill in the necessary forms, upload certificates, and submit the required documents." },
  { question: "What documents are required for registration?", answer: "You need to provide documents like GMP certificate, AYUSH license, company incorporation certificate, etc." },
  { question: "How can I track the status of my registration?", answer: "You can track the status of your registration on the portal under the 'Registration Status' section." },
  { question: "Who can I contact for support?", answer: "For support, you can reach out to our customer service via the 'Contact Us' page." }
];
