import 'dotenv/config';
import { Sequelize } from 'sequelize';

const init = async () => {
    const username = process.env.DB_USERNAME!;
    const password = process.env.DB_PASSWORD!;
    const host = process.env.DB_HOST!;
    const dialect = process.env.DB_DIALECT as any || 'mysql';
    const database = process.env.DB_NAME!;
    const sequelize : Sequelize = new Sequelize(database, username, password, {
        host: host,
        dialect: dialect,
        logging: false,
    });
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        console.log('Ok.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}
init()