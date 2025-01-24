import { NextFunction, Request, Response } from "express";
import {hash, compare} from '../../utils/bcryptFunction'
import authService from "./userService";
import jwt_config from "../../config/jwt.config";
import verifyRequest from "../../helpers/verifyRequest";
import BaseService from '../../service/baseService'
import returnError from '../../utils/returnError';
import HttpStatus from "../../constants/statusCodes";
import userService from "./userService";
import crypto from 'crypto'
import moment from "moment";

const jwt = require('jsonwebtoken')
const db = require('../../models')
const user = new BaseService(db.User, 'User')
interface CustomRequest extends Request {
    user?: {
        id: number;
        roles: { name: string }[];
        permissions: string[];
    };
}

export const login = async (req : Request, res: Response, next : NextFunction) => {
    verifyRequest(req, res)
    const { email, password, type  } = req.body;

    const user = await authService.findUser({ email })  
    if(!user) returnError(res, next, 'User not found', HttpStatus.NOT_FOUND);

    const isPasswordMatch = await compare(password, user.password) 
    if(!isPasswordMatch) returnError(res, next, 'Invalid Credentials', HttpStatus.UNAUTHORIZED);

    const canUserLogin = authService.canUserLogin(user, type)
    if (!canUserLogin) returnError(res, next, 'Access denied. The user does not have the required role.', HttpStatus.FORBIDDEN);

    const token = jwt.sign({ id: user.id, email: user.email }, jwt_config.secret_key, { algorithm: 'HS256', expiresIn: jwt_config.expiry })
    res.status(HttpStatus.OK).json({
        success: true,
        message: 'User logged in successfully',
        data: {
            access_token: token,
            user : {
                email: user.email,
                username: user.username,
            }
        },
    })
}
export const register = async (req: any, res: Response, next : NextFunction) => {
    verifyRequest(req, res)
    const transaction = await db.sequelize.transaction();
    try {
        const { email, password, username } = req.body;

        const isUserExist = await authService.findUser({ [db.Sequelize.Op.or]: [ { email }, { username }] })
        if (isUserExist) returnError(res, next, 'User already exists', HttpStatus.CONFLICT);

        const hashedPassword = await hash(password);
        const user = await authService.createUser({ email, password: hashedPassword, username })

        await authService.createUserRole({ role_id: 2, user_id: user.id })

        await transaction.commit();
        res.status(HttpStatus.CREATED).json({
            success: true,
            data: {
                user : {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
            },
            message: 'User registered successfully'
        });
    } catch (error: any) {
        await transaction.rollback();
        next(error);
    }
}
export const logout = async (req : Request, res : Response) => {
    res.status(HttpStatus.OK).json({success: true, message: 'User logged out successfully'})
}
export const forgotPassword = async (req : Request, res : Response, next : NextFunction) => {
    const { email } = req.body
    const user : any = await userService.findUser({email})
    if (!user) returnError(res, next, 'User not found', HttpStatus.NOT_FOUND);
    const token = crypto.randomBytes(20).toString('hex');
    const expiration = moment().add(30, 'minutes').toISOString();
    await userService.saveResetPasswordToken({token, expiration, user_id: user.id})
    const transporter = authService.transporter()
    const mailOptions = authService.mailOptions(user.email, token)
    const info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
    res.status(HttpStatus.OK).json(
        { 
            success: true, 
            message: 'Reset password link sent successfully' ,
            token
    })
}
export const resetPasswordToken = async (req : Request, res : Response, next : NextFunction) => {
    verifyRequest(req, res)
    const { token } = req.params;
    const resetToken = await userService.isResetTokenValid(token);
    if (!resetToken) returnError(res, next, 'Invalid or expired token', HttpStatus.NOT_FOUND);

    res.status(HttpStatus.OK).send(`
        <form method="post" action="/reset-password">
            <input type="hidden" name="token" value="${token}" />
            <input type="password" name="password" required placeholder="New Password" />
            <input type="submit" value="Reset Password" />
        </form>
    `);
}
export const resetPassword = async (req : Request, res : Response, next : NextFunction) => {
    verifyRequest(req, res)
    const { token, password } = req.body;
    const resetToken = await userService.isResetTokenValid(token);
    if (!resetToken) returnError(res, next, 'Invalid or expired token', HttpStatus.NOT_FOUND);

    const user = await userService.findUser({ id: resetToken.user_id });
    if (!user) returnError(res, next, 'User not found', HttpStatus.NOT_FOUND);

    const hashedPassword = await hash(password);
    await user.update({ password: hashedPassword });

    await resetToken.destroy();

    res.status(HttpStatus.OK).json({
        success: true,
        message: 'Password reset successfully'
    });
}
export const updatePassword = async (req : CustomRequest, res : Response, next : NextFunction) => {

        verifyRequest(req, res);
        const { currentPassword, password } = req.body;
        const userId = req.user?.id;

        if (!userId) returnError(res, next, 'User not authenticated', HttpStatus.UNAUTHORIZED);

        const user = await userService.findUser({ id: userId });
        if (!user) returnError(res, next, 'User not found', HttpStatus.NOT_FOUND);

        const isPasswordMatch = await compare(currentPassword, user.password);
        if (!isPasswordMatch) returnError(res, next, 'Current password is incorrect', HttpStatus.UNAUTHORIZED);

        const hashedPassword = await hash(password);
        await user.update({ password: hashedPassword });

        res.status(HttpStatus.OK).json({ 
            success: true,
            message: 'Password updated successfully'
        });
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
    logout,
    forgotPassword,
    resetPasswordToken,
    resetPassword,
    updatePassword,
    
}
