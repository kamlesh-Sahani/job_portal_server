const express = require('express');
const { userRegister, userLogin, myProfile, getAllUser, getUser, logoutUser, } = require('../Controllers/userController');
const { isAuth } = require('../middlewares/Auth');
const { updateUser } = require('../Controllers/jobController');
const router  = express.Router();
const upload = require('../middlewares/multer');

//register Route
router.post('/register',upload.single("profileImg"),userRegister);
//login Route
router.post(`/login`,userLogin);
//load user
router.get('/me',isAuth, myProfile);
router.get('/all',isAuth,getAllUser);
//logut user 
router.get('/logout',logoutUser);
//get specif Routes
router.get('/:id',getUser);
//upadte profile 
router.put('/:id',updateUser);
module.exports = router;