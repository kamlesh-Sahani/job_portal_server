const mongoose  = require('mongoose'); 


const applySchema  = new mongoose.Schema({
    portfolio:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    linkedin:{
        type:String,
        required:true
    },
    expectedSalary:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }

})


module.exports = mongoose.model('Apply',applySchema);