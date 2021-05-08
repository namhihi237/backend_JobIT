import { envVariables } from '../configs';
const { subject } = envVariables;
const ALPHABET = '0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ';
import { passwordResetTemplate } from '../resources';
import sgMail from '@sendgrid/mail';

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

export const sendEmail = async (code, email) => {
	const msg = {
		to: email,
		from: envVariables.VERIFIED_SENDER,
		subject,
		html: passwordResetTemplate(code),
	};
	try {
		console.log('send');
		await sgMail.send(msg);
	} catch (error) {
		console.error(error);
		if (error.response) {
			console.error(error.response.body);
		}
	}
};

// generate code 6 char
export const generate = () => {
	let code = '';
	for (let i = 0; i < 6; i++) {
		code += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
	}
	return code;
};
