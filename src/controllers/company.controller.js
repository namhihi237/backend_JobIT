import { ITer, Cv, Company, Account } from "../models";
import mongo from "mongoose";
import { HttpError } from "../utils";
/**
 * @api {get} /api/v1/companys/profile get profile
 * @apiName get profile
 * @apiGroup Company
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
 *         "user": {
                "_id": "601d07f259e12e126c0a2af4",
                "email": "yentth239@gmail.com",
                "companyName": "FPT",
                "roleId": "601b9d7cdae0a522ac960fe9"
            } 
            
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission get profile"
 *     }
 */
const getProfile = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const user = await Company.findOne(
            { accountId: _id },
            {
                __v: 0,
                password: 0,
                createdAt: 0,
                updateAt: 0,
                receiveMailJob: 0,
                role: 0,
                roleId: 0,
                rate: 0,
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
 * @api {post} /api/v1/companys/profile update profile
 * @apiName update profile
 * @apiGroup Company
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} companyName name's company
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
 *       "msg": "Denny permission"
 *     }
 */
const updateProfile = async (req, res, next) => {
    const { companyName } = req.user;
    const { _id } = req.user;
    try {
        await Company.findOneAndUpdate({ accountId: _id }, { companyName });
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {get} /api/v1/companys get all company
 * @apiName get all company
 * @apiGroup Company
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Array} companys
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
 *       "msg": "Denny permission",
         "companys": [
                {
                    "_id": "605f3a2f11c0693270c1f588",
                    "companyName": "FPT",
                    "accountId": "605f3a2f11c0693270c1f57d",
                    "email": "com1@gmail.com",
                    "createdAt": "2021-03-27T13:59:11.984Z"
                }
            ]
 *     }
 */
const getCompanys = async (req, res, next) => {
    try {
        const companys = await Company.find({}, { __v: 0, updatedAt: 0 });
        res.status(200).json({
            status: 200,
            msg: "Success",
            companys,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {delete} /api/v1/companys/:id delete company
 * @apiName delete company
 * @apiGroup Iter
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
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
const deleteCompany = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongo.Types.ObjectId.isValid(id))
            throw new HttpError("Id incorrect", 401);
        const com = await Company.findById({ _id: id });
        if (!com) throw new HttpError("User not found", 404);
        console.log(com);
        await Promise.all([
            Company.findByIdAndDelete({ _id: id }),
            Account.findByIdAndDelete({ _id: com.accountId }),
        ]);
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const companyController = {
    getProfile,
    updateProfile,
    getCompanys,
    deleteCompany,
};
