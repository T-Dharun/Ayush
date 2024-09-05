const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Startup = require("../models/Startup");
const Mentor = require('../models/Mentor');
const Investor = require('../models/Investor');
const mongoose = require("mongoose");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const stringSimilarity = require("string-similarity");
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

exports.uploadFiles = async (req, res) => {
  try {
    const files = req.files;
    const userId = mongoose.Types.ObjectId(req.user.id);
    //console.log(userId);
    // Find or create the startup document
    let startup = await Startup.findOne({ userId });
    if (!startup) {
      return res.status(404).send("Startup not found");
    }
    if (!startup.documents) {
      startup.documents = {};
    }
    const bucketName = process.env.AWS_S3_BUCKET;
    const currentDate = new Date().toISOString().split("T")[0];

    for (const key of Object.keys(files)) {
      // Use Object.keys to iterate over file keys
      const file = files[key][0]; // Access the first file in the array (assuming single file per field)
      const filePath = `${key}_${currentDate}.pdf`;

      const params = {
        Bucket: bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: "application/pdf",
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      console.log(`File uploaded successfully: ${filePath}`);
      // Store the file path in the corresponding field in the documents subdocument
      console.log(
        `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`
      );
      startup.documents[
        key
      ] = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;
      console.log("same", startup.documents[key], "key", key);
    }
    await startup.save();
    res.status(200).send("Files uploaded successfully");
  } catch (err) {
    console.log("Error uploading files:", err);
    res.status(500).send("Error uploading files");
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id);
    // Find the startup associated with the userId
    const startup = await Startup.findOne({ userId });

    if (!startup) {
      return res.status(404).send("Startup not found");
    }

    // Extract the documents subdocument
    const documents = startup.documents;

    if (!documents || Object.keys(documents).length === 0) {
      return res.status(404).send("No documents found");
    }

    // Return the document paths as JSON
    res.status(200).json(documents);
  } catch (err) {
    console.error("Error retrieving documents:", err);
    res.status(500).send("Error retrieving documents");
  }
};

/**
 * Verifies the authenticity of a PDF document by comparing extracted text with provided data fields.
 * @param {Object} input - The input object containing filepath and data.
 * @param {string} input.filepath - The path to the PDF file.
 * @param {Object} input.data - An object with key-value pairs to verify against the PDF content.
 * @returns {Promise<boolean>} - Returns true if all fields match; otherwise, false.
 */
const verifyDocumentAuthenticity = async ({ filepath, data }) => {
  try {
    // Read the PDF file from the specified filepath
    const dataBuffer = fs.readFileSync(filepath);

    // Extract text from the PDF
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    // Iterate over each field in the data object
    for (const [field, expectedValue] of Object.entries(data)) {
      if (!expectedValue) {
        // If the expected value is null, undefined, or empty, skip comparison for this field
        continue;
      }

      // Normalize both extracted text and expected value for comparison
      const normalizedExtractedText = extractedText.toLowerCase();
      const normalizedExpectedValue = expectedValue.toString().toLowerCase();

      // Check for exact match
      let isMatch = normalizedExtractedText.includes(normalizedExpectedValue);

      // If exact match not found, attempt fuzzy matching
      if (!isMatch) {
        // Split the extracted text into lines for better matching
        const lines = extractedText
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        // Find the best similarity match for the expected value among all lines
        const { bestMatch } = stringSimilarity.findBestMatch(
          normalizedExpectedValue,
          lines.map((line) => line.toLowerCase())
        );

        // Define a similarity threshold (e.g., 0.8 out of 1)
        const similarityThreshold = 0.8;

        if (bestMatch.rating >= similarityThreshold) {
          isMatch = true;
        }
      }

      // If the current field does not match, return false immediately
      if (!isMatch) {
        console.log(
          `Mismatch found for field "${field}": Expected "${expectedValue}" not found in document.`
        );
        return false;
      } else {
        console.log(`Field "${field}" matched successfully.`);
      }
    }

    // If all fields matched
    return true;
  } catch (error) {
    console.error("Error during document verification:", error);
    return false;
  }
};

exports.verifyDocument = async (req, res) => {
  const { filepath, data } = req.body;

  if (!filepath || !data) {
    return res
      .status(400)
      .json({ message: "Invalid input. Filepath and data are required." });
  }

  try {
    const isAuthentic = await verifyDocumentAuthenticity({ filepath, data });
    if (isAuthentic) {
      return res
        .status(200)
        .json({ message: "The document is authentic.", isAuthentic: true });
    } else {
      return res.status(200).json({
        message: "The document is not authentic.",
        isAuthentic: false,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during verification process.", error });
  }
};

const uploadImageToS3 = async (file, filePath) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;
};

exports.uploadImage = async (req, res) => {
  try {
    const { userType } = req.body;
    const userId = req.user.id;
    const files = req.files;

    let model;
    switch (userType) {
      case "startup":
        model = Startup;
        break;
      case "mentor":
        model = Mentor;
        break;
      case "investor":
        model = Investor;
        break;
      default:
        return res.status(400).send("Invalid user type");
    }

    const user = await model.findOne({
      userId: mongoose.Types.ObjectId(userId),
    });

    if (!user) {
      return res
        .status(404)
        .send(
          `${userType.charAt(0).toUpperCase() + userType.slice(1)} not found`
        );
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const imageUrls = [];

    for (const file of files) {
      const filePath = `${userType}_${file.fieldname}_${currentDate}.${
        file.mimetype.split("/")[1]
      }`;
      const imageUrl = await uploadImageToS3(file, filePath);
      imageUrls.push(imageUrl);
    }

    user.logo.push(...imageUrls);
    await user.save();

    res
      .status(200)
      .json({ message: "Image(s) uploaded successfully", imageUrls });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).send("Error uploading image");
  }
};
