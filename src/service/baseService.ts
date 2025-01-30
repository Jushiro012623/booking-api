import {NextFunction, Response, Request} from 'express'
import statusCodes from '../constants/statusCodes'
import catchAsync from '../utils/catchAsync'
import { Model } from 'sequelize'
export default class BaseService {
    private model
    private modelLabel
    constructor(Model : any, modelLabel : string){
        this.model = Model
        this.modelLabel = modelLabel
    }
    public deleteOne = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
        const id = req.params.id
        const result = await this.model.destroy({ where: { id } })
    
        if (!result) {
            res.status(statusCodes.NOT_FOUND)
            return next(new Error(`No ${this.modelLabel} Found`))
        }
        res.status(statusCodes.NO_CONTENT).json({
            success: true,
            message: `${this.modelLabel} deleted sucessfully`,
            data: null
        });
    });
    public updateOne = catchAsync(async (req : Request, res : Response, next : NextFunction)  => {
        const id = req.params.id
        const result = await this.model.update(req.body,{ where: { id } });
        if (!result) {
            res.status(statusCodes.NOT_FOUND)
            return next(new Error(`No ${this.modelLabel} Found`))
        }
        const updatedResult = await this.model.findByPk(id)
        res.status(statusCodes.OK).json({
            success: true,
            message: `${this.modelLabel} updated  sucessfully`,
            data: updatedResult,
        });
    });
    public createOne = catchAsync(async (req : Request, res : Response, next : NextFunction)  => {
        const result = await this.model.create({...req.body,});
            res.status(statusCodes.CREATED).json({
            success: true,
            data: result,
            message: `${this.modelLabel} created sucessfully`,
        })
    });
    public getOne = catchAsync(async (req : Request, res : Response, next : NextFunction)  => {
        const result = await this.model.findByPk(req.params.id);
        if (!result) {
            res.status(statusCodes.NOT_FOUND)
            return next(new Error(`No ${this.modelLabel} Found`))
        }
        res.status(statusCodes.OK).json({
            success: true,
            data: result,
            message: `${this.modelLabel} retrieved sucessfully`,
        });
    });
    public getAll = catchAsync(async (req : Request, res : Response, next : NextFunction)  => {
        const result = await this.model.findAll({
            attributes : {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        });
        res.status(statusCodes.OK).json({
            success: true,
            data: result,
            message: `${this.modelLabel}s retrieved sucessfully`,
        });
    });
    
}
