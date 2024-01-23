const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('products', {
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
    packSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    productImage: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
});

module.exports = Product;