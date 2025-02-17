const { Op, Sequelize } = require("sequelize");
const User = require("../models/userModel");
const Proposal = require("../models/proposalsModel"); // Example: Replace with your actual model
const Company = require("../models/companiesModel");
const { Job } = require("../models/jobsModel");

exports.getDashboardStats = async (req, res) => {
    try {
        let { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start and end dates are required." });
        }

        // Extract only YYYY-MM-DD part (removing time)
        startDate = startDate.split("T")[0];
        endDate = endDate.split("T")[0];

        // Fetch counts in parallel
        const [talents, approvedTalents, proposals, companies, jobs] = await Promise.all([
            User.count({
                where: {
                    role: "talent",
                    [Op.and]: [
                        Sequelize.literal(`DATE("User"."created_at") BETWEEN '${startDate}' AND '${endDate}'`),
                    ],
                },
            }),
            User.count({
                where: {
                    role: "talent",
                    is_featured: true,
                    [Op.and]: [
                        Sequelize.literal(`DATE("User"."created_at") BETWEEN '${startDate}' AND '${endDate}'`),
                    ],
                },
            }),
            Proposal.count({
                where: Sequelize.literal(`DATE("Proposal"."created_at") BETWEEN '${startDate}' AND '${endDate}'`),
            }),
            Company.count({
                where: Sequelize.literal(`DATE("Company"."created_at") BETWEEN '${startDate}' AND '${endDate}'`),
            }),
            Job.count({
                where: Sequelize.literal(`DATE("Job"."created_at") BETWEEN '${startDate}' AND '${endDate}'`),
            }),
        ]);

        res.status(200).json({
            talents,
            approvedTalents,
            proposals,
            companies,
            jobs,
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Error fetching dashboard stats" });
    }
};
