const database = require('../db')
const Sequelize = require('sequelize')

const torneios = database.define('torneios',{

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    regioes:{
        type: Sequelize.JSON,
        allowNull: false
    },
    jogador1:{
        type: Sequelize.STRING,
        allowNull: true
    },
    jogador2:{
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = torneios