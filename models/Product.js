const fs = require('fs');
const rootDir = require('../utils/path');
const path = require('path');
const { deleteProductFromCart } = require('./Cart');

const productsPath = path.join(rootDir, 'data', 'products.json');
const productsPath_2 = path.join(rootDir, 'config', 'database.json');

const getProductsFromFile = (callback) => {
    fs.readFile(productsPath, (err, productsData) => {
        if (err) {
            return callback([])
        };

        return callback(JSON.parse(productsData))
    })

}
const getProductsFromFile_2 = (callback) => {
    fs.readFile(productsPath_2, (err, productsData) => {
        if (err) {
            return callback([])
        };

        return callback(JSON.parse(productsData))
    })

}

exports.saveProduct = (product) => {
    // const productsPath = path.join(rootDir, 'data', 'products.json');
    getProductsFromFile((productsData) => {
        productsData.push(product);
        fs.writeFile(productsPath, JSON.stringify(productsData), (err) => {

        });
    });
}

exports.fetchAllProducts = (callback) => {
    getProductsFromFile(callback);
};
exports.fetchAllProducts_2 = (callback) => {
    getProductsFromFile_2(callback);
};


exports.getProductById = (productId, callback) => {
    getProductsFromFile((products) => {
        const product = products.find(p => p.id.toString() === productId)
        callback(product);
    })
}
exports.getProductById_2 = (productId, callback) => {
    getProductsFromFile_2((products) => {
        const product = products.find(p => p.id.toString() === productId)
        callback(product);
    })
}

exports.updateProductById = (product, productId) => {
    getProductsFromFile((products) => {
        const existingProductIndex = products.findIndex(prod => prod.id.toString() === productId);

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = product;
        fs.writeFile(productsPath, JSON.stringify(updatedProducts), err => console.log(err))
    })
};

exports.deleteProductById = (productId, callback) => {
    getProductsFromFile(products => {
        let updatedProducts = products.filter(product => product.id.toString() !== productId.toString());
        deleteProductFromCart(productId);

        fs.writeFile(productsPath, JSON.stringify(updatedProducts), err => console.log(err));

        callback();
    });
};