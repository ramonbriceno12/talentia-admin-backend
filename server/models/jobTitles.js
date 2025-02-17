const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JobTitle = sequelize.define(
  "JobTitle",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "job_titles",
    timestamps: false, // No need for created_at/updated_at
  }
);

module.exports = JobTitle;
