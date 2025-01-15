import { Sequelize } from "sequelize";
const config = require('../config/db.config');

const database = async () => {
    const sequelize = new Sequelize(
        config.development.database, 
        config.development.username, 
        config.development.password, {
        host: config.development.host,
        dialect: config.development.dialect,
        logging: false,
    });
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}
module.exports = database;