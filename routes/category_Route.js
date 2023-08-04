const express = require('express');
const path = require('path');

const verifyToken = require('../middleware/auth')
const rootDir = require('../utils/path');
const { postAddProductCategoryPage } = require('../controllers/CategoryController');

const router = express();

router.post('/add-category', verifyToken, postAddProductCategoryPage);

module.exports= router;