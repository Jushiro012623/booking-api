
import { NextFunction, Request, Response } from "express";
import {hash, compare} from '../../utils/bcryptFunction'
import authService from "./userService";
import jwt_config from "../../config/jwt.config";
import verifyRequest from "../../helpers/verifyRequest";
import BaseService from '../../service/baseService'
import returnError from '../../utils/returnError';
import statusCodes from "../../constants/statusCodes";


const jwt = require('jsonwebtoken')
const db = require('../../models')
const user = new BaseService(db.User, 'User')


export const login = async (req : Request, res: Response, next : NextFunction) => {
    verifyRequest(req, res)
    const { email, password, type  } = req.body;

    const user = await authService.findUser({email})
    if(!user) returnError(res, next, 'User not found', statusCodes.NOT_FOUND);

    const isPasswordMatch = await compare(password, user.password) 
    if(!isPasswordMatch) returnError(res, next, 'Invalid Credentials', statusCodes.UNAUTHORIZED);

    const canUserLogin = authService.canUserLogin(user, type)
    if (!canUserLogin) returnError(res, next, 'Access denied. The user does not have the required role.', statusCodes.FORBIDDEN);

    const token = jwt.sign({ id: user.id }, jwt_config.secret_key, { expiresIn: jwt_config.expiry })
    res.status(statusCodes.OK).json({
        success: true,
        access_token: token,
        user : {
            id: user.id,
            email: user.email,
            username: user.username,
        }
    })
}
export const register = async (req: any, res: Response, next : NextFunction) => {
    verifyRequest(req, res)
    const transaction = await db.sequelize.transaction();
    try {
        const { email, password, username } = req.body;

        const isUserExist = await authService.findUser({ [db.Sequelize.Op.or]: [ { email }, { username }] })
        if (isUserExist) returnError(res, next, 'User already exists', statusCodes.CONFLICT);

        const hashedPassword = await hash(password);
        const user = await authService.createUser({ email, password: hashedPassword, username })

        await authService.createUserRole({ role_id: 2, user_id: user.id })

        await transaction.commit();
        res.status(statusCodes.OK).json({
            success: true,
            user : {
                id: user.id,
                email: user.email,
                username: user.username,
            },
            message: 'User registered successfully'
        });
    } catch (error: any) {
        await transaction.rollback();
        next(error);
    }
}
export const logout = async (req : Request, res : Response) => {
    res.status(statusCodes.OK).json({success: true, message: 'Logged out successfully'})
}

const getAll = user.getAll
const getOne = user.getOne
const updateOne = user.updateOne
const deleteOne = user.deleteOne
const createOne = user.createOne

export default {
    getAll,
    getOne,
    updateOne,
    deleteOne,
    createOne,
    login,
    register,
    logout
}