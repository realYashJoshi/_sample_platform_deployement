// controllers/adController.js
const Ad = require('../models/Ad');
const User = require('../models/User'); // Import the User model if not already imported
const cloudinary=require("cloudinary");
cloudinary.config({
  cloud_name: 'dwflnxe8b',
  api_key: '844313722789862',
  api_secret: 'TZn9mk-QZlZfIsD8oPogL7RCrMs'
});
exports.createAd = async (req, res) => {
    console.log("this is req body",req.body);
  const { adContent, targets,imageUrl,createdBy } = req.body;
 
  const uploadedImage = await cloudinary.uploader.upload(imageUrl);
  try {
    // Create the ad
    const ad = new Ad({
      content: adContent,
      targets,
      imageUrl: uploadedImage.secure_url,
      createdBy,
    });
    // Save the ad to the database
    await ad.save();
    res.status(201).json({ message: 'Ad created successfully', ad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
