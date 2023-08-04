const Category = require('../models/catagoryModel')

exports.postAddProductCategoryPage = async(req, res) => {

    try{

        category_data = await Category.find();
        if(category_data.length > 0) {
            let checking = false;

            for( let i=0; i<category_data.length; i++) {
                if(category_data[i]['category'].toLowerCase() === req.body.category.toLowerCase()) {
                    checking = true;
                    break;
                } 
            }

            console.log(checking)
            if(checking == false) {
                const category = new Category({
                category : req.body.category
                })
                const cat_data = await category.save()
                res.status(200).send({success: true, masg:"category data", data: cat_data})
            } else{
                res.status(200).send({success: true, masg:"This category (" +req.body.category+") already exists"})
            }
        } else {
            const category = new Category({
            category : req.body.category
            })
            const cat_data = await category.save()
            res.status(200).send({success: true, masg:"category data", data: cat_data})
        }
    } catch(err) {
        res.status(400).send({success: false, msg: err.message})
        console.log(err)
    }
}

exports.getCategories = async() => {

    try{
        return Category.find();
    } catch (err) {
        console.log(err);
        res.status(400).send({success:false, msg: err.message})
    }
}