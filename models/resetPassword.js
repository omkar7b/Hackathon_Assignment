const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Resetpassword = sequelize.define('resetpassword', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
    },
    userId: Sequelize.INTEGER,
    isactive: Sequelize.BOOLEAN
})

module.exports = Resetpassword;