import routes from './src/routes'
import express  from 'express'
import middleware  from './src/middlewares'

require('dotenv').config()

const app = express()
const port = process.env.PORT
const database = require('./src/database')

export default () => {
    database()
    middleware(app)
    routes(app)
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}