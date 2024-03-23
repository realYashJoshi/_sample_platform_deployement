// authMiddleware.js

const jwt = require('jsonwebtoken');
// const config = require('../config'); // Import your JWT secret key from configuration

const authMiddleware = (req, res, next) => {
  // Get token from request headers
  
  const token = req.header('Authorization').split(' ')[1];
  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }
  console.log(token);
  try {
    // Verify token
    const decoded = jwt.verify(token, 'secret123'); // Verify JWT token using secret key
    req.user = decoded.user; // Attach user payload to request object
    next(); // Call next middleware
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;