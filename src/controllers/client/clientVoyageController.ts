import { NextFunction, Request, Response } from "express"
const db = require('../../models')

export const findAllVoyages = async (req : Request, res : Response,  next : NextFunction) => {
    try {
        const voyages = await db.Voyage.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        res.status(200).json({
            success: true,
            message: 'Voyages retrieved successfully',
            data: voyages
        })
    } catch (error) {
        console.error(error)
        next(error);
    }
}