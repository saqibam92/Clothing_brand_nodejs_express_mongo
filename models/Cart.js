const fs = require('fs');
const rootDir = require('../utils/path');
const path = require('path');
const cartPath = path.join(rootDir, 'data', 'cart.json');

exports.getCartDetailsFromFile = (callback) => {
    const cartPath = path.join(rootDir, 'data', 'cart.json');
    fs.readFile(cartPath, (err, cartContent) => {
        let cart = { products: [] };
        console.log(cartContent)

        if (!err) {
            cart = JSON.parse(cartContent);
        };

        return callback(cart);
        // console.log(cart)
    });
};

exports.addProductToCart = (productId, productPrice) => {

    this.getCartDetailsFromFile((cart) => {
        let cartProduct = cart.products;
        console.log(cart.products)
        let existingProductIndex = cart.products.findIndex(p => p.id.toString() === productId);
        let updatedProduct;

        if (existingProductIndex != -1) {
            updatedProduct = { ...cart.products[existingProductIndex] };
            updatedProduct.quantity += 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        } else {
            updatedProduct = { id: productId, quantity: 1 };
            cart.products = [...cart.products, updatedProduct]
        }

        // cart.totalPrice += +productPrice;                

        fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
            console.log(err);
        });
    });
};

exports.deleteProductFromCart = (productId, cb = '') => {
    this.getCartDetailsFromFile((cart) => {
        let cartProduct = cart.products;
        let updatedCartProducts = cartProduct.filter(prod => prod.id.toString() != productId.toString());

        fs.writeFile(cartPath, JSON.stringify({products: updatedCartProducts}), err => console.log(err));

        if(cb) {
            cb();
        };
    });
};