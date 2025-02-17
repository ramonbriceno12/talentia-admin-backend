const { DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require('../config/database');

const Connection = sequelize.define('Connection', {
    user_id: { type: DataTypes.INTEGER },
    company_id: { type: DataTypes.INTEGER },
    connected_user_id: { type: DataTypes.INTEGER },
    connected_company_id: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, field: 'created_at' }
}, {
    tableName: 'connections',
    timestamps: false
});

module.exports = Connection;