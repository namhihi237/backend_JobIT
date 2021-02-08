import { verifyToken, HttpError } from "../utils";

const jwtMidleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            throw new HttpError("No token, authorization denied", 401);
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = verifyToken(token);

            req.user = decodedToken;
            next();
        } catch (e) {
            throw new HttpError("Token is invalid", 400);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const authMiddleware = {
    jwtMidleware,
};
