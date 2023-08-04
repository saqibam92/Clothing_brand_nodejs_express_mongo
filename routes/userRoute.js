const express = require('express');
const multer = require('multer');
const path = require('path');

const verifyToken = require('../middleware/auth')
const rootDir = require('../utils/path');
const { registerUser, postUserLogin, getUserDashboard, postUpdateUserPassword, postForgetUserPassword } = require('../controllers/userController');

const router = express.Router();

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(rootDir, 'public/img/userImages'), function(err, success) {
            if(err) throw err;
        });
    },
    filename:function(req, file, cb) {
        const name = Date.now()+ '-' + file.originalname;
        cb(null, name, function(err1, success) {
            if(err1) throw err1
        })
    }
});

const upload = multer({storage: storage});

router.post('/register', upload.single('image'), registerUser);
router.post('/login', postUserLogin);
router.get('/dashboard', verifyToken , getUserDashboard);
router.post('/update_password', postUpdateUserPassword);
router.post('/forget_password', postForgetUserPassword);
// router.post('/reset_password', postResetPassword);
// router.post('/update_token', postUpdateUserToken);

module.exports = router;

