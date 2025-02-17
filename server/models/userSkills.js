const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserSkills = sequelize.define(
  "UserSkills",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "skills",
        key: "id",
      },
    },
  },
  {
    tableName: "user_skills",
    timestamps: false,
  }
);

module.exports = UserSkills;
