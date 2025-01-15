import express, { Request, Response } from 'express';

require('dotenv').config();
const app = express()
const port = process.env.PORT

const database = require('./src/database')
const routes = require('./src/routes')

const server = () => {
    database()
    routes(app)
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}



module.exports = server