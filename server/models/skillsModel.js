const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Skills = sequelize.define(
  "Skills",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "skills",
    timestamps: false,
  }
);

module.exports = Skills;
