const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const Proposal = sequelize.define("Proposal", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    talent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    proposal_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "proposals",
    timestamps: false // Already using `created_at`
});

// Relationships
Proposal.belongsTo(User, { foreignKey: "talent_id", as: "talent" });
Proposal.belongsTo(User, { foreignKey: "proposal_user_id", as: "proposalUser" });

module.exports = Proposal;
