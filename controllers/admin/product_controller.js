const allProducts = require('../../config/database.json')
const summerProduct = require('../../config/summer_23.json');
const { saveProduct, fetchAllProducts, getProductById, updateProductById, deleteProductById, fetchAllProducts_2, getProductById_2 } = require('../../models/Product');



exports.getAddProductPage = (req, res, next) => {
  const viewsData = {
    edit: false,
    pageTitle: "Add Product"
  }
  res.render('pages/add_product', viewsData)
}

exports.postAddProductPage = (req, res, next) => {
  const body = req.body;
  const product = {
    id: Date.now(),
    title: body.title,
    image: body.image,
    price: body.price,
    description: body.description
  }
  saveProduct(product)
  res.redirect('/products_list');
}


exports.getProductsList = (req, res, next) => {

  fetchAllProducts((products) => {
    const viewsData = {
      admin: false,
      products,
      pageTitle: 'Products List'
    }
    res.render('pages/products_all', viewsData)
  })
}

exports.getAdminProductsPage = (req, res) => {
  fetchAllProducts(products => {
    const viewsData = {
      admin: true,
      pageTitle: 'Admin Page Title',
      products
    }
    res.render('pages/products_all', viewsData)
  })
}

exports.getEditProductPage = (req, res) => {
  const productId = req.params.id;
  getProductById(productId, product => {
    const viewsData = {
      edit: true,
      pageTitle: "Edit Product",
      product
    }
    res.render('pages/add_product', viewsData);
  })


}

exports.postEditProductPage = (req, res) => {
  const body = req.body;
  const product = {
    id: body.productId,
    title: body.title,
    price: body.price,
    description: body.description,
    image: body.image
  };

  updateProductById(product, body.productId);
  res.redirect('/products_list');
};

exports.postDeleteProductPage = (req, res) => {
  const productId = req.body.productId;

  deleteProductById(productId, () => res.redirect('/products_list'));
};

exports.getProductDetailsPage = (req, res, next) => {
  const productId = req.params.productId;
  getProductById(productId, product => {
    const viewsdata = {
      product,
      pageTitle: product.title,
      images: product.image
    };
    res.render('pages/product_details', viewsdata);
  })
}









exports.getSingleProduct = (req, res) => {
  // const { id } = req.query;
  // if (id < 0 || id >= allProducts.length) {
  //   return res.status(404).send('<h1> No bicycle found with this ID. </h1>');
  // }
  // const product = allProducts.find((b) => b.id === id);
  // res.render('pages/single_product', { product })
  const productId = req.params.productId;
  getProductById_2(productId, product => {
    const viewsdata = {
      product,
      pageTitle: product.name,
      images: product.image
    };
    res.render('pages/single_product', viewsdata);
  })
}

exports.getAllProducts = (req, res) => {
  // res.render('pages/products', { allProducts })
  fetchAllProducts_2((products) => {
    const viewsData = {
      admin: false,
      products,
      pageTitle: 'Products List'
    }
    res.render('pages/products', viewsData)
  })
}

// get collection page
exports.getCollection = (req, res, next) => {
  res.render('pages/products', { summerProduct })
}



