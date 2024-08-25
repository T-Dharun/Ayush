const mongoose = require("mongoose"); // Import mongoose
const Startup = require("../models/Startup");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "spack1022005@gmail.com",
    pass: "sdapnqmawpzfbpru",
  },
  port: 587, // or use 587 for STARTTLS
  secure: true,
});
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
    //console.log(userId);
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
exports.sendMail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  const mailOptions = {
    from: "spack1022005@gmail.com",
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send(`Error sending email: ${error.message}`);
  }
};

exports.createStartup = async (req, res) => {
  const { step, data } = req.body;
  if (!step || !data) {
    return res.status(400).json({ message: "Step and data are required" });
  }
  const userId = mongoose.Types.ObjectId(req.user.id);
  try {
    let startup;
    // Find the startup by user ID or any unique identifier
    if (step === 1) {
      // For step 1, if the startup does not exist, create a new one
      startup = await Startup.findOneAndUpdate(
        { userId }, // Find by user ID
        {
          $set: {
            name: data.name,
            logo: data.logo,
            typeOfEntity: data.typeOfEntity,
            sector: data.sector,
            CINNumber: data.CINNumber,
            panCard: data.panCard,
            capitalInvestment: data.capitalInvestment,
          },
        },
        { new: true, upsert: true } // Create if not exists, return updated doc
      );
    } else {
      // For other steps, handle updates as before
      startup = await Startup.findOne({ userId: data.userId });
      if (!startup) {
        return res.status(404).json({ message: "Startup not found" });
      }

      // Update startup fields based on the step
      switch (step) {
        case 2:
          startup.registeredAddress =
            data.registeredAddress || startup.registeredAddress;
          startup.contactPerson = data.contactPerson || startup.contactPerson;
          // Add other fields for page 2
          break;
        // Handle other steps similarly
        default:
          return res.status(400).json({ message: "Invalid step" });
      }

      // Save the updated startup
      await startup.save();
    }

    res
      .status(200)
      .json({ message: "Data updated successfully", data: startup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
