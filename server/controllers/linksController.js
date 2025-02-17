const Links = require("../models/linksModel");
const Clicks = require("../models/clicksModel");
const { Sequelize, Op } = require("sequelize");
const sequelize = require("../config/database");

const getAllLinks = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Base query for counting clicks per link
        let query = `
            SELECT 
                l.id, 
                l.label, 
                l.url, 
                l.created_at, 
                COUNT(c.id) AS click_count 
            FROM links l
            LEFT JOIN clicks c ON l.id = c.link_id
        `;

        // If date range is provided, filter clicks by date
        if (startDate && endDate) {
            query += ` WHERE c.clicked_at BETWEEN :startDate AND :endDate `;
        }

        query += ` GROUP BY l.id ORDER BY click_count DESC;`;

        // Execute raw SQL query
        const links = await sequelize.query(query, {
            replacements: startDate && endDate ? { startDate, endDate } : {},
            type: Sequelize.QueryTypes.SELECT,
        });

        res.status(200).json(links);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching links with click counts" });
    }
};


const getLinkById = async (req, res) => {
    try {
        const link = await Links.findByPk(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        res.status(200).json(link);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching link' });
    }
};

const createLink = async (req, res) => {
    try {
        const { url, title } = req.body;
        const newLink = await Links.create({ url, title });
        res.status(201).json({ message: 'Link created successfully', link: newLink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating link' });
    }
};

const updateLink = async (req, res) => {
    try {
        const { url, title } = req.body;
        const link = await Links.findByPk(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        await link.update({ url, title });
        res.json({ message: 'Link updated successfully', link });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating link' });
    }
};

const deleteLink = async (req, res) => {
    try {
        const link = await Links.findByPk(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        await link.destroy();
        res.json({ message: 'Link deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting link' });
    }
};

const getClicksByLinkId = async (req, res) => {
    try {
        const clicks = await Clicks.findAll({ where: { link_id: req.params.id } });
        res.status(200).json(clicks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching clicks' });
    }
};

const trackClick = async (req, res) => {
    try {
        const { link_id } = req.body; // This now correctly matches the frontend

        if (!link_id) {
            return res.status(400).json({ message: 'Missing link_id' });
        }

        const newClick = await Clicks.create({ link_id });

        res.status(201).json({ message: 'Click tracked successfully', click: newClick });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error tracking click' });
    }
};


module.exports = {
    getAllLinks,
    getLinkById,
    createLink,
    updateLink,
    deleteLink,
    getClicksByLinkId,
    trackClick
};