const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required:true
    }
});

module.exports= mongoose.model("category", categorySchema)