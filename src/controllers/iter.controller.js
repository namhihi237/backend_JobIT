import { ITer, Cv, Company } from "../models";
import { HttpError } from "../utils";

/**
 * @api {get} /api/v1/iters/profile get profile
 * @apiName get profile
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} user <code> Objects user</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
          "user": {
                "_id": "6020bd895d7a6b07b0b0eef9",
                "email": "yentth@gmail.com",
                "fullName": "Le Trung Nam",
            }
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission get profile"
 *     }
 */
const getUserProfile = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const user = await ITer.findOne(
            { accountId: _id },
            {
                __v: 0,
                password: 0,
                createdAt: 0,
                updatedAt: 0,
                receiveMailJob: 0,
                role: 0,
                roleId: 0,
            }
        );
        if (!user) throw new HttpError("User not found", 400);
        res.status(200).json({
            status: 200,
            msg: "Success",
            user,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/iters/profile update profile
 * @apiName update profile
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} fullName fullname's company
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission update profile"
 *     }
 */
const updateProfile = async (req, res, next) => {
    const { fullName } = req.user;
    const { _id } = req.user;
    try {
        await ITer.findOneAndUpdate({ accountId: _id }, { fullName });
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {get} /api/v1/iters get all iters
 * @apiName get all iters
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} iters
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission update profile"
 *     }
 */
const getIters = async (req, res, next) => {
    try {
        const iters = await ITer.find();
        res.status(200).json({
            status: 200,
            msg: "Success",
            iters,
        });
    } catch (error) {
        next();
    }
};

export const iterController = {
    getUserProfile,
    updateProfile,
    getIters,
};
