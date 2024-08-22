const express = require('express');
const multer = require('multer');
const documentController = require('../controllers/documentController'); // Import the controller

const router = express.Router();

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the route and pass the controller function
router.post('/upload', upload.fields([
  { name: 'gmpCertificate' },
  { name: 'coppCertificate' },
  { name: 'ayushLicenseCertificate' },
  { name: 'manufacturingLicense' },
  { name: 'companyIncorporationCertificate' },
]), documentController.uploadFiles); // Pass the controller method here

module.exports = router;
