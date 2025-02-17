const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Links = require("./linksModel");

const Clicks = sequelize.define(
  "Clicks",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    link_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Links,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    clicked_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ip_address: {
      type: DataTypes.INET,
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "clicks",
    timestamps: false,
  }
);

module.exports = Clicks;
