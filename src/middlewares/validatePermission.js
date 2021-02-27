import { HttpError, checkRoleAndPer } from "../utils";
/* check role - permision user*/

const checkPer = (perCode) => async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, perCode))) {
            throw new HttpError("Deny permission", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const roleMiddleware = {
    checkPer,
};
