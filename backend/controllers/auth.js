// controllers/auth.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: hashedPassword,
      type
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, 'secret123', { expiresIn: '30d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000});
    res.status(200).json({ result: user, token});
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
exports.profile=async (req, res) => {
    try {
      // Get user ID from authenticated user (assuming it's stored in req.user.id)
      
      const token=req.header('Authorization').split(' ')[1];
      const decoded = jwt.verify(token, 'secret123');
      
      const email = decoded.email;
  
      // Fetch user from database
      const user = await User.findOne({email});
  
      // If user not found, return 404 error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return user profile data
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }