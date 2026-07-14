const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// GET /api/products/:id/reviews
router.get('/:id/reviews', getReviews);

// POST /api/products/:id/reviews  (protected)
router.post('/:id/reviews', protect, createReview);

module.exports = router;
