const bcrypt = require("bcrypt");
const hash = (hash : string) => bcrypt.hash(hash, 10);
const compare = (value : any, compareTo : any) => bcrypt.compare(value, compareTo) 

module.exports = {
    hash,
    compare,
}