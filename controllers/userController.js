const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Randomstring = require('randomstring')


const sendResetPasswordMail= async (name, email, token) => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                password: config.emailPassword
            }

        });

        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: '<p> Hi, ' +name+'please clink the link to <a href="http://localhost:5900/api/reset_password?'+token+'">reset your password</a>.</p>'
        }
        transporter.sendMail(mailOptions, (err, info) => {
            
            if(err) {
               console.log(err)
            } else {
                console.log("mail has been sent:-", info.response)
            }
        })
    } catch(err) {
        return res.status(400).send({success:false, msg: err.message})
        console.log(err);
    }
}

const createToken = async(id) => {
    try{
        const token = await jwt.sign({_id: id}, config.secret_jwt);
        return token;
    } catch(err) {
        res.status(400).send(err.message)
    }
}

const securePaswword = async(password) => {

    try{
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    } catch(err) {
        res.status(400).err.message;
    }
}

exports.registerUser = async (req, res) => {
    const spassword = await securePaswword(req.body.password);

    try{
        const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: spassword,
                image: req.file.filename,
                type: req.body.type,
                mobile: req.body.mobile,
                
            });

            const userData = await User.findOne({email: req.body.email});
            if(userData) {
                res.status(200).send({success: false, msg: "User already exist"})
            } else {
                const user_data = await user.save();
                res.status(201).send({success: true, data: user_data})
            }

    } catch(err) {
        res.status(400).err.message;
    };
};

exports.postUserLogin = async (req, res) => {
        
    try {
        const email = req.body.email;
        const password= req.body.password;

        const userData = await User.findOne({email: email});

        if(userData) {
            const matchPass = await bcryptjs.compare(password, userData.password);
            const tokenData =await createToken(userData._id);

            if(matchPass) {
                const userResult = {
                    _id : userData._id,
                    name : userData.name,
                    email : userData.email,
                    password : userData.password,
                    image : userData.image,
                    mobile : userData.mobile,
                    type : userData.type,
                    token: tokenData
                };

                const response = {
                    success: true,
                    msg: 'User Details',
                    data: userResult
                };
                res.status(200).send(response);
            } else {
                res.status(200).send({success: false, msg: "pass details are incorrect"})
            }

        } else {
            res.status(200).send({success: false, msg: "mail details are incorrect"})
        }

    } catch (err) {
        res.status(200).send(err.message)
        console.log(err.message)
    }

}

exports.getUserDashboard= async (req, res) =>{
    res.send({success:true, msg: "authenticated"}).status(200 )
}

exports.postUpdateUserPassword = async (req, res) => {

    try {
        const user_id = req.body.user_id;
        const password = req.body.password;

        const data = await User.findOne({_id:user_id});

        if(data) {
            const newPassword = await securePaswword(password);
            const userData = await User.findByIdAndUpdate({_id:user_id},{$set:{password: newPassword}});
            return res.status(200).send({success: true, msg:"pass updated"});
        } else {
            return res.status(404).send('user not found');
        }


    } catch(err) {
        console.log(err)
    }

};

exports.postForgetUserPassword = async(req,res) => {

    try{
        const email = req.body.email;
        const userdata = await User.findOne({email: email});

        if(userdata) {
            const randomString = await Randomstring.generate();
            const data = await User.updateOne({email: email}, {$set: {token: randomString}});
            await sendResetPasswordMail(userdata.name, userdata.email, randomString)
            return res.status(200).send('Please check mail for resetting your password');

        } else {
            return res.status(200).send('user doesnot exist')
        }

    } catch(err) {
        console.log(err)
    }
}