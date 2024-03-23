const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Ad = require('../models/Ad');
const verifyToken=require('../middlewares/adMiddleware')
const fetchadController=async(req,res)=>{
    try {
        // Extract user ID from authenticated request
        const userId = req.user.id;
    
        // Fetch ads targeted towards the viewer
        const ads = await Ad.find({ targets: userId });
        res.json(ads);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}
module.exports=fetchadController;