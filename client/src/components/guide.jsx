import React from "react";
import './guide.css';
import Youtube from "./youtube";
import FAQ from "./faq";
export default function Guide() {
  return (
    <div className="guide-container">
      <div className="top-section">
        <div className="guide">
          <Youtube 
            width={"100%"} 
            height={"100%"} 
            link={"https://www.youtube.com/embed/zxF0y5K56UM?si=t4BhiwPXNfRdQovO"} 
          />
        </div>
        <div className="checklist">
          <h3>Important Document Needed to Register</h3>
          <ul>
            <li>Check item 1</li>
            <li>Check item 2</li>
            <li>Check item 3</li>
            <li>Check item 4</li>
            <li>Check item 5</li>
          </ul>
        </div>
      </div>
      <button className="guide-btn">Next</button>
      <FAQ/>
    </div>
  );
}
