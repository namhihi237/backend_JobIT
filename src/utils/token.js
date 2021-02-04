import jwt from "jsonwebtoken";
import { envVariables } from "../configs";

const { jwtSecret } = envVariables;

export const tokenEncode = (data) => {
    return jwt.sign(data, jwtSecret, {
        // expiresIn: "8640000"
    });
};

export const verifyToken = (token) => {
    const data = jwt.verify(token, jwtSecret);
    return data;
};
