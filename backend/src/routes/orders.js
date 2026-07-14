const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// POST /api/orders  (protected)
router.post('/', protect, createOrder);

// GET /api/orders/my-orders  (protected)
router.get('/my-orders', protect, getMyOrders);

// GET /api/orders/:id  (protected)
router.get('/:id', protect, getOrderById);

module.exports = router;
