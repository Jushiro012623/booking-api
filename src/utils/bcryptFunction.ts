const bcrypt = require("bcrypt");


export const hash = async (hash : string) => {
    const salt = await bcrypt.genSalt(10) 
    return bcrypt.hash(hash, salt)};
export const compare = async (value : any, compareTo : any) => await bcrypt.compare(value, compareTo) 

export default {
    hash,
    compare,
}