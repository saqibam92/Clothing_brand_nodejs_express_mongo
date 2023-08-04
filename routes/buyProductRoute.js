const { postBuyProduct } = require('../controllers/buyProductController');
const verifyToken = require('../middleware/auth');

const router = require('express')();

router.post('/buy_product', verifyToken, postBuyProduct);

module.exports= router;