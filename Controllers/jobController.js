
const Job = require('../Models/jobModel');
const User = require('../Models/UserModels');
exports.newJob =async (req,res)=>{
    try {
        const{jobTitle,jobLocation,skill,salary,jobType,noOfVaccancies,jobDes,} = req.body;

        const skillsArray = skill.split(/[,\s]+/);
        
        const newJob = await Job.create({
            jobTitle,
            jobLocation,
            skill:skillsArray,
            salary,
            jobType,
            noOfVaccancies,
            jobDes,
            owner:req.user._id
        })

        if(!newJob){
            return res.json({
                success:false,
                message:'Faild to job post'
            })
        }
        const user = await User.findById(req.user._id);
        await user.jobPost.push(newJob)
        await user.save();
        res.json({
            success:true,
            message:"Job Posted",
            job:newJob
        })
    } catch (error) {
        res.json({
            success:false,
            message:`${error.message}`
        })
    }
}


//get all Job posts 

exports.getAllJob = async(req,res)=>{
    try {
        const totalJobs = await Job.find({});
        const page =Number(req.query.page) || 1;
        const limit =Number(req.query.limit) || 8;
        const startIndex = (page-1)*limit;
        const lastIndex =startIndex + limit
        // filters query    
        const queryObject = {};
        const {jobTitle,jobLocation,postAt,skill,jobDes,salary,jobType,keyword}  = req.query;
        if(jobTitle && jobTitle !== "All"){
            queryObject.jobTitle = {  $regex: jobTitle, $options: 'i' } 
        }
        if(jobLocation && jobLocation !== "All"){
            queryObject.jobLocation =  {  $regex: jobLocation, $options: 'i' } 
        }
        if(skill && skill !=="All"){
            queryObject.skill =  {  $regex: skill, $options: 'i' } 
        }
        if(jobDes && jobDes !=="All" ){
            queryObject.jobDes =  {  $regex: jobDes, $options: 'i' } 
        }
        if(salary && salary !=="All"){
            queryObject.salary =  {  $regex: salary, $options: 'i' } 
        }
        if(jobType && jobType !=="All"){
            queryObject.jobType=  {  $regex: jobType, $options: 'i' } 
        }

         // Time filter
    if (postAt && postAt !== 'All') {
        const currentDate = new Date();
        let startDate;
  
        switch (postAt) {
          case 'Last 24 hours':
            startDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
            break;
          case 'Last 7 days':
            startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case 'Last month':
            startDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          default:
            startDate = new Date(0); // Default to the beginning of time
            break;
        }

        queryObject.postAt = { $gte: startDate, $lt: currentDate };
      }

       // Keyword filter
       if (keyword) {
        const keywordRegex = { $regex: keyword, $options: 'i' };
        queryObject.$or = [
            { jobTitle: keywordRegex },
            { jobLocation: keywordRegex },
            { skill: keywordRegex },
            { jobDes: keywordRegex },
            { salary: keywordRegex },
            { jobType: keywordRegex },
        ];
    }



        let jobs = await Job.find(queryObject).populate('owner');


        const totalPages= Math.ceil(jobs.length/limit);
        jobs = jobs.slice(startIndex,lastIndex);
        
        if(!jobs){
            return res.json({
                success:false,
                message:"Job is not Available yet"
            })
        }
        res.json({
            success:true,
            message:"jobs Found",
            jobs,
            totalPages,
            totalJobs:totalJobs.length
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// get specific post

exports.getJob = async(req,res)=>{
    try {
        const job= await Job.findById(req.params.id).populate('owner');
        if(!job){
            return res.json({
                success:false,
                message:"Job is not Available yet"
            })
        }
        res.json({
            success:true,
            message:"job Found",
            job
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email, } = req.body;
        // Validate if the user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    email: email || existingUser.email,
                    firstName: firstName || existingUser.firstName,
                    lastName: lastName || existingUser.lastName,
                }
            },
            { new: true }
        );

        // Respond with the updated user or an appropriate message
        res.json({
            success: true,
            message: updatedUser ? 'Profile is updated' : 'User not found'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};