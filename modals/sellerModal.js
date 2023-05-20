const { moveCursor } = require('readline')
const Sequelize = require('sequelize')

const sequelize = require('../database/database')

const Seller = sequelize.define('seller',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    },
    sellingPrice:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    productName:{
        type:Sequelize.STRING,
        allowNull: false
    },
    category:{
        type:Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Seller