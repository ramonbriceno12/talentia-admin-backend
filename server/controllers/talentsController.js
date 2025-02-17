const User = require('../models/userModel');
const JobTitle = require('../models/jobTitles');
const Skills = require('../models/skillsModel');
const { Op, Sequelize } = require('sequelize');
const UserSkills = require("../models/userSkills");
const sequelize = require("../config/database"); // Import DB connection


exports.getAllTalents = async (req, res) => {
    try {
        const { search, jobTitle, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit; // Calculate offset for pagination

        const whereCondition = { role: "talent" }; // Only fetch talents

        if (search) {
            whereCondition[Op.or] = [
                { full_name: { [Op.iLike]: `%${search}%` } }, // Search by name
                { email: { [Op.iLike]: `%${search}%` } }, // Search by email
                { 
                    "$job_title.title$": { [Op.iLike]: `%${search}%` } // Search by job title
                }
            ];
        }

        if (jobTitle) {
            whereCondition.job_title_id = jobTitle;
        }

        const { count, rows: talents } = await User.findAndCountAll({
            where: whereCondition,
            include: [{ model: JobTitle, as: "job_title", attributes: ["title"] }],
            attributes: [
                "id",
                "full_name",
                "email",
                "bio",
                "profile_picture",
                "resume_file",
                "is_featured",
                "createdAt",
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
            talents,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            totalTalents: count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching talents" });
    }
};

exports.activateTalent = async (req, res) => {
    try {
        const { id } = req.params;

        const talent = await User.findByPk(id);

        if (!talent) {
            return res.status(404).json({ message: "Talent not found" });
        }

        await talent.update({ is_featured: true });

        res.status(200).json({ message: "Talent deactivated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deactivating talent" });
    }
};

exports.deactivateTalent = async (req, res) => {
    try {
        const { id } = req.params;

        const talent = await User.findByPk(id);

        if (!talent) {
            return res.status(404).json({ message: "Talent not found" });
        }

        await talent.update({ is_featured: false });

        res.status(200).json({ message: "Talent deactivated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deactivating talent" });
    }
};

exports.getTalentById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch talent with job title
        const talent = await User.findOne({
            where: { id },
            include: [{ model: JobTitle, as: "job_title", attributes: ["title"] }],
        });

        if (!talent) return res.status(404).json({ message: "Talent not found" });

        // ✅ Fetch skills using a raw SQL query (without modifying models)
        const skills = await sequelize.query(
            `
            SELECT s.id, s.name, s.category 
            FROM skills s 
            JOIN user_skills us ON s.id = us.skill_id 
            WHERE us.user_id = :userId
            `,
            {
                replacements: { userId: id },
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        res.status(200).json({ talent, skills });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching talent data" });
    }
};


exports.updateTalentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, bio, job_title_id, skills } = req.body;

        const talent = await User.findOne({ where: { id } });
        if (!talent) return res.status(404).json({ message: "Talent not found" });

        // Update talent's main details
        await talent.update({ full_name, email, bio, job_title_id });

        // Update skills
        if (Array.isArray(skills)) {
            // Remove existing skills for the user
            await UserSkills.destroy({ where: { user_id: id } });

            // Insert new skills
            const newSkills = skills.map((skill_id) => ({ user_id: id, skill_id }));
            await UserSkills.bulkCreate(newSkills);
        }

        res.status(200).json({ message: "Talent updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating talent data" });
    }
};

