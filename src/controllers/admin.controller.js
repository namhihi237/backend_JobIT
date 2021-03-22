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
    let permissions = await Permission.find({ role: "admin" });
    permissions = permissions.map((e) => {
        // return { actionCode: e.actionCode, check: e.check };
        return UserPer.create({ userId: admin._id, permission: e });
    });
    await Promise.all(permissions);
    // await UserPer.create({ userId: admin._id, permissions });
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
 * @apiGroup Mod
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
 * @api {post} /api/v1/mod create acc mod
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
            // return { actionCode: e.actionCode, check: e.check };
            return UserPer.create({ userId: acc._id, permission: e });
        });
        await Promise.all(permissions);
        await UserPer.create({
            userId: acc._id,
            permissions,
            role: "moderator",
        });
        res.status(200).json({
            status: 200,
            msg: "Create mod success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {get} /api/v1/permissions get permissions
 * @apiName Get permissions
 * @apiGroup Admin
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiExample {bash} Curl example
 * curl -X GET -H "Authorization: token 5f048fe" -i https://api.example.com/api/v1/admin/permissions?role=iter
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Create mod success</code>
 * @apiSuccess {Array} permissions
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *         permissions: [
            {
                "check": true,
                "_id": "6048a3b886af931754624be1",
                "role": "iter",
                "perName": "cancel receive email job",
                "actionCode": "CANCEL_RECEIVE_MAIL"
            },
            {
                "check": true,
                "_id": "6048a3b886af931754624bdf",
                "role": "iter",
                "perName": "create new cv",
                "actionCode": "CREATE_CV"
            },
            {
                "check": true,
                "_id": "6048a3b886af931754624be0",
                "role": "iter",
                "perName": "register receive email job",
                "actionCode": "RECEIVE_MAIL"
            }
        ]
 *
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 401,
 *       "msg": "No token, authorization denied"
 *     }
 */

const getPermissions = async (req, res, next) => {
    const role = req.query.role || "";
    try {
        console.log(role);
        let permissions;
        if (!role) permissions = await Permission.find();
        else permissions = await Permission.find({ role });
        res.status(200).json({
            status: 200,
            msg: "Success",
            permissions,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {get} /api/v1/users/:id/permissions get user permissions
 * @apiName Get user permissions
 * @apiGroup Admin
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiExample {bash} Curl example
 * curl -X GET -H "Authorization: token 5f048fe" -i https://api.example.com/api/v1/users/646dgdh/permissions
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Create mod success</code>
 * @apiSuccess {Array} permissions
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
 *         "permissions": {
        "_id": "6048d0149f2a0a2a14fdb3a8",
        "userId": "6048d0139f2a0a2a14fdb3a7",
        "permissions": [
            {
                "_id": "6048d0149f2a0a2a14fdb3a9",
                "actionCode": "CREATE_MOD",
                "check": true
            },
            {
                "_id": "6048d0149f2a0a2a14fdb3aa",
                "actionCode": "VIEW_POSTS_NEED_ACCEPT",
                "check": true
            },
            {
                "_id": "6048d0149f2a0a2a14fdb3ab",
                "actionCode": "ACCEPT_POST",
                "check": true
            }
        ],
        "createdAt": "2021-03-10T13:56:36.563Z",
        "updatedAt": "2021-03-10T13:56:36.563Z",
        "__v": 0
    }
 *
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 401,
 *       "msg": "No token, authorization denied"
 *     }
 */
const getUserPermission = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongo.Types.ObjectId.isValid(id)) {
            throw new HttpError("id is not found", 400);
        }
        const permissions = await UserPer.findOne({ userId: id });
        res.status(200).json({
            status: 200,
            msg: "Success",
            permissions,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {put} /api/v1/permissions update permissions of role
 * @apiName update permissions of role
 * @apiGroup Admin
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {array} permissions permissions's role
 * @apiParam {string} role name's role
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
        }
orExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 401,
 *       "msg": "No token, authorization denied"
 *     }
 */
const updatePermission = async (req, res, next) => {
    try {
        const { permissions, role, apply } = req.body;
        let updatePer = permissions.map((e) => {
            return Permission.findOneAndUpdate(
                { _id: e._id, check: !e.check }, // check thay doi state moi doi
                { check: e.check }
            );
        });
        // let usersRole = await Account.find({ role }, { _id });

        // let updateUserPer = usersRole.map((e) => {
        //     return UserPer.findOneAndUpdate(
        //         { userId: e._id },
        //         { permissions: newPermissions }
        //     );
        // });

        const [...changed] = await Promise.all(updatePer);
        console.log(changed);

        // const newPermissions = await Permission.find({ role, check: true });
        // newPermissions = newPermissions.map((e) => {
        //     return { actionCode: e.actionCode, check: e.check };
        // });
        // thieu
        // await Promise.all(updateUserPer);
        res.status(200).json({
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

const updateUserPermission = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
};

export const adminController = {
    registerAdmin,
    createMod,
    login,
    getPermissions,
    getUserPermission,
    updatePermission,
    updateUserPermission,
};
