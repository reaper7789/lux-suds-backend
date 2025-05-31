const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

// Middleware to ensure only admins can access
function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
}

// Get all users (affiliates)
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'affiliate' }, 'name email earnings payoutEligible');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all orders (with affiliate info)
router.get('/orders', auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
