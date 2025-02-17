const express = require('express');
const { 
    getAllCompanies, 
    getCompanyById, 
    createCompany, 
    updateCompany, 
    deleteCompany 
} = require('../controllers/companiesController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Get all companies
router.get('/', getAllCompanies);

// Get company by ID
router.get('/:id', getCompanyById);

// Create a new company
router.post('/', authenticateJWT, createCompany);

// Update a company by ID
router.put('/:id', authenticateJWT, updateCompany);

// Delete a company by ID
router.delete('/:id', authenticateJWT, deleteCompany);

module.exports = router;
