import { HttpError, checkRoleAndPer } from "../utils";
/* check role - permision user*/

const createModPer = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "CREATE_MOD"))) {
            throw new HttpError("Denny permission create account mod", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const createPostPer = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "CREATE_POST"))) {
            throw new HttpError("Denny permission create post", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const viewPostNeedAcceptPer = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "VIEW_POSTS_NEED_ACCEPT"))) {
            throw new HttpError("Denny permission get all post need accept", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const roleMiddleware = { createModPer, createPostPer, viewPostNeedAcceptPer };
