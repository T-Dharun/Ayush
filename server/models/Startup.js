const mongoose = require("mongoose");
const BankDetailsSchema = new mongoose.Schema({
  bankName: String,
  accountNumber: String,
  ifscCode: String,
});
const DocumentSchema = new mongoose.Schema({
  gmpCertificate: String,
  coppCertificate: String,
  ayushLicenseCertificate: String,
  manufacturingLicense: String,
  companyIncorporationCertificate: String,
});
const StartupSchema = new mongoose.Schema({
  name: String,
  typeOfEntity: { type: String, enum: ["private", "partnership"] },
  dateOfIncorporation: Date,
  registrationNumber: String,
  registeredAddress: String,
  contactPerson: String,
  manufacturingUnitAddress: String,
  productCategory: String,
  productionCapacity: Number,
  documents: DocumentSchema,
  bankDetails: BankDetailsSchema,
  panCard: String,
  gstRegistrationNo: String,
  ieCode: String,
  capitalInvestment: Number,
  progress: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Startup", StartupSchema);
