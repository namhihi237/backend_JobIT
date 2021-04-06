import mongo from "mongoose";
import { HttpError } from "../utils";
import { CompanyService } from "../services";
const companyService = new CompanyService();
/**
 * @api {get} /api/v1/companys/profile get profile
 * @apiName get company
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
 *     HTTP/1.1 400
 *     {
 *       "status" : 401,
 *       "msg": "Company not found""
 *     }
 */

const getProfile = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const user = await companyService.getCompany(_id);
        if (!user) throw new HttpError("Company not found", 400);

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
 * @api {post} /api/v1/companys/profile update company
 * @apiName update company
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
    const { companyName } = req.body;
    const { _id } = req.user;
    try {
        const data = { companyName };
        if (!(await companyService.update(_id, data)))
            throw new HttpError("Company not found", 400);
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
        const companys = await companyService.getCompanys();
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
        if (!mongo.Types.ObjectId.isValid(id)) throw new HttpError("Id incorrect", 401);
        if (!(await companyService.deleteCompany(id)))
            throw new HttpError("Company not found", 400);
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

export const companyController = {
    getProfile,
    updateProfile,
    getCompanys,
    deleteCompany,
};
