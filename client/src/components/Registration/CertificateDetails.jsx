import React, { useState } from 'react';
import axios from 'axios';
import axiosHeader from '../../axiosHeader';
const CertificateDetails = ({ setStep }) => {
  const [details, setDetails] = useState({
    gmpCertificate: { file: null, number: '', uploaded: false },
    coppCertificate: { file: null, number: '', uploaded: false },
    ayushLicenseCertificate: { file: null, number: '', uploaded: false },
    manufacturingLicense: { file: null, number: '', uploaded: false },
    companyIncorporationCertificate: { file: null, number: '', uploaded: false },
    bankDetails: {
      name: '',
      accountNo: '',
      ifscCode: '',
    },
  });

  const handleCertificateChange = (e, field) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: { ...prevDetails[field], file: e.target.files[0] ,uploaded: true},
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

  const submit = async () => {
    const formData = new FormData();
    // Append certificate files and numbers
    for (const [key, { file, number }] of Object.entries(details)) {
      console.log(key,file);
      if (key !== 'bankDetails') {
        if (file) {
          formData.append(`${key}`, file);
          console.log(key); 
        }
      }
    }

    // Append bank details
    const { bankDetails } = details;
    for (const [key, value] of Object.entries(bankDetails)) {
      formData.append(key, value);
    }

    try {
      const uploadResponse = await axiosHeader.post(
        'documents/upload', // Use the relative path here
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (uploadResponse.status === 200) {
         //After successful upload, collect data and send to createStartup endpoint
        const data = {
          bankDetails: {
            bankName: details.bankDetails.name,
            accountNumber: details.bankDetails.accountNo,
            ifscCode: details.bankDetails.ifscCode,
          },
          documents: {
            gmpCertificateNumber: details.gmpCertificate.number,
            coppCertificateNumber: details.coppCertificate.number,
            ayushLicenseCertificateNumber: details.ayushLicenseCertificate.number,
            manufacturingLicenseNumber: details.manufacturingLicense.number,
            companyIncorporationCertificateNumber: details.companyIncorporationCertificate.number,
          },
        };
  
        const createStartupResponse = await axiosHeader.post(
          'startups/createStartup',
          { step: 6, data },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (createStartupResponse.status === 200) {
          setStep(prev => prev + 1);
        } else {
          console.error('Failed to create startup:', createStartupResponse.data);
        }
      } else {
        console.error('Failed to upload certificates:', uploadResponse.data);
      }
    } catch (err) {
      console.error('Error uploading certificates or creating startup:', err);
    }
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
                  className={`w-10 h-10 rounded-md flex justify-center items-center cursor-pointer ${details[certificate].uploaded ? 'bg-green-400' : 'bg-gray-200'}`}
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
