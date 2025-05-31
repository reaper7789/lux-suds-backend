const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['affiliate', 'admin'], default: 'affiliate' },
  earnings: { type: Number, default: 0 },
  payoutEligible: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
