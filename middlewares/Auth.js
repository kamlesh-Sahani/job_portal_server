const jwt = require('jsonwebtoken');
const User= require('../Models/UserModels');

exports.isAuth = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
           return res.json({
                success:false,
                message:"Login First"
            });
        }
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}