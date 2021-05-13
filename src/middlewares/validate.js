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
		phone: Joi.string().empty(),
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
		birthday: Joi.string().required(),
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
		birthday: Joi.string().empty(),
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
