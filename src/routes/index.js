const express = require('express');
const router = express.Router();

// Import route modules
// const userRoutes = require('./user.routes');
// const authRoutes = require('./auth.routes');

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
