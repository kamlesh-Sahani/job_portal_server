const Apply = require('../Models/applyModel');
const Job = require('../Models/jobModel');

exports.jobApply = async (req, res) => {
    try {
        const { resume, portfolio, linkedin, expectedSalary, mobileNumber } = req.body;
        const { id } = req.params;
        const applyJob = await Apply.create({
            resume,
            portfolio,
            linkedin,
            expectedSalary,
            mobileNumber,
            user: req.user._id,
            jobId: id
        });

        if (!applyJob) {
            return res.json({
                success: false,
                message: "Not Submitted, try again"
            });
        }

        let job = await Job.findById(id);
        if (!job) {
            return res.json({
                success: false,
                message: "Job not found"
            });
        }

        job.noOfApplicants.push(req.user._id);
        await job.save();

        res.json({
            success: true,
            message: "Job Submitted",
            job: applyJob
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};
