const database = require('../DataBase/db')
const Sequelize = require('sequelize')

const user = database.define('user',{

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = user