
const db = require('../../models')
const findUser = async (where : any) =>{ 
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
export default {
    findUser,
    canUserLogin,
    createUser,
    createUserRole
}