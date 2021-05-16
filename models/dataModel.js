const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  create_date: { type: Date, default: Date.now },
  update_date: { type: Date },
});

// Export Data model
module.exports = mongoose.model('data', dataSchema);
