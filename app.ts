import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser'
import userRoutes from './src/module/users/userRoutes';
import errorHandler from './src/middlewares/errorHandler';
import { Sequelize } from 'sequelize';
import helmet from 'helmet';
import { AppError } from './src/utils/appError';
import cors_config from './src/config/cors.config'
import rateLimit_config from './src/config/rate_limiter.config'
import helmet_config from './src/config/helmet.config'

const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

export default class App {
    private app: Application = express();
    public routes_middleware = () => {
        this.app.use(cors(cors_config))
        this.app.use(helmet(helmet_config));
        const limiter = rateLimit_config

        this.app.use('/api', limiter);

        
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(xss());
        this.app.use(hpp());
        
        this.app.use('/api/v1', userRoutes)

        this.app.get('/', (req : Request, res : Response) => {res.status(200).json({message:'OK'})})
        this.app.use('*', (req : Request, res : Response, next : NextFunction) => {
            return next(new AppError('Request Not Found', 404))
        })
        this.app.use(errorHandler)
    }
    // public database = async () => {
    //     const username = process.env.DB_USERNAME!;
    //     const password = process.env.DB_PASSWORD!;
    //     const host = process.env.DB_HOST!;
    //     const dialect = process.env.DB_DIALECT as any || 'mysql';
    //     const database = process.env.DB_NAME!;
    //     const sequelize : Sequelize = new Sequelize(database, username, password, {
    //         host: host,
    //         dialect: dialect,
    //         logging: false,
    //     });
    //     try {
    //         await sequelize.authenticate();
    //         console.log('Database connection established successfully.');
    //     } catch (error) {
    //         console.error('Unable to connect to the database:', error);
    //         process.exit(1);
    //     }
    // }
    public start = () => {
        const port = process.env.PORT || 3000;
        this.routes_middleware();
        // this.database();
        this.app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
        process.on('uncaughtException', (err) => {
            console.error('There was an uncaught error:', err);
            process.exit(1);
        });
        process.on('unhandledRejection', (reason) => {
            console.error('Unhandled Rejection at Promise:', reason);
        });
    };
}
