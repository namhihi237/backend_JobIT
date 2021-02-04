import Joi from "joi";
import { validateRequest } from "../utils";

const registerITerSchema = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(20),
        password: Joi.string().required().min(6).max(50),
        email: Joi.string().email().required(),
        gender: Joi.string().required().valid("Male", "Female"),
        birthday: Joi.string().required(),
        role: Joi.string().valid("iter").required(),
    });
    validateRequest(req, next, schema);
};

const registerCompanySchema = (req, res, next) => {
    const schema = Joi.object({
        nameCompany: Joi.string().required(),
        password: Joi.string().required().min(6).max(50),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        role: Joi.string().valid("iter").required(),
    });
    validateRequest(req, next, schema);
};

const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).empty("").required(),
    });
    validateRequest(req, next, schema);
};

export const validateRequestBody = { registerITerSchema, registerCompanySchema, loginSchema };
