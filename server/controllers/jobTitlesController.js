const JobTitle = require('../models/jobTitles');  // Import the JobTitle model
const { fn, col } = require('sequelize');  // Import Sequelize functions directly

exports.getAllJobTitles = async (req, res) => {
    try {
        const jobTitles = await JobTitle.findAll();
        console.log('pasamos')
        res.json(jobTitles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching job titles' });
    }
}