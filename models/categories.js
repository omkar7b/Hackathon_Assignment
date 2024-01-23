const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Category = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
});

module.exports = Category;