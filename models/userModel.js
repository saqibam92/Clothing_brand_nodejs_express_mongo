const mongoose = require('mongoose');
// const Schema = mongoose.Schema();

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    mobile : {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    token: {
        type: String,
        default: ''
    }
});


// const userModel = mongoose.model('User', userSchema)
module.exports = mongoose.model('User', userSchema)

// module.exports = userModel;