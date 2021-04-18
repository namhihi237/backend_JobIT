import { envVariables } from "../configs";
import bcrypt from "bcryptjs";
import { tokenEncode, pagination, HttpError } from "../utils";
import { Account, Admin, Permission, UserPer } from "../models";
import mongo from "mongoose";

/*
 * @private
 */
const registerAdmin = async (req, res, next) => {
    const { userName, password, keyAdmin } = req.body;
    if (keyAdmin != "1234") throw new HttpError("Failed", 400);

    if (!userName || !password) throw new HttpError("userName or password is empty", 400);

    const hash = await bcrypt.hash(password, 12);
    if (!hash) throw new HttpError("hash password failed", 400);

    const admin = await Admin.create({
        userName,
        password: hash,
        role: "admin",
    });
    let permissions = await Permission.find({ role: "admin", check: true });
    permissions = permissions.map((e) => {
        // return { actionCode: e.actionCode, check: e.check };
        return UserPer.create({
            userId: admin._id,
            perId: e._id,
            perName: e.perName,
            actionCode: e.actionCode,
            check: true,
        });
    });
    await Promise.all(permissions);
    res.status(200).json({
        status: 200,
        msg: "Success",
        userName,
    });
    try {
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/admin/login login admin, mod
 * @apiName Login mod admin
 * @apiGroup Admin
 * @apiParam {String} userName username's  account
 * @apiParam {String} password password's account
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *         role : "moderator"
 *         token : "xxx.xxx.xxx"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "userName or password is incorrect"
 *     }
 */
const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const account = await Admin.findOne({ userName });
        if (!account) throw new HttpError("userName or password is incorrect", 400);
        const match = await bcrypt.compare(password, account.password);
        if (!match) throw new HttpError("userName or password is incorrect", 400);
        const data = {
            userName,
            _id: account._id,
            role: account.role,
        };
        const token = tokenEncode(data);
        res.status(200).json({
            status: 200,
            msg: "Success",
            token,
            role: account.role,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * @api {post} /api/v1/moderators create acc mod
 * @apiName Create mod
 * @apiGroup Admin
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} userName username's mod account
 * @apiParam {String} password password's mod account
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Create mod success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Create mod success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "username is exist"
 *     }
 */
const createMod = async (req, res, next) => {
    let { userName, password } = req.body;
    userName = userName.toLowerCase();
    try {
        const mod = await Admin.findOne({ userName }, { password: 0 });
        if (mod) throw new HttpError("username is exist", 400);
        const hash = await bcrypt.hash(password, 12);
        if (!hash) throw new HttpError("Fail", 400);
        const acc = await Admin.create({
            userName,
            password: hash,
            role: "moderator",
        });
        let permissions = await Permission.find({
            role: "moderator",
            check: true,
        });
        permissions = permissions.map((e) => {
            return UserPer.create({
                userId: acc._id,
                perId: e._id,
                perName: e.perName,
                actionCode: e.actionCode,
                check: true,
            });
        });
        await Promise.all(permissions);

        res.status(200).json({
            status: 200,
            msg: "Create mod success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {get} /api/v1/moderators get all moderators
 * @apiName get all moderators
 * @apiGroup Admin
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * * @apiSuccess {Array} mods <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
           "data": {
                "page": 1,
                "numPages": 2,
                "result": [
                    {
                        "_id": "605b34cfd16e2c00151b1f05",
                        "userName": "admin",
                        "createdAt": "2021-03-24T12:47:11.141Z"
                    },
                    {
                        "_id": "60650f786f6c98001512685e",
                        "userName": "moderator1",
                        "createdAt": "2021-04-01T00:10:32.452Z"
                    },
                    {
                        "_id": "6065133f6f6c980015126864",
                        "userName": "moderator2",
                        "createdAt": "2021-04-01T00:26:39.324Z"
                    },
                ]
            }
        }
orExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "No token, authorization denied"
 *     }
 */
const getMods = async (req, res, next) => {
    const { page, take } = req.query;
    try {
        let data = await pagination(Admin, page, take, { password: 0, role: 0 });
        res.status(200).json({
            status: 200,
            msg: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {delete} /api/v1/moderators/:id delete mod
 * @apiName ddelete mod
 * @apiGroup Admin
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

const deleteMod = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongo.Types.ObjectId.isValid(id)) throw new HttpError("id is incorrect", 400);
        const mod = await Admin.findById({ _id: id });
        if (!mod) throw new HttpError("mod not found", 404);
        if (mod.role == "admin") throw new HttpError("Cant delete admin account", 401);
        const userPers = await UserPer.find({ userId: mod._id });
        const deleteUserPers = userPers.map((e) => UserPer.findByIdAndDelete({ _id: e._id }));
        await Promise.all([Admin.findByIdAndDelete({ _id: id }), ...deleteUserPers]);

        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};
export const adminController = {
    registerAdmin,
    createMod,
    login,
    getMods,
    deleteMod,
};
