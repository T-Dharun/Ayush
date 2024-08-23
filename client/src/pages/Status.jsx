import React from 'react';
import Header from '../components/Landing/Header';
import './Status.css';
function RegistrationProcess() {
  return (
    <>    
    <Header/>
    <div className="container1">
        
      <div className="header1">
        <div className="title1">Registration Process</div>
      </div>
      <div className="steps1">
        <div className="step1 active1">
          <div className="number1">1</div>
          <div className="title1">Form Submission</div>
        </div>
        <div className="step1">
          <div className="number1">2</div>
          <div className="title1">Document Upload</div>
        </div>
        <div className="step1">
          <div className="number1">3</div>
          <div className="title1">AI Verification</div>
        </div>
        <div className="step1">
          <div className="number1">4</div>
          <div className="title1">Certificate Verification</div>
        </div>
        <div className="step1">
          <div className="number1">5</div>
          <div className="title1">Eligibility Check</div>
        </div>
        <div className="step1">
          <div className="number1">6</div>
          <div className="title1">Authorize</div>
        </div>
        <div className="step1">
          <div className="number1">7</div>
          <div className="title1">Recognize</div>
        </div>
      </div>
      <div className="status1">
        <div className="title1">Verification Completed</div>
        <div className="status-text">Status: Completed</div>
      </div>
      <div className="download-button1">
        <button>Download Your Certificate</button>
      </div>
    </div>
    </>

  );
}

export default RegistrationProcess;