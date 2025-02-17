const { Job, Application, Company, JobCategory } = require('../models/jobsModel');
const { fn, col } = require('sequelize');  // Import Sequelize functions directly

// Get all jobs with application count
// exports.getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.findAll({
//       include: [
//         {
//           model: Application,
//           attributes: [],
//         },
//         {
//           model: Company,
//           attributes: [],
//         }
//       ],
//       attributes: {
//         include: [
//           [fn("COUNT", col("Applications.id")), "application_count"],
//           [col("Company.name"), "company_name"]
//         ]
//       },
//       group: ['Job.id', 'Company.id'],
//       raw: true,
//       nest: true
//     });
//     res.json(jobs);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error fetching jobs' });
//   }
// };

exports.getJobCategories = async (req, res) => {
  try {
    const categories = await JobCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching job categories' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        {
          model: Company,
          attributes: [],
        },
        {
          model: JobCategory,
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [col("Company.name"), "company_name"],
          [col("JobCategory.name"), "category_name"]
        ]
      }
      ,
      group: ['Job.id', 'Company.id', 'JobCategory.id'],
      raw: true,
      nest: true
    });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

// Get job by ID with application count
exports.getJobById = async (req, res) => {
  // try {
  //   const job = await Job.findByPk(req.params.id, {
  //     include: [
  //       {
  //         model: Application,
  //         attributes: [],
  //       }
  //     ],
  //     attributes: {
  //       include: [
  //         [fn("COUNT", col("Applications.id")), "application_count"]
  //       ]
  //     },
  //     group: ['Job.id']
  //   });

  //   if (!job) return res.status(404).json({ message: 'Job not found' });

  //   res.json(job);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ message: 'Error fetching job' });
  // }
};



// Create new job
exports.createJob = async (req, res) => {
  const { company_id, title, description, category, location, is_remote } = req.body;
  try {
    const job = await Job.create({
      company_id,
      title,
      description,
      category,
      location,
      is_remote
    });
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating job' });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  const { title, description, category, location, is_remote } = req.body;
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await job.update({ title, description, category, location, is_remote });
    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating job' });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting job' });
  }
};
