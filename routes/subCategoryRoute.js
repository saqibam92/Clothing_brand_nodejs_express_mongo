const express = require('express');
const verifyToken = require('../middleware/auth');
const { postCreateSubCategory } = require('../controllers/subCategoryController');
const router = express();


router.post('/add-sub-category', verifyToken, postCreateSubCategory);

module.exports = router;
