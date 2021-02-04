import { HttpError } from "./httpError";
export const validateRequest = (req, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        throw new HttpError(`${error.details.map((x) => x.message).join(", ")}`, 400);
    } else {
        req.body = value;
        next();
    }
};
