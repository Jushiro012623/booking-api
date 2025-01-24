import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
const db =require('../models')
interface CustomRequest extends Request {
    user?: {
        id: number;
        roles: { name: string }[];
        permissions: string[];
    };
}
export default (allowedRoles: string[]) => {
    return catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
        const userId = (req.user as { id: number }).id;
        const user = await db.User.findByPk(userId, {
            include: {
                model: db.Roles,
                where: {
                    name: { [db.Sequelize.Op.in]: allowedRoles }
                }
            }
        });
        if (!user) {
            res.status(403)
            return next(new Error('You do not have permission to access this page.'))
        }
        next(); 
    })
};

