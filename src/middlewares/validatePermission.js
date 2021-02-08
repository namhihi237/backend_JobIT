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

const acceptPostPer = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "ACCEPT_POST"))) {
            throw new HttpError("Deny permission accept post", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const getFeebackper = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "VIEW_FEEDBACKS"))) {
            throw new HttpError("Deny permission get feedbacks", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const createFeebackper = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "CREATE_FEEDBACK"))) {
            throw new HttpError("Deny permission create feedback", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const deleteFeebackper = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "DELETE_FEEDBACK"))) {
            throw new HttpError("Deny permission delete feedback", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const getProfilePer = async (req, res, next) => {
    const { role } = req.user;
    console.log(req.user._id, role);
    try {
        if (!(await checkRoleAndPer(role, "VIEW_PROFILE"))) {
            throw new HttpError("Deny permission get profile", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const updateProfilePer = async (req, res, next) => {
    const { role } = req.user;
    console.log(req.user._id, role);
    try {
        if (!(await checkRoleAndPer(role, "UPDATE_PROFILE"))) {
            throw new HttpError("Deny permission get profile", 401);
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
    acceptPostPer,
    getFeebackper,
    createFeebackper,
    deleteFeebackper,
    getProfilePer,
    updateProfilePer,
};
