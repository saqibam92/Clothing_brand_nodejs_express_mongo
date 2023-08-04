const express = require('express');
const upload = require('../utils/upload_images')

const router = express();
const { getSingleProduct, getAllProducts, getCollection, getProductsList, getProductDetailsPage } = require('../controllers/admin/product_controller');
const verifyToken = require('../middleware/auth');
const { postAddProduct, getEditProduct, getSearchProduct, paginateProduct } = require('../controllers/productController');

router.get('/single_product/:productId', getSingleProduct)

router.get('/products', getAllProducts)

router.get('/summer_collection', getCollection)

router.get('/products_list', getProductsList)

router.get('/product/details/:productId', getProductDetailsPage);


// Add product
router.post('/add-product', upload.array('images'), verifyToken, postAddProduct);
// router.get('/get-products', verifyToken, getEditProduct)
router.get('/get-products', getEditProduct);
router.get('/search-products', verifyToken, getSearchProduct);
router.post('/paginate', paginateProduct)

module.exports = router