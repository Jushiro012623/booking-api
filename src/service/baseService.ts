import {NextFunction, Response, Request} from 'express'
import catchAsync from '../utils/catchAsync'

export default class Crud {
    private model
    private modelLabel
    constructor(Model : any, modelLabel : string){
        this.model = Model
        this.modelLabel = modelLabel
    }
    public deleteOne = async (req : Request, res : Response, next : NextFunction) => {
        const id = req.params.id
        const result = await this.model.destroy({ where: { id } })
    
        if (!result) {
            res.status(404)
            return next(new Error(`No ${this.modelLabel} Found`))
        }
        res.status(204).json({
            success: true,
            message: `${this.modelLabel} deleted sucessfully`,
            data: null
        });
    };
    public updateOne = async (req : Request, res : Response, next : NextFunction)  => {
        const id = req.params.id
        const result = await this.model.update(req.body,{ where: { id } });
        if (!result) {
            res.status(404)
            return next(new Error(`No ${this.modelLabel} Found`))
        }
        const updatedResult = await this.model.findByPk(id)
        res.status(200).json({
            success: true,
            message: `${this.modelLabel} updated  sucessfully`,
            data: updatedResult,
        });
    };
    public createOne = async (req : Request, res : Response, next : NextFunction)  => {
        const result = await this.model.create({...req.body,});
            res.status(201).json({
            success: true,
            data: result,
            message: `${this.modelLabel} created sucessfully`,
        })
    };
      
    public getOne = async (req : Request, res : Response, next : NextFunction)  => {
        const result = await this.model.findByPk(req.params.id);
        if (!result) {
            res.status(404)
            return next(new Error(`No ${this.modelLabel} Found`))
        }
        res.status(200).json({
            success: true,
            data: result,
            message: `${this.modelLabel} retrieved sucessfully`,
        });
    };
      
    public getAll = async (req : Request, res : Response, next : NextFunction)  => {
        const result = await this.model.findAll({
            attributes : {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        });
        res.status(201).json({
            success: true,
            data: result,
            message: `${this.modelLabel}s retrieved sucessfully`,
        });
    };
    
}
