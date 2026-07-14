const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/products
router.get('/', getProducts);

// GET /api/products/featured
router.get('/featured', getFeaturedProducts);

// GET /api/products/:slug
router.get('/:slug', getProductBySlug);

// POST /api/products  (admin only)
router.post('/', protect, adminOnly, createProduct);

// PUT /api/products/:id  (admin only)
router.put('/:id', protect, adminOnly, updateProduct);

// DELETE /api/products/:id  (admin only)
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
