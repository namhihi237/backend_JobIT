import { envVariables } from '../configs';
const { subject, gmail, pass } = envVariables;
const ALPHABET = '0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ';
import { passwordResetTemplate } from '../resources';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
//using sendgrid
sgMail.setApiKey(envVariables.SENDGRID_API_KEY);

export const sendMailJob = async (email, skill, linkJob) => {
	const msg = {
		to: email,
		from: envVariables.VERIFIED_SENDER,
		subject: `[NEW JOB FOR YOU]`,
		text: `Đã có job mới về ${skill} tại ${linkJob}`,
	};
	try {
		await sgMail.send(msg);
	} catch (error) {
		console.error(error);
		if (error.response) {
			console.error(error.response.body);
		}
	}
};

// export const sendMailJobShedule = async (email, title) => {
// 	const msg = {
// 		to: email,
// 		from: envVariables.VERIFIED_SENDER,
// 		subject: `[NEW JOB FOR YOU]`,
// 		text: `Đã có job mới về ${title} `,
// 	};
// 	try {
// 		await sgMail.send(msg);
// 		console.log('send ' + email);
// 	} catch (error) {
// 		console.error(error);
// 		if (error.response) {
// 			console.error(error.response.body);
// 		}
// 	}
// };

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: gmail,
		pass: pass,
	},
});
export const sendMailJobShedule = async (email, title) => {
	await transporter.sendMail({
		from: gmail,
		to: email,
		subject: `[NEW JOB FOR YOU]`,
		text: `Đã có job mới về ${title} `,
	});
};
// export const sendEmail = async (code, email) => {
// 	const msg = {
// 		to: email,
// 		from: envVariables.VERIFIED_SENDER,
// 		subject,
// 		html: passwordResetTemplate(code),
// 	};
// 	try {
// 		console.log('send');
// 		await sgMail.send(msg);
// 	} catch (error) {
// 		console.log(error);
// 		console.error(error);
// 		if (error.response) {
// 			console.error(error.response.body);
// 		}
// 	}
// };

// using nodemailer
export const sendEmail = async (code, email) => {
	await transporter.sendMail({
		from: gmail,
		to: email,
		subject,
		html: passwordResetTemplate(code),
	});
};
// generate code 6 char
export const generate = () => {
	let code = '';
	for (let i = 0; i < 6; i++) {
		code += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
	}
	return code;
};
