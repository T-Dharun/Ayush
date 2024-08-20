const mongoose = require("mongoose"); // Import mongoose
const Startup = require("../models/Startup");

exports.createStartupStepOne = async (req, res) => {
  const {
    name,
    typeOfEntity,
    dateOfIncorporation,
    registrationNumber,
    registeredAddress,
    contactPerson,
    manufacturingUnitAddress,
    productCategory,
    productionCapacity,
  } = req.body;
  try {
    // Ensure userId is an ObjectId
    const userId = mongoose.Types.ObjectId(req.user.id);
    console.log(userId);
    // Find or create the startup document
    let startup = await Startup.findOne({ userId });

    if (startup) {
      // Update existing document
      startup = Object.assign(startup, {
        name,
        typeOfEntity,
        dateOfIncorporation,
        registrationNumber,
        registeredAddress,
        contactPerson,
        manufacturingUnitAddress,
        productCategory,
        productionCapacity,
        Progress: "step1", // Ensure consistent field name
      });
    } else {
      // Create new document
      startup = new Startup({
        name,
        typeOfEntity,
        dateOfIncorporation,
        registrationNumber,
        registeredAddress,
        contactPerson,
        manufacturingUnitAddress,
        productCategory,
        productionCapacity,
        Progress: "step1", // Ensure consistent field name
        userId, // Ensure userId is set correctly
      });
    }

    await startup.save();
    res.status(201).json(startup);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.createStartupStepTwo = async (req, res) => {
  const {
    gmpCertificate,
    coppCertificate,
    ayushLicenseCertificate,
    manufacturingLicense,
    companyIncorporationCertificate,
  } = req.body;

  try {
    // Ensure userId is an ObjectId
    const userId = mongoose.Types.ObjectId(req.user.id);

    const startup = await Startup.findOne({ userId });

    if (!startup) {
      return res.status(404).json({ msg: "Startup not found" });
    }

    // Update the existing startup with document details
    startup.documents = {
      gmpCertificate,
      coppCertificate,
      ayushLicenseCertificate,
      manufacturingLicense,
      companyIncorporationCertificate,
    };
    startup.Progress = "step2"; // Ensure consistent field name

    await startup.save();
    res.status(200).json(startup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createStartupStepThree = async (req, res) => {
  const {
    panCard,
    gstRegistrationNo,
    ieCode,
    capitalInvestment,
    bankAccountDetails,
  } = req.body;

  try {
    // Ensure userId is an ObjectId
    const userId = mongoose.Types.ObjectId(req.user.id);

    const startup = await Startup.findOne({ userId });

    if (!startup) {
      return res.status(404).json({ msg: "Startup not found" });
    }

    // Update the existing startup with financial details
    startup.panCard = panCard;
    startup.gstRegistrationNo = gstRegistrationNo;
    startup.ieCode = ieCode;
    startup.capitalInvestment = capitalInvestment;
    startup.bankDetails = bankAccountDetails;
    startup.Progress = "step3"; // Ensure consistent field name

    await startup.save();
    res.status(200).json(startup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getStartups = async (req, res) => {
  try {
    // Ensure userId is an ObjectId
    const userId = mongoose.Types.ObjectId(req.user.id);

    const startups = await Startup.find({ userId });
    res.json(startups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getStartupById = async (req, res) => {
  try {
    // Ensure req.params.id is an ObjectId
    const startupId = mongoose.Types.ObjectId(req.params.id);

    const startup = await Startup.findById(startupId);
    if (!startup) {
      return res.status(404).json({ msg: "Startup not found" });
    }
    res.json(startup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
