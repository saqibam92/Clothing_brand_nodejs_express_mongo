const BuyProduct = require('../models/buyProductModel');

exports.postBuyProduct = async(req, res) => {

    try{

        const buy_product = new BuyProduct({
            product_id: req.body.product_id,
            transaction_id: req.body.transaction_id,
            customer_id: req.body.customer_id
            // vendor_id: req.body.vendor_id,
            // store_id: req.body.store_id
        });

        const buy_data = await buy_product.save();

        res.status(200).send({success: true, msg:"Buy Product Details", data: buy_data})

    } catch(err) {
        console.log(err);
        res.status(400).send({success: false, msg: err.message})
    }
}