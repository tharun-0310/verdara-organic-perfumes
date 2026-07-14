const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
const sendContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    await Contact.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. The Verdara team will respond shortly.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendContact };
