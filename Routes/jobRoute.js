const express = require('express');
const { newJob, getAllJob, getJob } = require('../Controllers/jobController');
const { isAuth } = require('../middlewares/Auth');


const router = express.Router();
//new job Post 
router.post('/new',isAuth,newJob);
// get All Jobs
router.get('/all',getAllJob);
//get specific job details
router.get('/:id',getJob);

module.exports = router;