import { Request, Response } from "express";

require('dotenv').config()
const secret_key = require('../config/jwt.config')
const db = require('../models')
const jwt = require('jsonwebtoken')
const {hash, compare} = require('../utils/bcryptFunction')
const login = async (req : Request, res: Response) => {
    try {
        const { email, password , type } = req.body;
        const user = await db.User.findOne({
            where:{ email },
            include: {
                model: db.Roles,
                include: db.Permission,
            }
        })
        if(!user) return res.status(404).json({message: 'User not found'})
        
        const roles = user.Roles.map((role : any) => role.name)
        // const permissions = user.Roles.flatMap((role : any) => role.Permissions.map((permission : any) => permission.name))

        const isPasswordMatch = await compare(password, user.password) 
        if(!isPasswordMatch) return res.status(404).json({message: 'Invalid Credentials'})

        const isNotAdmin = !roles.includes('admin')
        const isNotClient = !roles.includes('user')
        if (type === 1 && isNotAdmin) return res.status(403).json({ message: 'Access denied. Admin role is required.' });
        if (type === 2 && isNotClient) return res.status(403).json({ message: 'Access denied. Client role is required.' });
        const hashed_id = await hash(user.id.toString())
        const token = jwt.sign({ id: user.id }, secret_key, { expiresIn: '1h' })
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
        res.status(500).json({message: 'Server Error', success: false})
    }
}
const register = async (req: any, res: Response) => {
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
            await transaction.rollback();
            return res.status(409).json({ message: 'User already exists' });
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