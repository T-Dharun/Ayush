import React, { useEffect, useState } from 'react';
import Header from '../components/Landing/Header';
import './Status.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrationProcess() {

  const [status, setStatus] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const a = JSON.parse(localStorage.getItem('user'));
      const data = JSON.parse(localStorage.getItem('data'));

      const response = await axios.get(`http://localhost:5000/api/status/startup/${data._id}`, {
        headers: {
          'x-auth-token': a.token,
        },
      });

      console.log(response.data.status); // Logging the data status for debugging

      switch (response.data.status) {
        case "upload":
          setStatus(1);
          break;
        case "initial":
          setStatus(2);
          break;
        case "pending":
          setStatus(3);
          break;
        case "proceed":
          setStatus(5);
          break;
        case "approved":
          setStatus(7);
          break;
        default:
          setStatus(0);
          break;
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const stepsData = [
    { number: 1, title: "Document Upload", active: status >= 1 },
    { number: 2, title: "Form Submission", active: status >= 2 },
    { number: 3, title: "AI Verification", active: status >= 3 },
    { number: 4, title: "Certificate Verification", active: status >= 4 },
    { number: 5, title: "Eligibility Check", active: status >= 5},
    { number: 6, title: "Authorize", active: status >= 6 },
    { number: 7, title: "Recognize", active: status >= 7 },
  ];
  console.log(status);
  return (
    <>
      <Header />

      <div className="container1">
        <button className="mt-5 mb-5 bg-secondary p-4 pt-2 pb-2 text-white" onClick={() => navigate('/')}>Back</button>
        <div className="header1">
          <div className="title1">Registration Process</div>
        </div>
        <div className="steps1">
          {stepsData.map((step, index) => (
            <div
              key={index}
              className={`step1 ${step.active ? "active1" : ""} ${step.extraClass || ""} ${status>index && "bg-primary text-white"}`}
            >
              <div className={`number1 ${step.extraClass || ""} ${status>index && "bg-primary text-white"}`}>{step.number}</div>
              <div className={`title1 ${step.extraClass || ""} ${status>index && "bg-primary text-white"}`}>{step.title}</div>
            </div>
          ))}
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
