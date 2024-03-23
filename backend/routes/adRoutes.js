// routes/adsRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Ad = require('../models/Ad');
const verifyToken=require('../middlewares/adMiddleware')
const fetchadController=require('../controllers/fetchadController')


// Route to fetch ads targeted towards the authenticated viewer
router.get('/', verifyToken, fetchadController);

module.exports = router;
