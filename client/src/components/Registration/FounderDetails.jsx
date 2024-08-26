import React, { useState } from "react";
import './register.css'; // Assuming you have a separate CSS file
import { putEntityDetails } from "../../services/registrationService";

function FounderDetails({setStep,step}) {
  const [founders, setFounders] = useState([]);
  const [newFounder, setNewFounder] = useState({
    dinDpin: "",
    name: "",
    gender: "",
    mobile: "",
    email: "",
    designation: "",
    postalAddress: "",
  });

  const handleAddFounder = () => {
    if (
      newFounder.dinDpin &&
      newFounder.name &&
      newFounder.gender &&
      newFounder.mobile &&
      newFounder.email &&
      newFounder.designation &&
      newFounder.postalAddress
    ) {
      setFounders([...founders, newFounder]);
      setNewFounder({
        dinDpin: "",
        name: "",
        gender: "",
        mobile: "",
        email: "",
        designation: "",
        postalAddress: "",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleChange = (field, value) => {
    setNewFounder({ ...newFounder, [field]: value });
  };

  const handleEdit = (index) => {
    setNewFounder(founders[index]);
    setFounders(founders.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setFounders(founders.filter((_, i) => i !== index));
  };

  const submit = () => {
    if (founders.length > 0) {
      putEntityDetails({founders,step})
      console.log(founders);
      setStep((prev) => prev + 1);
    } else {
      alert("Please add at least one founder.");
    }
  };

  return (
    <section className="h-screen bg-white overflow-y-auto flex flex-col w-100 pl-5">
      <div className="container mx-auto p-5 flex-grow w-100">
        <h2>Founder Details</h2>
        <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="dinDpin">DIN/DPIN Number:</label>
            <input
              type="text"
              id="dinDpin"
              value={newFounder.dinDpin}
              onChange={(e) => handleChange("dinDpin", e.target.value)}
              className="w-full border border-gray-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={newFounder.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={newFounder.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full border border-gray-500 p-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              id="mobile"
              value={newFounder.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className="w-full border border-gray-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={newFounder.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border border-gray-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="designation">Designation:</label>
            <input
              type="text"
              id="designation"
              value={newFounder.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
              className="w-full border border-gray-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="postalAddress">Postal Address:</label>
            <textarea
              id="postalAddress"
              value={newFounder.postalAddress}
              onChange={(e) => handleChange("postalAddress", e.target.value)}
              className="w-full border border-gray-500 p-2"
            />
          </div>
        </div>
          <button
            onClick={handleAddFounder}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Founder
          </button>
        </div>
        <div className="table-container">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-500 p-2">S.No</th>
                <th className="border border-gray-500 p-2">DIN/DPIN</th>
                <th className="border border-gray-500 p-2">Name</th>
                <th className="border border-gray-500 p-2">Gender</th>
                <th className="border border-gray-500 p-2">Mobile</th>
                <th className="border border-gray-500 p-2">Email</th>
                <th className="border border-gray-500 p-2">Designation</th>
                <th className="border border-gray-500 p-2">Postal Address</th>
                <th className="border border-gray-500 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {founders.map((founder, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 p-2">{index + 1}</td>
                  <td className="border border-gray-500 p-2 table-cell">
                    {founder.dinDpin}
                  </td>
                  <td className="border border-gray-500 p-2 table-cell">{founder.name}</td>
                  <td className="border border-gray-500 p-2 table-cell">{founder.gender}</td>
                  <td className="border border-gray-500 p-2 table-cell">{founder.mobile}</td>
                  <td className="border border-gray-500 p-2 table-cell">{founder.email}</td>
                  <td className="border border-gray-500 p-2 table-cell">{founder.designation}</td>
                  <td className="border border-gray-500 p-2 table-cell">
                    {founder.postalAddress}
                  </td>
                  <td className="border border-gray-500 p-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-1 bg-yellow-500 text-white rounded m-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-8 mr-8 mb-8">
        <button
          type="button"
          className="bg-green-600 text-white p-3 rounded-md cursor-pointer hover:opacity-90"
          onClick={submit}
        >
          CONTINUE
        </button>
      </div>
    </section>
  );
}

export default FounderDetails;
