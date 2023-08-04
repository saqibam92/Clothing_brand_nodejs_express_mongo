const { default: mongoose } = require('mongoose');
const mogsoose = require('mongoose');

const arrarLimit = (val) => {
    return val.length <=5
};

const productSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: false
    },
    store_id: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    },
    discount: {
        type: String,
        required: false
    },
    category_id: {
        type: String,
        required: true
    },
    sub_cat_id:{
        type: String,
        required:true
    },
    images:{
        type: Array,
        required: true,
        validate: [arrarLimit, "max 5 images"]
    }
});


// function arrarLimit (val) {
//     return val.length <=5
// };

module.exports = mongoose.model("product", productSchema);