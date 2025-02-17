const { Company, Job } = require('../models/jobsModel');  // Assuming Company and Job are in the same model file
const { fn, col } = require('sequelize');

// Get all companies with job count
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      include: [
        {
          model: Job,
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [fn("COUNT", col("Jobs.id")), "job_count"]
        ]
      },
      group: ['Company.id']
    });
    res.json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching companies' });
  }
};

// Get company by ID with job count
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [
        {
          model: Job,
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [fn("COUNT", col("Jobs.id")), "job_count"]
        ]
      },
      group: ['Company.id']
    });

    if (!company) return res.status(404).json({ message: 'Company not found' });

    res.json(company);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching company' });
  }
};

// Create new company
exports.createCompany = async (req, res) => {
  const { name, email, description } = req.body;
  try {
    const company = await Company.create({
      name,
      email,
      description
    });
    res.status(201).json({ message: 'Company created successfully', company });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating company' });
  }
};

// Update a company
exports.updateCompany = async (req, res) => {
  const { name, email, description } = req.body;
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    await company.update({ name, email, description });
    res.json({ message: 'Company updated successfully', company });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating company' });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    await company.destroy();
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting company' });
  }
};
