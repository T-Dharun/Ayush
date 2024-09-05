import React, { useState } from 'react';

const Network = ({setStep,step,setNetwork,network}) => {
  const handleInputChange = (event) => {
    setNetwork(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStep(prev=>prev+1)
//    alert(`You are a member of: ${network}`);
  };

  return (
    <div className="p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md w-100">
      <h2 className="text-2xl font-bold mb-4">Your Network</h2>
      <form onSubmit={handleSubmit} className='mt-5 h-50 d-flex flex-column justify-between'>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5"
              htmlFor="network"
            >
              Are you a member of:
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="TE"
                name="network"
                value="TE"
                checked={network === 'TE'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                className="text-gray-700 text-sm"
                htmlFor="TE"
              >
                TE
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="other"
                name="network"
                value="other"
                checked={network === "other"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                className="text-gray-700 text-sm"
                htmlFor="other"
              >
                other
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Network;