const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the JobCategory model for your "job_categories" table
const JobCategory = sequelize.define('JobCategory', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
}, {
    tableName: 'job_categories',
    timestamps: false
});

// Update the Job model: change "category" from STRING to INTEGER and set up the foreign key
const Job = sequelize.define('Job', {
    company_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    // Updated "category" field to use your already created column (int4)
    category: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
              model: JobCategory,
              key: 'id'
         }
    },
    location: { 
        type: DataTypes.STRING 
    },
    is_remote: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    },
    is_featured: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    views: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    createdAt: { 
        type: DataTypes.DATE, 
        field: 'created_at' 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        field: 'updated_at' 
    }
}, {
    tableName: 'jobs',
    timestamps: true
});

// Define the Company model (unchanged)
const Company = sequelize.define('Company', {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    password_hash: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    logo: { 
        type: DataTypes.STRING 
    },
    is_featured: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    createdAt: { 
        type: DataTypes.DATE, 
        field: 'created_at' 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        field: 'updated_at' 
    }
}, {
    tableName: 'companies',
    timestamps: true
});

// Define the Application model (unchanged)
const Application = sequelize.define('Application', {
    job_id: { 
        type: DataTypes.INTEGER 
    },
    user_id: { 
        type: DataTypes.INTEGER 
    },
    resume_file: { 
        type: DataTypes.STRING 
    },
    application_text: { 
        type: DataTypes.TEXT 
    },
    createdAt: { 
        type: DataTypes.DATE, 
        field: 'created_at' 
    }
}, {
    tableName: 'applications',
    timestamps: false
});

// Define associations

// Job <---> Application
Job.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(Job, { foreignKey: 'job_id' });

// Company <---> Job
Company.hasMany(Job, { foreignKey: 'company_id' });
Job.belongsTo(Company, { foreignKey: 'company_id' });

// JobCategory <---> Job using the "category" column in jobs
Job.belongsTo(JobCategory, { foreignKey: 'category' });
JobCategory.hasMany(Job, { foreignKey: 'category' });

module.exports = { Job, Application, Company, JobCategory };
