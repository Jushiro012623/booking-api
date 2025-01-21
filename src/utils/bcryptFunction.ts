const bcrypt = require("bcrypt");
export const hash = (hash : string) => bcrypt.hash(hash, 10);
export const compare = (value : any, compareTo : any) => bcrypt.compare(value, compareTo) 

export default {
    hash,
    compare,
}