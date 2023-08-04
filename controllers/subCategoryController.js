const SubCategory = require('../models/subCategoryModel')

exports.postCreateSubCategory = async(req, res) => {

    try{

        const check_sub= await SubCategory.find({category_id: req.body.category_id});

        if(check_sub.length> 0) {
            let checking = false;

            for(i=0; i< check_sub.length; i++) {
                if(check_sub[i]['sub_category'].toLowerCase() === req.body.sub_category.toLowerCase()) {
                    checking = true;
                    break;
                }
            }

            if(checking === false) {
                const subCategory = new SubCategory({
                    category_id: req.body.category_id,
                    sub_category: req.body.sub_category
                });
                const sub_cat_data = await subCategory.save();
                res.status(200).send({success:true, msg:'Sub-category Details', data: sub_cat_data})
            } else {
                res.status(400).send({success:false, msg:'Sub-category('+ req.body.sub_category +') already exists'})
            }

        } else{
            const subCategory = new SubCategory({
                category_id: req.body.category_id,
                sub_category: req.body.sub_category
            });
            const sub_cat_Data = await subCategory.save();
            res.status(200).send({success:true, msg:'Sub-category Details', data: sub_cat_Data})
        }

        
        

    } catch(err) {
        console.log(err);
        res.status(400).send({success: false, msg:"invalid Subcategory"})
    }
}

exports.getSubCategory = async(id) => {
    try{
        return SubCategory.findOne({_id:id})
    } catch(err) {
        res.status(400).send(err.message)
    }
}