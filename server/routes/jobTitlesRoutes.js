const express = require('express');
const router = express.Router();
const { getAllJobTitles } = require('../controllers/jobTitlesController');

router.get('/', getAllJobTitles);

module.exports = router;