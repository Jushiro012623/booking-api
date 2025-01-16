const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const database = require('./src/database')
const routes = require('./src/routes')
const middleware = require('./src/middlewares')

module.exports = () => {
    database()
    middleware(app)
    routes(app)
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}

