const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Get reviews for a product
// @route   GET /api/products/:id/reviews
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate('user', 'name avatar')
      .sort('-createdAt');
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a review
// @route   POST /api/products/:id/reviews
const createReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const existing = await Review.findOne({ user: req.user._id, product: req.params.id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product.' });
    }

    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Rating and comment are required.' });
    }

    const review = await Review.create({
      user: req.user._id,
      product: req.params.id,
      rating: Number(rating),
      comment,
    });

    const populated = await review.populate('user', 'name avatar');

    res.status(201).json({ success: true, message: 'Review submitted.', review: populated });
  } catch (error) {
    next(error);
  }
};

module.exports = { getReviews, createReview };
