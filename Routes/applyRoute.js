const { jobApply } = require('../Controllers/applyController');
const { isAuth } = require('../middlewares/Auth');
const express = require('express');

const router = express.Router();
router.post('/:id',isAuth,jobApply);

module.exports = router;