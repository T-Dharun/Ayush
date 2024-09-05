import React, { useState } from "react";
import mentorLogo from "../../assets/mentor.jpg"; // Example logo for mentors
import poster from "../../assets/poster.jpg"; // Reuse the same poster
import linkedin from "../../assets/linkedin.jpeg"; // Example social media icons
import twitter from "../../assets/x.webp";
import facebook from "../../assets/facebook.png";
import Post from "../social/posts";
import axiosHeader from "../../axiosHeader";
// Data object for mentors
const mentorData = {
  logo: mentorLogo,
  name: "Mentor Name",
  title: "Mentor Title",
  bio: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae justo ac orci congue pharetra. 
    Suspendisse potenti. Nulla facilisi. Maecenas sit amet quam et lacus elementum dictum. Donec nec felis erat. 
    Duis eget ultricies ex. Donec non volutpat orci, eu sollicitudin tortor. Cras vehicula est a lectus feugiat, 
    vel lacinia orci iaculis. Sed sit amet metus neque. Integer nec odio ut dolor hendrerit volutpat sit amet vel augue. 
    Vivamus euismod nunc ut purus luctus, a dapibus ante malesuada. Nullam eget urna nisi. Curabitur vehicula semper 
    ligula, eu maximus erat.
  `,
  socialMedia: [
    { url: "https://www.linkedin.com", icon: linkedin },
    { url: "https://twitter.com", icon: twitter },
    { url: "https://www.facebook.com", icon: facebook },
    // Addl media icons here if needed
  ],
  expertise: [
    ["Field of Expertise", "Technology"],
    ["Years of Experience", "15"],
    ["Industry", "Software Development"],
    ["Achievements", "Published author, Speaker at tech conferences"],
    ["Mentoring Style", "Hands-on, Collaborative"]
  ]
};

const MentorProfile = () => {
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
            src={mentorData.logo}
            alt="Mentor Logo"
            className="w-32 h-32 mb-4 rounded-full border border-gray-300 shadow-md"
          />
          {/* Mentor Name */}
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{mentorData.name}</h1>
          {/* Mentor Title */}
          <h2 className="text-xl font-semibold text-gray-600 mb-4">{mentorData.title}</h2>
          {/* Bio */}
          <p className="text-gray-700 text-base mb-4 mt-4">
            {isExpanded ? mentorData.bio : `${mentorData.bio.slice(0, mentorData.bio.length * 0.3)}...`}
          </p>
          <button
            onClick={handleToggle}
            className="text-blue-500 mt-4 inline-block hover:underline"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6">
            {mentorData.socialMedia.map((item, index) => (
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

      {/* Right Side - Expertise */}
      <div className="flex-1 md:w-2/3 bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Mentor Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {mentorData.expertise.map((item, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg text-center">
              <p className="text-gray-700 text-sm">{item[0]}</p>
              <p className="font-bold text-lg">{item[1]}</p>
            </div>
          ))}
          
        </div>
        <div className="w-full px-6 py-10 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg mt-8 shadow-lg">
  <div className="mx-auto max-w-screen-lg lg:grid lg:grid-cols-5 lg:gap-6 items-center">
    {/* Left Side: Text */}
    <div className="lg:col-span-3 text-white">
      <h1 className="text-2xl font-extrabold sm:text-3xl mb-2">
        Stay Updated with {mentorData.name}
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

export default MentorProfile;
