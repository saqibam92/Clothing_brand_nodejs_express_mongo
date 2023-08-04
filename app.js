require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/linear')

const rootDir = require('./utils/path');

const homepage = require('./routes/home.route');
const adminRoute = require('./routes/admin.route');
const productRoute  = require('./routes/productRoute');
const user_routes = require('./routes/userRoute');
const category_routes = require('./routes/category_Route');
const subCategory_route = require('./routes/subCategoryRoute');
const common_route = require('./routes/commonRoute');
const cart_route = require('./routes/cartRoute');
const buy_product_route = require('./routes/buyProductRoute')

const app = express();

const port = process.env.PORT || 5100;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static(path.join(rootDir, 'public')));


// user Routes
app.use('/api', user_routes);
// categoty routes
app.use('/api', category_routes);
// Sub Category Route
app.use('/api', subCategory_route);
// Product Route
app.use('/api', productRoute);
// common Route
app.use('/api', common_route);
// Cart Route
app.use('/api', cart_route);
// Buy Product
app.use('/api', buy_product_route);




// Routes

app.use(homepage);
app.use('/product', adminRoute);
app.use(productRoute)



app.listen(port, () => console.log(`server is running on http://localhost:${port}`))