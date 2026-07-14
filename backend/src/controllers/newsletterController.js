const Subscriber = require('../models/Subscriber');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ success: true, message: 'You are already subscribed to the Verdara garden.' });
    }

    await Subscriber.create({ email: email.toLowerCase() });

    res.status(201).json({
      success: true,
      message: 'Welcome to the Verdara garden. You have successfully subscribed.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { subscribe };
