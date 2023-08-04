const Cart = require('../models/cartModel')

exports.postAddToCart= async(req, res) => {
    try{
        
        const cart_obj = new Cart({
            product_id: req.body.product_id,
            price: req.body.price,
            // vendor_id: req.body.vendor_id,
            // store_id: req.body.store_id
        })

        const cart_data = await cart_obj.save()

        res.status(200).send({success:true, msg:'Cart Details', data: cart_data})
    } catch(err) {
        res.status(400).send({success: false, msg: err.message})
    }
}