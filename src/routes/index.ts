import { Request, Response } from "express"

const routes = (app : any) => {
    app.get('/', (req : Request, res : Response) => {
        res.status(200).json({message:'OK'});
    })
}
module.exports = routes