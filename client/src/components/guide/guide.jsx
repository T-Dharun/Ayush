import React from "react";
import './guide.css';
import { useNavigate } from "react-router-dom";
import Youtube from "./youtube";
import FAQ from "./faq";
export default function Guide() {
  const navigate=useNavigate();
  return (
    <div className="guide-container">
      <div className="top-section">
        <div className="guide">
          <Youtube 
            width={"100%"} 
            height={"100%"} 
            link={"https://www.youtube.com/embed/6r9E3fQfz0U?si=FzNNKmc4ztGch8Db"} 
          />
        </div>
        <div className="checklist">
          <h3>Important Document Needed to Register</h3>
          <ul>
            <li>GMP certificate</li>
            <li>MSME certificate</li>
            <li>Ayush License</li>
            <li>Manufacturing license</li>
            <li>Company incoporation certificate</li>
            
          </ul>
        </div>
      </div>
      <button className="guide-btn" onClick={navigate('/register')}>Next</button>
      <FAQ/>
    </div>
  );
}
