const Skill = require('../models/skillsModel');

// Get all skills
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ message: 'Error fetching skills' });
    }
};

// Get skill by ID
exports.getSkillById = async (req, res) => {
    const { id } = req.params;
    try {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.status(200).json(skill);
    } catch (error) {
        console.error('Error fetching skill:', error);
        res.status(500).json({ message: 'Error fetching skill' });
    }
};

// Create new skill
exports.createSkill = async (req, res) => {
    const { name, category } = req.body;
    try {
        const skill = await Skill.create({ name, category });
        res.status(201).json(skill);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ message: 'Error creating skill' });
    }
};

// Update a skill
exports.updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;

    try {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        skill.name = name || skill.name;
        skill.category = category || skill.category;

        await skill.save();
        res.status(200).json(skill);
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).json({ message: 'Error updating skill' });
    }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
    const { id } = req.params;
    try {
        const skill = await Skill.findByPk(id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        await skill.destroy();
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ message: 'Error deleting skill' });
    }
};
