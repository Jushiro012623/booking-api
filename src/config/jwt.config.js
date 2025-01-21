require('dotenv').config();
const secret_key = process.env.JWT_SECRET_KEY
const expiry = process.env.JWT_EXPIRY

module.exports = {
  secret_key,
  expiry
}