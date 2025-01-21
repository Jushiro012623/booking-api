import { Request, Response } from "express"
import voyageRoute from './client/clientVoyagesRoutes'
import adminPassage from './admin/adminPassagesRoute'
import errorHandler from "../middlewares/errorHandler"
import userRoutes from './userRoutes'
export default (app : any) => {
    // all user access
    app.use('/api', userRoutes)
    // client access
    app.use('/api/voyages', voyageRoute)
    // admin access
    app.use('/api/admin/passages', adminPassage )

    
    app.get('/', (req : Request, res : Response) => {
        res.status(200).json({message:'OK'});
    })
    app.use(errorHandler)
}