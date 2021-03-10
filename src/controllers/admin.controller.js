import { envVariables } from "../configs";
import bcrypt from "bcryptjs";
import { tokenEncode, verifyToken, HttpError } from "../utils";
import { Admin, Permission, UserPer } from "../models";

const { key_admin } = envVariables;
/*
 * @private
 */
const registerAdmin = async (req, res, next) => {
    const { userName, password, keyAdmin } = req.body;
    if (keyAdmin != key_admin) throw new HttpError("Failed", 400);

    if (!userName || !password) throw new HttpError("userName or password is empty", 400);

    const hash = await bcrypt.hash(password, 12);
    if (!hash) throw new HttpError("hash password failed", 400);

    const admin = await Admin.create({ userName, password: hash, role: "admin" });
    const permissions = await Permission.find({ role: "admin", check: true });
    const actionCodes = [];
    permissions.forEach((e) => actionCodes.push(e.actionCode));
    await UserPer.create({ userId: admin._id, permissions: actionCodes });
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
        const account = Admin.findOne({ email });
        if (!account) throw new HttpError("userName or password is incorrect", 400);
        const match = await bcrypt.compare(password, account.password);
        if (!match) throw new HttpError("userName or password is incorrect", 400);
        const data = {
            userName,
            _id: user._id,
            role: user.role,
        };
        const token = tokenEncode(data);
        res.status(200).json({
            status: 200,
            msg: "Success",
            token,
            role: user.role,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/admin/create-mod create acc mod
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
        const acc = await Admin.create({ userName, password: hash, role: "moderator" });
        const permissions = await Permission.find({ role: "moderator", check: true });
        const actionCodes = [];
        permissions.forEach((e) => actionCodes.push(e.actionCode));

        await UserPer.create({ userId: acc._id, permissions: actionCodes });
        res.status(200).json({
            status: 200,
            msg: "Create mod success",
        });
    } catch (error) {
        next(error);
    }
};

export const adminController = { registerAdmin, createMod, login };
