const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/place', auth, async (req, res) => {
  const { items } = req.body;
  let profit = 0;

  items.forEach(i => profit += i.markup);

  const order = await Order.create({
    user: req.user.id,
    items,
    totalProfit: profit
  });

  const user = await User.findById(req.user.id);
  user.earnings += profit;
  if (user.earnings >= 100) user.payoutEligible = true;
  await user.save();

  res.json({ message: 'Order placed', order });
});

router.get('/my-orders', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

module.exports = router;

const orderRoutes = require('./routes/orderRoutes');
