const express = require('express');
const { 
    getAllTalents, 
    getTalentById,
    deactivateTalent,
    activateTalent,
    updateTalentById
} = require('../controllers/talentsController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Get all talents
router.get('/', authenticateJWT, getAllTalents);

// Get a talent by ID
router.get('/:id', authenticateJWT, getTalentById);

// Activate talent
router.post('/activate/:id', authenticateJWT, activateTalent);

// Deactivate a talent
router.post('/deactivate/:id', authenticateJWT, deactivateTalent);

// Update talent data
router.put('/:id', authenticateJWT, updateTalentById);



module.exports = router;
