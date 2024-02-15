const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    jobDes:{
        type:String
    },
    companyLocation:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    firstName:{
        type:String
    },
    lastName:
    {
        type:String
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'password must be atleast 6 character']
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:[6,'password must be 6 character']
    },
    profileImg:{
        type:String
    },
    jobPost:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job"
        }
    ],
 
       
    
});




// generate the Token 
UserSchema.methods.generateToken= async function(){
    return jwt.sign(
        {userId:this._id},
        process.env.JWT_SECRET,
        {expiresIn:'4d'}
    )   
}

// check password is correct or not 
UserSchema.methods.matchPassword = async function(pass){

    return await bcrypt.compare(pass,this.password);
}

module.exports = mongoose.model('User',UserSchema);

