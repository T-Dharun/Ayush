import React, { useState } from 'react';

const CertificateDetails = ({setStep}) => {
  const [details, setDetails] = useState({
    gmpCertificate: { file: null, number: '' },
    coppCertificate: { file: null, number: '' },
    ayushLicenseCertificate: { file: null, number: '' },
    manufacturingLicense: { file: null, number: '' },
    companyIncorporationCertificate: { file: null, number: '' },
    bankDetails: {
      name: '',
      accountNo: '',
      ifscCode: '',
    },
  });

  const handleCertificateChange = (e, field) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: { ...prevDetails[field], file: e.target.files[0] },
    }));
  };

  const handleCertificateNumberChange = (e, field) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: { ...prevDetails[field], number: e.target.value },
    }));
  };

  const handleBankDetailsChange = (e, field) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      bankDetails: { ...prevDetails.bankDetails, [field]: e.target.value },
    }));
  };

  const submit = () => {
    setStep(prev=>prev+1);
    console.log(details);
  };

  return (
    <div className="bg-white text-secondary w-full p-6 rounded-md flex flex-col gap-6" style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Certificate Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            'gmpCertificate',
            'coppCertificate',
            'ayushLicenseCertificate',
            'manufacturingLicense',
            'companyIncorporationCertificate'
          ].map((certificate, index) => (
            <section key={index} className="flex items-center gap-4">
              <label htmlFor={`${certificate}File`} className="font-bold w-1/3">
                {certificate.replace(/([A-Z])/g, ' $1').trim()}:
              </label>
              <div className="relative">
                <input
                  id={`${certificate}File`}
                  name="file"
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleCertificateChange(e, certificate)}
                />
                <label
                  htmlFor={`${certificate}File`}
                  className="w-10 h-10 bg-gray-200 rounded-md flex justify-center items-center cursor-pointer"
                >
                  📁
                </label>
              </div>
              <input
                id={`${certificate}Number`}
                name="number"
                type="text"
                placeholder="Certificate Number"
                className="w-full p-2 border rounded-md focus:outline-none"
                onChange={(e) => handleCertificateNumberChange(e, certificate)}
              />
            </section>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Bank Details</h2>
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="bankName" className="font-bold w-1/3">Bank Name:</label>
            <input
              id="bankName"
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              onChange={(e) => handleBankDetailsChange(e, 'name')}
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="accountNo" className="font-bold w-1/3">Account Number:</label>
            <input
              id="accountNo"
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              onChange={(e) => handleBankDetailsChange(e, 'accountNo')}
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="ifscCode" className="font-bold w-1/3">IFSC Code:</label>
            <input
              id="ifscCode"
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              onChange={(e) => handleBankDetailsChange(e, 'ifscCode')}
            />
          </div>
        </section>
      </div>

      <button
        className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500"
        onClick={submit}
      >
        Continue
      </button>
    </div>
  );
};

export default CertificateDetails;
