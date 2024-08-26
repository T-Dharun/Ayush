import React, { useState } from "react";
import investorLogo from "../../assets/investor.webp";
import poster from "../../assets/poster.jpg";
import achievementIcon from "../../assets/achievement.jpg";
import opportunityIcon from "../../assets/achievement.jpg";
import networkIcon from "../../assets/achievement.jpg";
import Post from "../social/posts";
import Header from "../Landing/Header";
// Data object for Investor
const investorData = {
  logo: investorLogo,
  name: "Investor Name",
  investmentInterests: [
    "AYUSH Industry",
    "Healthcare Startups",
    "Sustainable Practices",
    "Innovation in Wellness"
  ],
  contact: {
    email: "investor@example.com",
    phone: "123-456-7890",
    location: "City, Country"
  },
  overviewText: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae justo ac orci congue pharetra. 
    Suspendisse potenti. Nulla facilisi. Maecenas sit amet quam et lacus elementum dictum. Donec nec felis erat. 
    Duis eget ultricies ex. Donec non volutpat orci, eu sollicitudin tortor. Cras vehicula est a lectus feugiat, 
    vel lacinia orci iaculis. Sed sit amet metus neque. Integer nec odio ut dolor hendrerit volutpat sit amet vel augue. 
    Vivamus euismod nunc ut purus luctus, a dapibus ante malesuada. Nullam eget urna nisi. Curabitur vehicula semper 
    ligula, eu maximus erat.
  `,
  cards: [
    {
      icon: achievementIcon,
      title: "Notable Achievements",
      description: "Highlighted achievements and milestones of the investor."
    },
    {
      icon: opportunityIcon,
      title: "Investment Opportunities",
      description: "Types of investment opportunities and sectors of interest."
    },
    {
      icon: networkIcon,
      title: "Networking and Partnerships",
      description: "Key partnerships and networking activities."
    },
    {
        icon: achievementIcon,
        title: "Notable Achievements",
        description: "Highlighted achievements and milestones of the investor."
      },
      {
        icon: opportunityIcon,
        title: "Investment Opportunities",
        description: "Types of investment opportunities and sectors of interest."
      },
      {
        icon: networkIcon,
        title: "Networking and Partnerships",
        description: "Key partnerships and networking activities."
      }
  ]
};

const Investor = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
    <Header />
    <div className="flex flex-col md:flex-row bg-gray-50 p-8 rounded-xl shadow-lg">
      {/* Left Side - Info */}
      <div className="flex flex-col md:w-1/3 bg-white p-6 rounded-xl mb-6 md:mb-0 shadow-lg">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img
            src={investorData.logo}
            alt="Investor Logo"
            className="w-32 h-32 mb-6 rounded-full border border-gray-300 shadow-md"
          />
          {/* Investor Name */}
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{investorData.name}</h1>
          {/* Contact Details */}
          <div className="text-gray-700 text-base mb-6 mt-4">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v6.293l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L12 9.293V3m0 18v-6.293l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 15.707V21"></path>
              </svg>
              <p className="text-lg font-semibold">Email: {investorData.contact.email}</p>
            </div>
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10h10v4H7m4-10h4v4h-4V4zm-1 6H6v8h14v-8h-4V6H8v4z"></path>
              </svg>
              <p className="text-lg font-semibold">Phone: {investorData.contact.phone}</p>
            </div>
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 21v-2a4 4 0 00-4-4H8V9h4V6a4 4 0 014-4 4 4 0 014 4v3h2a4 4 0 014 4v7m-8-4h2v-4h-2m-4 4h2v-6H8v6z"></path>
              </svg>
              <p className="text-lg font-semibold">Location: {investorData.contact.location}</p>
            </div>
          </div>
          {/* Investment Interests */}
          <div className="text-gray-800 mb-6">
  <h2 className="text-2xl font-semibold mb-4">Investment Interests</h2>
  <div className="flex flex-col space-y-4">
    {investorData.investmentInterests.map((interest, index) => (
      <div key={index} className="flex items-center bg-blue-100 p-4 rounded-lg shadow-md">
        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full text-white mr-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {/* Use a generic icon for each interest */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v6.293l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L12 9.293V3m0 18v-6.293l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 15.707V21"></path>
          </svg>
        </div>
        {/* Interest Text */}
        <p className="text-lg font-medium text-gray-800">{interest}</p>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>

      {/* Right Side - Company Overview and Cards */}
      <div className="flex-1 md:w-2/3 bg-white p-6 rounded-xl">
        {/* Poster */}
        <img
          src={poster}
          alt="Poster"
          className="w-full h-56 object-cover rounded-lg mb-6"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-800 text-sm">
            {isExpanded ? investorData.overviewText : `${investorData.overviewText.slice(0, investorData.overviewText.length * 0.3)}...`}
          </p>
          <button
            onClick={handleToggle}
            className="text-blue-600 mt-4 inline-block hover:underline"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {investorData.cards.map((card, index) => (
            <div key={index} className="bg-gray-200 p-6 rounded-xl shadow-lg flex items-start">
              <img src={card.icon} alt="Card Icon" className="w-14 h-14 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-800">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Post/>
    </>
  );
};

export default Investor;
