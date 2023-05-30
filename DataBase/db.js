const Sequelize = require('sequelize')

const sequelize = new Sequelize(DatabaseName,DbUser,DsPassword,
    {
    host: DbHost,
    dialect: 'mysql',
    port: DbPort
    }
);

module.exports = sequelize
