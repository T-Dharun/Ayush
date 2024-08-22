const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

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
    const bucketName = process.env.AWS_S3_BUCKET;
    const currentDate = new Date().toISOString().split('T')[0];

    for (const key of Object.keys(files)) { // Use Object.keys to iterate over file keys
      const file = files[key][0]; // Access the first file in the array (assuming single file per field)
      const filePath = `${key}_${currentDate}.pdf`;

      const params = {
        Bucket: bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: 'application/pdf',
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      console.log(`File uploaded successfully: ${filePath}`);
    }

    res.status(200).send('Files uploaded successfully');
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).send('Error uploading files');
  }
};
