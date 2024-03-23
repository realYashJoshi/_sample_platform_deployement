// routes/businessRoutes.js
const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

// Route to create an ad
router.post('/create-ad', adController.createAd);

module.exports = router;
