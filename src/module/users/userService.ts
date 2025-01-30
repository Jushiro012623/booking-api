import moment from "moment";
import { Op } from "sequelize";

const db = require('../../models')

const findUser = async (where : any, include_roles_and_permissions : boolean = false) => { 
    const query : any = {
        where: where,
    }
    if(include_roles_and_permissions){
        query.include = {
            model: db.Roles,
            include: db.Permission,}
    }
    return await db.User.findOne(query)  
}
const canUserLogin = (user : any, type : number) => {
    const roleMapping = {
        1 : 'admin',
        2 : 'user',
        3 : 'terminal',
    };
    const roles = user.Roles.map((role : { name: string }) => role.name)
    const requiredRole = roleMapping[type as keyof typeof roleMapping];

    return roles.includes(requiredRole)
}
const createUser = async (data : any) => {
    return await db.User.create(data);
}
const createUserRole = async (data : {role_id :number , user_id : number}) => {
    return await db.Users_Roles.create(data);
}
const saveResetPasswordToken = async (data : {token : string, expiration : string, user_id : string}) => {
    return await db.Password_Reset_Tokens.create(data);
}
const isResetTokenValid = async (token : string) => {
    return await db.Password_Reset_Tokens.findOne({where : {token, expiration: {
        [Op.lte]: moment()
    }}})
}
export default {
    findUser,
    canUserLogin,
    createUser,
    createUserRole,
    saveResetPasswordToken,
    isResetTokenValid,
}