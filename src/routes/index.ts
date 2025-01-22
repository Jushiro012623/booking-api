import { Request, Response } from "express"
import errorHandler from "../middlewares/errorHandler"
import userRoutes from './userRoutes'
export default (app : any) => {
    // all user access
    app.use('/api', userRoutes)
    
    app.get('/', (req : Request, res : Response) => {
        res.status(200).json({message:'OK'});
    })
    app.use(errorHandler)
}