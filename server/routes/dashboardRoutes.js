const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const router = express.Router();

const authenticateJWT = require('../middleware/authMiddleware');

router.get('/stats', authenticateJWT, getDashboardStats);

module.exports = router;