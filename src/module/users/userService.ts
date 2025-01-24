import moment from "moment";
import getBaseUrl from "../../utils/getBaseUrl";
import { Op } from "sequelize";

const db = require('../../models')
const nodemailer = require('nodemailer');

const findUser = async (where : any, include = null) =>{ 
    return await db.User.findOne({
        where: where,
        include: {
            model: db.Roles,
            include: db.Permission,
        }
    })  
}
const canUserLogin = (user : any, type : any) => {
    const roleMapping = {
        1 : 'admin',
        2 : 'user',
        3 : 'terminal',
    };
    const roles = user.Roles.map((role : any) => role.name)
    const requiredRole = roleMapping[type as keyof typeof roleMapping];

    return roles.includes(requiredRole)
}
const createUser = async (data : any) => {
    return await db.User.create(data);
}
const createUserRole = async (data : any) => {
    return await db.Users_Roles.create(data);
}
const saveResetPasswordToken = async (data : any) => {
    return await db.Password_Reset_Tokens.create(data);
}
const transporter = () => {
    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
    });
}

const mailOptions = (email : string , token : string) => {
    return {
    from: 'ethan.madamando@deped.gov.ph',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${getBaseUrl}/reset-password/${token}`,
}};

const isResetTokenValid = async (token : string) => {
    return await db.Password_Reset_Tokens.findOne({where : {token, expiration: {
        [Op.lte]: moment() // Check if expiration is less than or equal to the current moment (expired)
      }}})
}
export default {
    findUser,
    canUserLogin,
    createUser,
    createUserRole,
    saveResetPasswordToken,
    transporter,
    mailOptions,
    isResetTokenValid,
}