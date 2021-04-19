import nodemailer from "nodemailer";
import { envVariables } from "../configs";
const { gmail, pass, subject } = envVariables;
const ALPHABET = "0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ";
import { passwordResetTemplate } from "../resources";

export const sendMailJob = async (email, skill, linkJob) => {
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
        subject: `[NEW JOB FOR YOU]`,
        text: `Đã có job mới về ${skill} tại ${linkJob}`,
    });
};

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
        html: passwordResetTemplate(code),
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
