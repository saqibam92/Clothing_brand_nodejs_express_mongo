const Product = require('../models/productModel');
const User = require('../models/userModel');
const Category = require('../models/catagoryModel');
const SubCategory = require('../models/subCategoryModel');



exports.getCommonController = async(req, res) => {
    try{

        const count_data = [];

        const producr_data = await Product.find().count();
        const admin_data = await User.find({type: 1}).count();
        const category_data = await Category.find().count();
        const sub_cat_data = await SubCategory.find().count();

        count_data.push({
            product: producr_data,
            admin: admin_data,
            category: category_data,
            subCategory: sub_cat_data
        })

        res.status(201).send({success:true, msg:'Counting Data', data:count_data})

    } catch(err) {
        res.status(400).send({success: false, msg:err.message})
    }
}