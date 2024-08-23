const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Startup = require("../models/Startup");
const mongoose = require("mongoose");
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
    startup.documents[
      key
    ] = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;
  }
  await startup.save();
  res.status(200).send("Files uploaded successfully");
} catch (err) {
  console.error("Error uploading files:", err);
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
