const express = require('express');
const { 
    getAllJobs, 
    getJobById, 
    createJob, 
    updateJob, 
    deleteJob, 
    getJobCategories
} = require('../controllers/jobsController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Get all jobs
router.get('/', getAllJobs);

router.get('/categories/', getJobCategories);

// Get job by ID
router.get('/:id', getJobById);

// Create a new job
router.post('/', authenticateJWT, createJob);

// Update a job by ID
router.put('/:id', authenticateJWT, updateJob);

// Delete a job by ID
router.delete('/:id', authenticateJWT, deleteJob);

module.exports = router;
