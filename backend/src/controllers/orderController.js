const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided.' });
    }

    // Verify products and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.product} not found.` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}.`,
        });
      }

      subtotal += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || null,
        price: product.price,
        quantity: item.quantity,
        size: item.size || product.size,
      });

      // Reduce stock
      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -item.quantity } });
    }

    const shippingPrice = subtotal >= 100 ? 0 : 8.99;
    const totalPrice = subtotal + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'card',
      subtotal,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json({ success: true, message: 'Order placed successfully.', order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name slug images')
      .sort('-createdAt');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name slug images');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Users can only see their own orders; admins see all
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrderById };
