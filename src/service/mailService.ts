
import getBaseUrl from "../utils/getBaseUrl";
const nodemailer = require('nodemailer');
export const transporter = () => {
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

export const mailOptions = (email : string , token : string) => {
    return {
    from: 'ethan.madamando@deped.gov.ph',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${getBaseUrl}/reset-password/${token}`,
}};
export default {
    transporter,
    mailOptions,
}
