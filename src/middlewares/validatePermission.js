import { HttpError, checkRoleAndPer } from "../utils";
/* check role - permision user*/

const createModPer = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "CREATE_MOD"))) {
            throw new HttpError("Deny permission create account mod", 401);
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
            throw new HttpError("Deny permission create post", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const updatePostPer = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "UPDATE_POST"))) {
            throw new HttpError("Deny permission update post", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const deletePostPer = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "DELETE_POST"))) {
            throw new HttpError("Deny permission delete post", 401);
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
            throw new HttpError("Deny permission get all post need accept", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const roleMiddleware = {
    createModPer,
    createPostPer,
    viewPostNeedAcceptPer,
    updatePostPer,
    deletePostPer,
};
