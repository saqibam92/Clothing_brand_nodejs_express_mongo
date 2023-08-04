const express = require('express');
const router = express.Router();
const { getHomePage } = require('../controllers/home_controller');
const { postCartPage, getCartPage, deleteCartItem } = require('../controllers/cart_controller');

router.get('/', getHomePage)

router.post('/cart', postCartPage);
router.get('/cart', getCartPage);
router.post('/cart/delete_item', deleteCartItem);

module.exports = router;