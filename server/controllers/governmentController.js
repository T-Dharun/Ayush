// governmentController.js

const Startup = require("../models/Startup");

exports.getStartup = async (req, res) => {
    console.log("clerk")
  try {
    const startups = await Startup.find({status:"pending"}); // Fetch all startups
    res.json(startups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getStartupById = async (req, res) => {
    try {
      const startup = await Startup.findById(req.params.id);
      if (!startup) {
        return res.status(404).json({ msg: "Startup not found" });
      }
      res.json(startup);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
  

  exports.verifyStartup = async (req, res) => {
    try {
      // Find the startup by ID
      const startup = await Startup.findById(req.params.id);
  
      if (!startup) {
        return res.status(404).json({ msg: "Startup not found" });
      }
  
      // Update the status to "rejected"
      startup.status = "proceed"; // Directly update the field
      await startup.save(); // Save the changes
  
      res.json(startup);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
  
  
  exports.rejectStartup = async (req, res) => {
    try {
      // Find the startup by ID
      const startup = await Startup.findById(req.params.id);
  
      if (!startup) {
        return res.status(404).json({ msg: "Startup not found" });
      }
  
      // Update the status to "rejected"
      startup.status = "rejected"; // Directly update the field
      await startup.save(); // Save the changes
  
      res.json({
        msg:req.body.message || "Document mismatch",
        status:"rejected"
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
  