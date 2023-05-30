const database = require('../DataBase/db')
const Sequelize = require('sequelize')


const pokemons = database.define('pokemons',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    regiao:{
        type: Sequelize.STRING(10),
        allowNull: false
    }
})

module.exports = pokemons