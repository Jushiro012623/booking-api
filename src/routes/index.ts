import { Request, Response } from "express"

const errorHandler = require("../middlewares/errorHandler")
const userRoutes = require('./userRoutes')
module.exports = (app : any) => {
    app.use('/api', userRoutes)
    app.get('/', (req : Request, res : Response) => {
        res.status(200).json({message:'OK'});
    })
    app.use(errorHandler)
}