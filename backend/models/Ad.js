// models/Ad.js
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  content: { type: String },
  targets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: {
    type: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);
