import 'dotenv/config'
const secret_key = process.env.JWT_SECRET_KEY
const expiry = process.env.JWT_EXPIRE_IN

export default{
  secret_key,
  expiry
}