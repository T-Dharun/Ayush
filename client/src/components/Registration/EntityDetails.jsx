import { useState } from "react";
import { ProgressBar } from "../Home";

const EntityDetails = ({setStep}) => {
  const [details, setDetails] = useState({});
  const [logo, setLogo] = useState(null);

  const submit = () => {
    setStep(prev=>prev+1);
    console.log(details);
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  return (
    <section className="h-screen bg-white overflow-y-auto  w-100">
      <div className="container mx-auto p-4  w-75">
        <h1 className="text-2xl font-bold mb-4">Entity Details</h1>
        <p className="text-md mb-6">
          Entity details typically refer to the specific attributes or pieces of information that define 
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <label
              htmlFor="CompanyName"
              className="block font-bold mb-2 text-gray-700"
            >
              Name:
            </label>
            <input
              id="CompanyName"
              type="text"
              placeholder="Company Name"
              className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setDetails({ ...details, [e.target.id]: e.target.value })}
            />
            <label
              htmlFor="entityType"
              className="block font-bold mb-2 text-gray-700 mt-4"
            >
              Entity:
            </label>
            <select
              id="entityType"
              placeholder="Select option"
              className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setDetails({ ...details, [e.target.id]: e.target.value })}
            >
              <option value="private">Private</option>
              <option value="partnership">Partnership</option>
            </select>
            <label
              htmlFor="CIN Number"
              className="block font-bold mb-2 text-gray-700 mt-4"
            >
              CIN Number:
            </label>
            <input
              id="CINNumber"
              type="number"
              placeholder="CIN Number"
              className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setDetails({ ...details, [e.target.id]: e.target.value })}
            />
            <label
              htmlFor="CapitalInvestment"
              className="block font-bold mb-2 text-gray-700 mt-4"
            >
              Capital Investment:
            </label>
            <input
              id="CapitalInvestment"
              type="number"
              placeholder="Capital Investment"
              className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setDetails({ ...details, [e.target.id]: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="CompanyLogo"
              className="block font-bold mb-2 text-gray-700"
            >
              Company Logo:
            </label>
            <div className="w-full p-3 rounded-md flex justify-right items-center h-24 " >
              <input
                id="CompanyLogo"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleLogoChange}
              />
              <label
                htmlFor="CompanyLogo"
                className="cursor-pointer"
              >
                {logo ? (
                  <img src={URL.createObjectURL(logo)} alt="Company Logo" className="w-24 h-24 object-cover rounded-md" />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex justify-center items-center text-2xl text-gray-500 cursor-pointer">
                    +
                  </div>
                )}
              </label>
            </div>
            <label
              htmlFor="Sector"
              className="block font-bold mb-2 text-gray-700 mt-4"
            >
              Sector:
            </label>
            <select
              id="Sector"
              placeholder="Select option"
              className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setDetails({ ...details, [e.target.id]: e.target.value })}
            >
              <option value="private">AYURVEDA</option>
              <option value="partnership">YOGA</option>
              <option value="private">UNANI</option>
              <option value="partnership">SIDHA</option>
              <option value="private">HOMOEPATHY</option>
            </select>
            <label
              htmlFor="PAN"
              className="block font-bold mb-2 text-gray-700 mt-4"
            >
              PAN:
            </label>
            <input
              id="PAN"
              type="text"
              placeholder="PAN"
              className="w-full p-3 pl-5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setDetails({ ...details, [e.target.id]: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="button"
            className="bg-green-600 text-white p-3 rounded-md cursor-pointer hover:opacity-90"
            onClick={submit}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </section>
  );
};

export default EntityDetails;