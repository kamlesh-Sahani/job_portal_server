const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, "Job Title is required"]
    },
    jobLocation: {
        type: String,
        required: [true, "Job Location is required"]
    },
    postAt: {
        type: Date,
        default: Date.now
    },
    jobDes: {
        type: String,
        required: [true, 'Job description is required']
    },
    skill: [{
        type: String,
        required: [true, "Skills is Required"]
    }],
    salary: {
        type: String,
        required: [true, "Salary is required"]
    },
    jobType: {
        type: String,
        required: [true, "Please Enter the Job Type"]
    },
    noOfApplicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    noOfVaccancies: {
        type: String,
        required: [true, "Please Enter the No of vaccancies"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})




module.exports = mongoose.model('Job', jobSchema);