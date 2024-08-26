import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelfDeclaration = ({step}) => {
  const [termsAndConditions, setTermsAndConditions] = React.useState(false);
  const [signature, setSignature] = React.useState('');
  const navigate=useNavigate();
  const submit=async()=>{
    console.log(signature);

    navigate('/')
  }
  const handleTermsAndConditionsChange = (e) => {
    setTermsAndConditions(e.target.checked);
  };

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-gray-600 mb-4">
        Please review the 
        <a href='https://www.ayush.gov.in/'className='text-primary hover:text-black' target='_blank'> Terms and Conditions </a>
         for AYUSH startup registration before proceeding. By continuing, you agree to comply with the guidelines set forth by the Ministry of AYUSH
        </p>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="termsAndConditions"
            checked={termsAndConditions}
            onChange={handleTermsAndConditionsChange}
            className="mr-2"
          />
          <label htmlFor="termsAndConditions" className="text-gray-600">
            I agree to the terms and conditions
          </label>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-6">Signature</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-gray-600 mb-4">
          Please enter your signature below:
        </p>
        <input
          type="text"
          id="signature"
          value={signature}
          onChange={handleSignatureChange}
          className="w-full p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
          placeholder="Enter your signature"
        />
      </div>
      <button
        className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 w-100 mt-3"
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
};

export default SelfDeclaration;