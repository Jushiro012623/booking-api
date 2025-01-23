
import { NextFunction, Request, Response } from "express";
import {hash, compare} from '../../utils/bcryptFunction'
import authService from "./userService";
import jwt_config from "../../config/jwt.config";
import verifyRequest from "../../helpers/verifyRequest";
import BaseService from '../../service/baseService'

const jwt = require('jsonwebtoken')
const db = require('../../models')
const user = new BaseService(db.User, 'User')


export const login = async (req : Request, res: Response, next : NextFunction) => {
    verifyRequest(req, res)
    const { email, password, type  } = req.body;

    const user = await authService.findUser({email})
    if(!user) {
        res.status(404)
        return next(new Error("User not found"));
    }
    const isPasswordMatch = await compare(password, user.password) 
    if(!isPasswordMatch){
        res.status(401)
        return next(new Error("Invalid Credentials"));
    }
    const canUserLogin = authService.canUserLogin(user, type)
    if (!canUserLogin) {
        res.status(403)
        return next(new Error(`Access denied. The user does not have the required role.`));
    }
    const token = jwt.sign({ id: user.id }, jwt_config.secret_key, { expiresIn: jwt_config.expiry })
    res.status(200).json({
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
        if (isUserExist) {
            res.status(409)
            return next(new Error('User already exists'))
        }
        const hashedPassword = await hash(password);
        const user = await authService.createUser({ email, password: hashedPassword, username })
        await authService.createUserRole({ role_id: 2, user_id: user.id })
        const hashed_id = await hash(user.id.toString())
        await transaction.commit();
        res.status(200).json({
            success: true,
            user : {
                id: hashed_id,
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
    res.status(200).json({success: true, message: 'Logged out successfully'})
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
    createOne
}