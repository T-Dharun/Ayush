import React, { useState } from 'react';
import { putInvestorDetails } from '../../../services/investorRegistration';

const About = ({ step, setStep ,network }) => {
  const [details, setDetails] = useState({
    name: '',
    interest: '',
    logo: '',
    startupState: [], // Changed to array for multiple selections
    budget: '',
    investmentCategorysector: 'AYUSH',
    panCard: '',
    brief: '',
  });

  const [logo, setLogo] = useState(null);

  const submit = async () => {
    console.log(details);
    await putInvestorDetails({details,step,network});
    setStep(prev=>prev+1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleStageClick = (stage) => {
    setDetails((prevDetails) => {
      const newStages = prevDetails.startupState.includes(stage)
        ? prevDetails.startupState.filter((s) => s !== stage)
        : [...prevDetails.startupState, stage];
      return { ...prevDetails, startupState: newStages };
    });
  };

  return (
    <section className="h-screen bg-white overflow-hidden flex justify-center items-center w-100">
      <div className="container mx-auto p-4 max-h-full overflow-auto w-100">
        <h1 className="text-2xl font-bold mb-4">About Individual</h1>
        <p className="text-md mb-6">
          About Individual typically refers to the specific attributes or pieces of information that define.
        </p>
        <div className="grid grid-cols-1 gap-1">
          {/* Logo and Startup Stage */}
          <div className="flex flex-row items-start mb-4 gap-6">
            {/* Company Logo */}
            <div className="flex flex-col justify-center items-center mr-4">
              <label
                htmlFor="logo"
                className="block font-bold mb-2 text-gray-700"
              >
                Investor Logo:
              </label>
              <div className="w-24 h-24 rounded-md flex justify-center items-center">
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                  required
                />
                <label htmlFor="logo" className="cursor-pointer">
                  {logo ? (
                    <img
                      src={URL.createObjectURL(logo)}
                      alt="Company Logo"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-md flex justify-center items-center text-2xl text-gray-500 cursor-pointer">
                      +
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Startup Stage */}
            <div className="flex flex-col items-center">
              <label
                htmlFor="startupStage"
                className="block font-bold mb-2 text-gray-700"
              >
                Startup Stage:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['ideathon', 'earlytraction', 'validation', 'scaling'].map((stage) => (
                  <div
                    key={stage}
                    className={`bg-white shadow-md rounded-lg p-2 cursor-pointer transform transition-transform hover:scale-105 ${
                      details.startupState.includes(stage) ? 'border-2 border-blue-600' : 'border border-gray-300'
                    }`}
                    onClick={() => handleStageClick(stage)}
                  >
                    <h5 className="text-sm font-semibold text-center text-gray-800">
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-bold mb-2 text-gray-700"
                >
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Investor Name"
                  className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="name"
                  value={details.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="interest"
                  className="block font-bold mb-2 text-gray-700"
                >
                  Interest:
                </label>
                <input
                  id="interest"
                  type="text"
                  placeholder="Interest"
                  className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="interest"
                  value={details.interest}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="panCard"
                  className="block font-bold mb-2 text-gray-700"
                >
                  PAN Card:
                </label>
                <input
                  id="panCard"
                  type="text"
                  placeholder="PAN Card"
                  className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="panCard"
                  value={details.panCard}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <label
                  htmlFor="budget"
                  className="block font-bold mb-2 text-gray-700"
                >
                  budget:
                </label>
                <input
                  id="budget"
                  type="number"
                  placeholder="budget"
                  className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="budget"
                  value={details.budget}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="investmentCategorysector"
                  className="block font-bold mb-2 text-gray-700"
                >
                  Investment Category/Sector:
                </label>
                <select
                  id="investmentCategorysector"
                  className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="investmentCategorysector"
                  value={details.investmentCategorysector}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Ayurvedha">Ayurvedha</option>
                  <option value="Unani">Unani</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Sidha">Sidha</option>
                  <option value="Homeopathy">Homeopathy</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="brief"
                  className="block font-bold mb-2 text-gray-700"
                >
                  brief:
                </label>
                <textarea
                  id="brief"
                  placeholder="brief"
                  className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="brief"
                  value={details.brief}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;