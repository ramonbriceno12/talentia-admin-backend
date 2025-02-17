const { DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = require("../config/database");
const JobTitle = require("./jobTitles");
const UserSkills = require("./userSkills");

const User = sequelize.define(
  "User",
  {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: true },
    full_name: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    profile_picture: { type: DataTypes.STRING },
    resume_file: { type: DataTypes.STRING },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: {
      type: DataTypes.ENUM("admin", "talent", "company"),
      defaultValue: "talent",
    },
    job_title_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "job_titles",
        key: "id",
      },
    },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    calendly_clicked: { type: DataTypes.BOOLEAN, defaultValue: false },
    plan_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
    subscribed: { type: DataTypes.BOOLEAN, defaultValue: false },
    email_sent: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// ✅ Define the relationship with JobTitle
User.belongsTo(JobTitle, { foreignKey: "job_title_id", as: "job_title" });
JobTitle.hasMany(User, { foreignKey: "job_title_id", as: "users" });

module.exports = User;
