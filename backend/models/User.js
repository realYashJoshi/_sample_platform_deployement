
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['viewer', 'business'], required: true }
});

module.exports = mongoose.model('User', userSchema);
