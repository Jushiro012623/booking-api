import { NextFunction, Request, Response } from "express";

require('dotenv').config()
const jwt_config = require('../config/jwt.config')
const db = require('../models')
const jwt = require('jsonwebtoken')
const {hash, compare} = require('../utils/bcryptFunction')

const roleMapping = {
    1 : 'admin',
    2 : 'user',
    3 : 'terminal',
};
const login = async (req : Request, res: Response, next : NextFunction) => {
    try {
        const { email, password, type  } = req.body;
        const user = await db.User.findOne({
            where: {email},
            include: {
                model: db.Roles,
                include: db.Permission,
            }
        })
        if(!user) {
            res.status(404)
            return next(new Error("User not found"));
        }
        const isPasswordMatch = await compare(password, user.password) 
        if(!isPasswordMatch){
            res.status(401)
            return next(new Error("Invalid Credentials"));
        }

        const roles = user.Roles.map((role : any) => role.name)
        const requiredRole = roleMapping[type as keyof typeof roleMapping];
        if (!roles.includes(requiredRole)) {
            res.status(403)
            return next(new Error(`Access denied. ${requiredRole} role is required.`));
        }
        const hashed_id = await hash(user.id.toString())
        const token = jwt.sign({ id: user.id }, jwt_config.secret_key, { expiresIn: jwt_config.expiry })
        res.status(200).json({
            success: true,
            access_token: token,
            user : {
                id: hashed_id,
                email: user.email,
                username: user.username,
            }
        })
    } catch (error) {
        console.error(error)
        next(error);
    }
}
const register = async (req: any, res: Response, next : NextFunction) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { email, password, username } = req.body;
        const isUserExist = await db.User.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { email },
                    { username }
                ]
            }
        });
        if (isUserExist) {
            res.status(409)
            return next(new Error('User already exists'))
        }
        const hashedPassword = await hash(password);
        const user = await db.User.create({ email, password: hashedPassword, username });
        
        await db.Users_Roles.create({ role_id: 2, user_id: user.id });
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
        console.error(error);
        res.status(500).json({ message: 'Server Error', success: false, error });
    }
}
const logout = async (req : Request, res : Response) => {
    res.status(200).json({success: true, message: 'Logged out successfully'})
}
module.exports = { login, register, logout }