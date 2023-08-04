const Product = require('../models/productModel');
const { getCategories } = require('./CategoryController');
const { getSubCategory } = require('./subCategoryController');


exports.postAddProduct = async(req, res) => {
    
    try{

        var arrayImages = [];

        for(let i =0; i< req.files.length; i++){
            arrayImages[i] = req.files[i].filename;
        }

        var product = new Product({
            user_id: req.body.user_id,
            title: req.body.title,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.category_id,
            sub_cat_id: req.body.sub_cat_id,
            images: arrayImages
        })

        const productData = await product.save();
        res.status(201).send({success: true, msg:'Product Details', data: productData})

    } catch(err){
        console.log(err)
        res.status(400).send({seccuess: false, msg:"invalid"})
    }
}

exports.getEditProduct = async(req, res) => {

    try{
        var sendData = [];
        var cat_data = await getCategories();

        if(cat_data.length > 0) {
            for(let i =0; i< cat_data.length; i++) {
                var productData = [];
                var cat_id = cat_data[i]['_id'].toString();
                var cat_product = await Product.find({category_id: cat_id});

                if(cat_product.length> 0) {
                    for(j=0; j<cat_product.length; j++){
                        var subCatData = await getSubCategory(cat_product[j]['sub_cat_id']);
                        productData.push(
                            {
                                "id": cat_product[j]['_id'],
                                "product_name" : cat_product[j]['title'],
                                "price": cat_product[j]['price'],
                                "discount": cat_product[j]['discount'],
                                "sub-category": subCatData['sub_category'],
                                "images": cat_product[j]['images']

                            }
                        )
                    }
                }
                sendData.push({
                    "category": cat_data[i]["category"],
                    "product": productData
                })
            }

            const viewsData = {
                pageTitle: "All Products",
                products: productData,
                data: sendData
            }
            // res.status(200).send({success:true, msg:"product Details", data:sendData})
            res.status(200).render('pages/products_2', viewsData)
        } else {
            
            res.status(200).send({seccuess: false, msg:"Product Details", data: sendData})
        }
    } catch(err) {
        console.log(err);
        res.status(400).send({seccuess: false, msg:err.message})
    }
}

// Search Product 

exports.getSearchProduct = async(req, res) => {
    try{
        const search = req.body.search;
        const productData = await Product.find({"title" : {$regex : ".*" +search+".*", $options: 'i'} });

        if(productData.length > 0) {
            res.status(200).send({success: true, msg:'product details', data: productData})
        } else {
            res.status(200).send({success: true, msg: "product not found"})
        }

    } catch(err) {
        console.log(err);
        res.status(400).send({success:false, msg: err.message})
    }
};

exports.paginateProduct = async(req, res) => {
    try{

        var page = req.body.page;
        var sort = req.body.sort;

        var product_data;
        var skip;

        if(page <=1) {
            skip = 0;

        } else {
            skip = (page - 1)*2;
        }

        if(sort) {
            var customsort = {

            }
            if(sort == 'title') {
                customsort = {
                    title : 1
                }

            }
            else if(sort == '_id') {
                customsort = {
                    _id: 1
                }
            }
            
            product_data = await Product.find().sort(customsort).skip(skip).limit(2);

        } else {
            product_data = await Product.find().skip(skip).limit(2);
        }

        res.status(200).send({success: true, msg: "Pagination", data:product_data})

    } catch(err) {
        res.status(400).send({success:false, msg:err.message})
    }
}