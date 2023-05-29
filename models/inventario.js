const database = require('../db')
const Sequelize = require('sequelize')


const inventario = database.define('inventario',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdTorneio:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IdUser:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pokemons:{
        type: Sequelize.JSON,
        allowNull: true
    }
})

module.exports = inventario