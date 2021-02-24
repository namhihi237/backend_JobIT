import nodemailer from "nodemailer";
import { envVariables } from "../configs";
const { gmail, pass, text, subject } = envVariables;
const ALPHABET = "0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ";

export const sendEmail = async (code, email) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: gmail,
            pass: pass,
        },
    });
    await transporter.sendMail({
        from: gmail,
        to: email,
        subject: subject,
        text: text + code,
    });
};

// generate code 6 char
export const generate = () => {
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return code;
};
