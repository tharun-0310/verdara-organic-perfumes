const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// GET /api/health
router.get('/', (req, res) => {
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.status(200).json({
    success: true,
    message: '🌿 Verdara API is running.',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbState[mongoose.connection.readyState] || 'unknown',
      name: mongoose.connection.name || null,
    },
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

module.exports = router;
