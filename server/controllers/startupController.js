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
        progress: "step1", // Ensure consistent field name
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
        progress: "step1", // Ensure consistent field name
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
    startup.progress = "step2";
    startup.documents = {
      gmpCertificate,
      coppCertificate,
      ayushLicenseCertificate,
      manufacturingLicense,
      companyIncorporationCertificate,
    };
    // Ensure consistent field name
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
    startup.progress = "step3"; // Ensure consistent field name
    startup.status = "initial";

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
    console.log(req.user.id);
    console.log("fasdf")
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
  let { step, data } = req.body;
  //console.log(req.body);
  if (!step || !data) {
    return res.status(400).json({ message: "Step and data are required" });
  }

  try {
    const userId = mongoose.Types.ObjectId(req.user.id);
    let startup = await Startup.findOne({ userId });
    if (!startup) {
      if (step === 1) {
        // Create new startup if it does not exist`
        const userid = data.userId;
        //console.log(data);
        data = data.details;
        startup = new Startup({
          userId: userid,
          // Initialize fields for step 1
          name: data.name,
          logo: data.logo,
          typeOfEntity: data.typeOfEntity,
          sector: data.sector,
          CINNumber: data.CINNumber,
          panCard: data.panCard,
          capitalInvestment: data.capitalInvestment,
          progress: `${step}`,
        });
        //console.log(startup);
      } else {
        return res.status(404).json({ message: "Startup not found" });
      }
    }

    // Update startup fields based on the step
    switch (step) {
      case 1:
        // Fields for step 1 (already handled in creation)
        break;
      case 2:
        //console.log(req.body);
        const { officeAddress, manufacturingAddress } = req.body.data;
        startup.set({
          progress: `${step}`,
          Address: [{ ...officeAddress }, { ...manufacturingAddress }], // Directly using the manufacturingAddress from frontend
        });
        await startup.save();
        //console.log(officeAddress);
        break;
      case 3:
        //  console.log(req.body);
        startup.set({
          progress: `${step}`,
          Person: { ...data },
        });
        //  console.log(data);
        await startup.save();
        //console.log(officeAddress);
        break;
      case 4:
        console.log(data);
        if (data.founders && Array.isArray(data.founders)) {
          // Validate and append each person to the existing array
          data.founders.forEach((person) => {
            if (person.type === "representative") {
              const { name, Designation, mobile, email, Gender } = person;
              if (!name || !Designation || !mobile || !email || !Gender) {
                throw new Error("Missing required fields for representative");
              }
            }
            // Append new persons to the existing array
            startup.Person.push(person);
            startup.set({
              progress:`${step}`
            })

          });
        }
        break;
      case 5:
        //console.log(data);
        let status;
        switch(data.cardPicked){
          case 0: status='ideathon';break;
          case 2: status='earlytraction';break;
          case 1: status='validation';break;
          case 3: status='scaling';break;
          default: status='' ;break;
        }
        startup.set({
          progress: `${step}`,
          Stage:status,
          Details:data.mergedArray
        });
        //  console.log(data);
        await startup.save();
      case 7:
        //console.log(req.body);
        startup.set({
          progress: `${step}`,
          termsAndCondition: true,
          status: "initial",
        });
        //console.log(data);
        await startup.save();
        //console.log(officeAddress);
        break;

      case 6:
        if (data.bankDetails) {
          startup.bankDetails = {
            bankName:
              data.bankDetails.bankName || startup.bankDetails?.bankName,
            accountNumber:
              data.bankDetails.accountNumber ||
              startup.bankDetails?.accountNumber,
            ifscCode:
              data.bankDetails.ifscCode || startup.bankDetails?.ifscCode,
          };
        }

        // Preserve file paths if they exist and only update the fields that are provided
        if (data.documents) {
          startup.documents = {
            gmpCertificateNumber:
              data.documents.gmpCertificateNumber ||
              startup.documents?.gmpCertificateNumber,
            coppCertificateNumber:
              data.documents.coppCertificateNumber ||
              startup.documents?.coppCertificateNumber,
            ayushLicenseCertificateNumber:
              data.documents.ayushLicenseCertificateNumber ||
              startup.documents?.ayushLicenseCertificateNumber,
            manufacturingLicenseNumber:
              data.documents.manufacturingLicenseNumber ||
              startup.documents?.manufacturingLicenseNumber,
            companyIncorporationCertificateNumber:
              data.documents.companyIncorporationCertificateNumber ||
              startup.documents?.companyIncorporationCertificateNumber,
            // Preserve file path data
            gmpCertificate:
              startup.documents?.gmpCertificate ||
              data.documents.gmpCertificate,
            coppCertificate:
              startup.documents?.coppCertificate ||
              data.documents.coppCertificate,
            ayushLicenseCertificate:
              startup.documents?.ayushLicenseCertificate ||
              data.documents.ayushLicenseCertificate,
            manufacturingLicense:
              startup.documents?.manufacturingLicense ||
              data.documents.manufacturingLicense,
            companyIncorporationCertificate:
              startup.documents?.companyIncorporationCertificate ||
              data.documents.companyIncorporationCertificate,
          };
        }
        break;
      default:
        return res.status(400).json({ message: "Invalid step" });
    }

    // Save the updated startup
    await startup.save();

    res
      .status(200)
      .json({ message: "Data updated successfully", data: startup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
