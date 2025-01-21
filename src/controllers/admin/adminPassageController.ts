import { NextFunction, Request, Response } from "express";
const db = require("../../models")

export const findAllPassages = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const offset = (page - 1) * pageSize;

        const passages = await db.Passage.findAll({
            limit: pageSize,
            offset: offset,
            attributes: { exclude: ['createdAt', 'updatedAt'] } 
        });
        const totalPassages = await db.Passage.count();

        res.status(200).json({
            success: true,
            message: 'Passages retrieved successfully',
            data: passages,
            pagination: {
                currentPage: page,
                pageSize: pageSize,
                totalItems: totalPassages,
                totalPages: Math.ceil(totalPassages / pageSize)
            }
        });
    } catch (error) {
        console.error(error)
        next(error);
    }
}
export const findOnePassages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const passage = await db.Passage.findByPk(req.params.id)
        if (!passage) {
            res.status(404)
            return next(new Error("Passage not found"));
        }
        res.status(200).json({
            success: true,
            message: 'Passage retrieved successfully',
            data: passage
        })
    } catch (error) {
        console.error(error)
        next(error);
    }
}
export default {findAllPassages}