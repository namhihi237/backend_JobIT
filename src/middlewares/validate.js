import Joi from 'joi';
import { validateRequest } from '../utils';
/* -------------------auth ----------------------------*/
const registerITerSchema = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		password: Joi.string().alphanum().required().min(6).max(50),
		email: Joi.string().email().required(),
	});
	validateRequest(req, next, schema);
};

const registerCompanySchema = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		password: Joi.string().alphanum().required().min(6).max(50),
		email: Joi.string().email().required(),
	});
	validateRequest(req, next, schema);
};

const updateInfoSchema = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		address: Joi.string().empty(),
		phone: Joi.string()
			.empty()
			.regex(/^(84|0[3|5|7|8|9])+([0-9]{8})$/)
			.message(`phone incorrect format`),
		image: Joi.string().empty(),
	});
	validateRequest(req, next, schema);
};

const loginSchema = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().alphanum().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
};

const updatePassSchema = (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string().alphanum().min(6).max(50).empty('').required(),
		newPassword: Joi.string().alphanum().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
};

const requestResetPass = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
	});
	validateRequest(req, next, schema);
};

const changeResetPass = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		code: Joi.string().required(),
		password: Joi.string().alphanum().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
};
/*-------------admin------------------- */

const loginAdminSchema = (req, res, next) => {
	const schema = Joi.object({
		userName: Joi.string().required(),
		password: Joi.string().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
};

const createModSchema = (req, res, next) => {
	const schema = Joi.object({
		userName: Joi.string().required(),
		password: Joi.string().min(6).max(50).empty('').required(),
	});
	validateRequest(req, next, schema);
};
/*-------------post------------------- */

const createPostSchema = (req, res, next) => {
	const schema = Joi.object({
		skill: Joi.array()
			.min(1)
			.items(Joi.string())
			.required()
			.messages({ 'array.min': `skill cannot be an empty field` }),
		title: Joi.string().required(),
		address: Joi.string().required(),
		endTime: Joi.string().required(),
		description: Joi.string().required(),
		salary: Joi.string().required(),
	});
	validateRequest(req, next, schema);
};

const updatePostSchema = (req, res, next) => {
	const schema = Joi.object({
		skill: Joi.array()
			.min(1)
			.items(Joi.string())
			.empty()
			.messages({ 'array.min': `skill cannot be an empty field` }),
		title: Joi.string().empty(),
		address: Joi.string().empty(),
		endTime: Joi.string().empty(),
		description: Joi.string().empty(),
		salary: Joi.string().empty(),
	});
	validateRequest(req, next, schema);
};

const createFeedbackSchema = (req, res, next) => {
	const schema = Joi.object({
		content: Joi.string().required(),
	});
	validateRequest(req, next, schema);
};

const createCvSchema = (req, res, next) => {
	const schema = Joi.object({
		skill: Joi.array().min(1).items(Joi.string()).required().messages({ 'array.min': `skill cannot be an empty` }),
		softSkill: Joi.string().required(),
		experience: Joi.string().required(),
		description: Joi.string().required(),
		birthday: Joi.string()
			.required()
			.regex(
				/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
			)
			.message('birthday incorrect format'),
		image: Joi.string().required(),
	});
	validateRequest(req, next, schema);
};

const updateCvSchema = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().empty(),
		skill: Joi.array().min(1).items(Joi.string()).empty().messages({ 'array.min': `skill cannot be an empty` }),
		softSkill: Joi.string().empty(),
		email: Joi.string().email().empty(),
		experience: Joi.string().empty(),
		description: Joi.string().empty(),
		birthday: Joi.string()
			.empty()
			.regex(
				/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
			)
			.message('birthday incorrect format'),
		image: Joi.string(),
	});
	validateRequest(req, next, schema);
};

const registerEmailSchema = (req, res, next) => {
	const schema = Joi.object({
		receive: Joi.boolean().required(),
	});
	validateRequest(req, next, schema);
};

export const validateRequestBody = {
	registerITerSchema,
	registerCompanySchema,
	loginSchema,
	createModSchema,
	loginAdminSchema,
	createPostSchema,
	createFeedbackSchema,
	updateInfoSchema,
	updatePassSchema,
	requestResetPass,
	changeResetPass,
	createCvSchema,
	registerEmailSchema,
	updateCvSchema,
	updatePostSchema,
};
