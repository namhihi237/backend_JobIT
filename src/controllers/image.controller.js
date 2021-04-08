import mongo from "mongoose";
import { HttpError, signFileUploadRequest } from "../utils";
import { IterService } from "../services";
import { Company, ITer } from "../models";
const iterService = new IterService();

/**
 * @api {get} /api/v1/images get payload signature cloudinary
 * @apiName get payload signature cloudinary
 * @apiGroup Image
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} payload <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
        * "payload": {
                "signature": "d47b348722d72d392dbf92f7abeeed3a0f49c9fc",
                "timestamp": 1617872195
            }
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */

const uploadImageProfile = async (req, res, next) => {
    try {
        const payload = await signFileUploadRequest();
        res.status(200).json({
            status: 200,
            msg: "Success",
            payload,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/images save image database
 * @apiName save image database
 * @apiGroup Image
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiParam {String} imageUrl url's image
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} payload <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission update profile"
 *     }
 */
const saveUrlImageUser = async (req, res, next) => {
    const { imageUrl } = req.body;
    const { _id, role } = req.user;
    if (role == "iter") await ITer.findOneAndUpdate({ accountId: _id }, { image: imageUrl });
    if (role == "company") await Company.findOneAndUpdate({ accountId: _id }, { image: imageUrl });
    res.status(200).json({
        status: 200,
        msg: "Success",
    });
    try {
    } catch (error) {
        next(error);
    }
};

export const imageController = {
    uploadImageProfile,
    saveUrlImageUser,
};
