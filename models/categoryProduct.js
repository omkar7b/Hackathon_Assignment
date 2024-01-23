const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Category = require('./categories');
const Product = require('./products');

const CategoryProduct = sequelize.define('categoryproduct', {
    categoryId: {
        type: Sequelize.INTEGER,
        references: {  
            model: Category,
            key: 'id',
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        references: {  
            model: Product,
            key: 'id',
        }
    }
});

module.exports = CategoryProduct;
