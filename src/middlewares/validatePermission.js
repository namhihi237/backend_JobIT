import { HttpError, checkRoleAndPer } from "../utils";
/* check role - permission user*/

const checkPer = (perCode) => async (req, res, next) => {
    const { _id } = req.user;
    try {
        if (!(await checkRoleAndPer(_id, perCode))) {
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
