import { envVariables } from "../configs";
import bcrypt from "bcryptjs";
import { tokenEncode, verifyToken, HttpError } from "../utils";
import { Account, Admin, Permission, UserPer } from "../models";
import mongo from "mongoose";

const { key_admin } = envVariables;
/*
 * @private
 */
const registerAdmin = async (req, res, next) => {
    const { userName, password, keyAdmin } = req.body;
    if (keyAdmin != key_admin) throw new HttpError("Failed", 400);

    if (!userName || !password)
        throw new HttpError("userName or password is empty", 400);

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
        if (!account)
            throw new HttpError("userName or password is incorrect", 400);
        const match = await bcrypt.compare(password, account.password);
        if (!match)
            throw new HttpError("userName or password is incorrect", 400);
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
           "mods": [
                {
                    "_id": "6059bff02008520c0cbfb980",
                    "userName": "mod2",
                    "createdAt": "2021-03-23T10:16:16.974Z"
                },
                {
                    "_id": "605a12b88191d91d28754860",
                    "userName": "mod3",
                    "createdAt": "2021-03-23T16:09:28.381Z"
                }
            ]
        }
orExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "No token, authorization denied"
 *     }
 */
const getMods = async (req, res, next) => {
    try {
        const mods = await Admin.find(
            { role: "moderator" },
            { role: 0, password: 0, __v: 0, updatedAt: 0 }
        );
        res.status(200).json({
            status: 200,
            msg: "Success",
            mods,
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
        if (!mongo.Types.ObjectId.isValid(id))
            throw new HttpError("id is incorrect", 400);
        const mod = await Admin.findById({ _id: id });
        if (!mod) throw new HttpError("mod not found", 404);
        if (mod.role == "admin")
            throw new HttpError("Cant delete admin account", 401);
        await Admin.findByIdAndDelete({ _id: id });
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
