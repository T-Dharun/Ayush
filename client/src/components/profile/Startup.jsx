import React, { useState } from "react";
import startup from "../../assets/startup.webp";
import poster from "../../assets/poster.jpg";
import google from "../../assets/google.jpeg";
import microsoft from "../../assets/microsoft.png";
import x from "../../assets/x.webp";
import facebook  from "../../assets/facebook.png";
import Post from "../social/posts";
import axiosHeader from "../../axiosHeader";
// Data object
const startupData = {
  logo: startup,
  name: "Company Name",
  founder: {
    name: "XXXXXXXX",
    email: "xxxxxxx",
    phone: "xxxxxxx",
    location: "xxxxxxx"
  },
  socialMedia: [
    { url: "https://github.com/satheesh1022005", icon: google },
    { url: "https://github.com/satheesh1022005", icon: microsoft },
    { url: "https://github.com/satheesh1022005", icon: facebook },
    { url: "https://github.com/satheesh1022005", icon: x }
    // Add more social media icons here if needed
  ],
  overviewText: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae justo ac orci congue pharetra. 
    Suspendisse potenti. Nulla facilisi. Maecenas sit amet quam et lacus elementum dictum. Donec nec felis erat. 
    Duis eget ultricies ex. Donec non volutpat orci, eu sollicitudin tortor. Cras vehicula est a lectus feugiat, 
    vel lacinia orci iaculis. Sed sit amet metus neque. Integer nec odio ut dolor hendrerit volutpat sit amet vel augue. 
    Vivamus euismod nunc ut purus luctus, a dapibus ante malesuada. Nullam eget urna nisi. Curabitur vehicula semper 
    ligula, eu maximus erat.
  `,
  stages: [
    ["Stage","Idea"],
    ["Focus Industry","AYUSH"],
    ["Foucus Sector","Yoga"],
    ["Service Area","Tamilnadu,Kerala,Karnataka"],
    ["No Of Active Years","10"],
    ["Capital Investment","10000000000"]
  ]
};

const Startup = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ message: "", error: false });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // Simple email validation regex
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setStatus({ message: "Please enter a valid email address.", error: true });
      return;
    }
  
    setLoading(true);
    setStatus({ message: "", error: false });
  
    try {
      const response = await axiosHeader.post("/startups/sendmail", { 
        to: email, 
        subject: "Welcome to Ayush Startup Registration", 
        text: "Thank you for subscribing to our newsletter! Stay tuned for the latest updates.", 
        html: "<p>Thank you for subscribing to our newsletter! Stay tuned for the latest updates.</p>"
      });
  
      setStatus({
        message: "Subscription successful! Please check your email for confirmation.",
        error: false,
      });
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setStatus({
        message: error.response?.data?.message || "An error occurred. Please try again later.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Left Side - Info */}
      <div className="flex flex-col md:w-1/3 bg-white p-6 rounded-lg mb-6 md:mb-0 shadow-lg">
  <div className="flex flex-col items-center">
    {/* Logo */}
    <img
      src={startupData.logo}
      alt="Company Logo"
      className="w-32 h-32 mb-4 rounded-full border border-gray-300 shadow-md"
    />
    {/* Company Name */}
    <h1 className="text-3xl font-bold mb-2 text-gray-800">{startupData.name}</h1>
    {/* Founder Details */}
    <div className="text-gray-700 text-base mb-4 mt-4"> {/* Changed text-sm to text-base */}
  <div className="flex items-center mb-3"> {/* Increased margin-bottom */}
    <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.403-4.209A3.992 3.992 0 0016 11H5a3.992 3.992 0 00-2.597 1.791L1 17h5m6 0v-6m0 0V9m0 2l3-3m-3 3l-3-3"></path>
    </svg>
    <p className="text-lg font-semibold">Founder: {startupData.founder.name}</p> {/* Increased font size and weight */}
  </div>
  <div className="flex items-center mb-3">
    <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v6.293l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L12 9.293V3m0 18v-6.293l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 15.707V21"></path>
    </svg>
    <p className="text-lg font-semibold">Email: {startupData.founder.email}</p>
  </div>
  <div className="flex items-center mb-3">
    <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10h10v4H7m4-10h4v4h-4V4zm-1 6H6v8h14v-8h-4V6H8v4z"></path>
    </svg>
    <p className="text-lg font-semibold">Phone: {startupData.founder.phone}</p>
  </div>
  <div className="flex items-center mb-3">
    <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 21v-2a4 4 0 00-4-4H8V9h4V6a4 4 0 014-4 4 4 0 014 4v3h2a4 4 0 014 4v7m-8-4h2v-4h-2m-4 4h2v-6H8v6z"></path>
    </svg>
    <p className="text-lg font-semibold">Location: {startupData.founder.location}</p>
  </div>
</div>
    {/* Social Media Icons */}
    <div className="flex space-x-4">
  {startupData.socialMedia.map((item, index) => (
    <a
      href={item.url}
      key={index}
      className="relative rounded-full transition-transform transform hover:scale-110"
    >
      <img
        src={item.icon}
        alt="Social Icon"
        className="w-11 h-11 rounded-full transition-transform"
      />
      <span className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-sm transition-opacity group-hover:opacity-30"></span>
    </a>    
  ))}
</div>
  </div>
</div>


      {/* Right Side - Company Overview */}
      <div className="flex-1 md:w-2/3 bg-white p-6 rounded-lg">
        {/* Poster */}
        <img
          src={poster}
          alt="Poster"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">Company Overview</h2>
          <p className="text-gray-700 text-sm">
            {isExpanded ? startupData.overviewText : `${startupData.overviewText.slice(0, startupData.overviewText.length * 0.3)}...`}
          </p>
          <button
            onClick={handleToggle}
            className="text-blue-500 mt-4 inline-block hover:underline"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {startupData.stages.map((stage, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg text-center">
              <p className="text-gray-700 text-sm">{stage[0]}</p>
              <p className="font-bold text-lg">{stage[1]}</p>
            </div>
          ))}
        </div>
        <div className="w-full px-6 py-10 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg mt-8 shadow-lg">
  <div className="mx-auto max-w-screen-lg lg:grid lg:grid-cols-5 lg:gap-6 items-center">
    {/* Left Side: Text */}
    <div className="lg:col-span-3 text-white">
      <h1 className="text-2xl font-extrabold sm:text-3xl mb-2">
        Stay Updated with Us
      </h1>
      <p className="font-medium text-lg mb-4">
        Subscribe to our newsletter for expert tips and latest updates on how to successfully register your Ayush startup.
      </p>
    </div>
    {/* Right Side: Form */}
    <div className="lg:col-span-2">
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row items-center justify-center w-full"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow rounded-lg p-3 text-black mb-4 sm:mb-0 sm:mr-4 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-white text-indigo-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status.message && (
        <p
          className={`mt-3 text-center ${
            status.error ? "text-red-500" : "text-green-500"
          }`}
        >
          {status.message}
        </p>
      )}
    </div>
  </div>
</div>

      </div>
    </div>
    <Post/>
    </>

  );
};

export default Startup;
