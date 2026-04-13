const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true, default: '' },
  service: { type: String, trim: true, default: '' },
  budget: { type: String, trim: true, default: '' },
  timeline: { type: String, trim: true, default: '' },
  message: { type: String, trim: true, default: '' },
  projectType: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
