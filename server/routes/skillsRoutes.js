const express = require('express');
const {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
} = require('../controllers/skillsController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Get all skills
router.get('/', getAllSkills);

// Get skill by ID
router.get('/:id', getSkillById);

// Create a new skill
router.post('/', authenticateJWT, createSkill);

// Update a skill by ID
router.put('/:id', authenticateJWT, updateSkill);

// Delete a skill by ID
router.delete('/:id', authenticateJWT, deleteSkill);

module.exports = router;
