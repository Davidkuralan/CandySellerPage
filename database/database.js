const Sequelize = require('sequelize')

const sequelize = new Sequelize('candyseller','root','Mysql@1997',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize