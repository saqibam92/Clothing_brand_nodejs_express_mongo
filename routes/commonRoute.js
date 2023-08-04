const express = require('express');
const verifyToken = require('../middleware/auth');
const { getCommonController } = require('../controllers/commonController');


const router = express();

router.get('/data-count', verifyToken, getCommonController)

module.exports = router