const express = require('express');
const { postAddToCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/auth');
const router = express();

router.post('/add-to-cart', verifyToken, postAddToCart);

module.exports = router