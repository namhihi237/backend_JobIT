import { ITer, Company, Code, Account, UserPer, Permission } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode, sendEmail, generate } from "../utils";

/**
 * @api {post} /api/v1/auth/register-iter register iter
 * @apiName Register Iter
 * @apiGroup Auth
 * @apiParam {String} email email's  iter account
 * @apiParam {String} password password's iter account
 * @apiParam {String} fullName full name's iter
 * @apiSuccess {String} msg <code>Sign up success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Sign up success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "password length must be at least 6 characters long"
 *     }
 */

const registerIter = async (req, res, next) => {
    let { password, email, fullName } = req.body;
    email = email.toLowerCase();
    try {
        const user = await Account.findOne({ email });
        if (user) {
            throw new HttpError("The email has already been used by another account", 400);
        }
        const hash = await bcrypt.hash(password, 12);
        if (!hash) {
            throw new HttpError("Error, please try again", 400);
        }
        let acc = await Account.create({ email, password: hash, role: "iter" });
        let permissions = await Permission.find({ role: "iter", check: true });
        permissions = permissions.map((e) => {
            return { actionCode: e.actionCode, check: e.check };
        });
        await Promise.all([
            ITer.create({ fullName, accountId: acc._id, email }),
            UserPer.create({ userId: acc._id, permissions }),
        ]);
        res.status(200).json({
            status: 200,
            msg: "Sign up success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/auth/register-company register company
 * @apiName Register company
 * @apiGroup Auth
 * @apiParam {String} email email's  company account
 * @apiParam {String} password password's company account
 * @apiParam {String} companyName name's company
 * @apiSuccess {String} msg <code>Sign up success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Sign up success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "password length must be at least 6 characters long"
 *     }
 */
const registerCompany = async (req, res, next) => {
    let { password, email, companyName } = req.body;
    email = email.toLowerCase();
    try {
        const user = await Account.findOne({ email });
        if (user) {
            throw new HttpError("The email has already been used by another account", 400);
        }
        const hash = await bcrypt.hash(password, 12);
        if (!hash) {
            throw new HttpError("Error, please try again", 400);
        }
        let acc = await Account.create({ email, password: hash, role: "company" });
        let permissions = await Permission.find({ role: "company", check: true });
        permissions = permissions.map((e) => {
            return { actionCode: e.actionCode, check: e.check };
        });

        await Promise.all([
            Company.create({ companyName, accountId: acc._id, email }),
            UserPer.create({ userId: acc._id, permissions }),
        ]);

        res.status(200).json({
            status: 200,
            msg: "Sign up success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/auth/login login user
 * @apiName Login user
 * @apiGroup Auth
 * @apiParam {String} email email's  account
 * @apiParam {String} password password's account
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *         role : "iter"
 *         token : "xxx.xxx.xxx"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "Email or password is incorrect"
 *     }
 */
const login = async (req, res, next) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    try {
        const user = await Account.findOne({ email });
        if (!user) throw new HttpError("Email or password is incorrect", 400);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new HttpError("Email or password is incorrect", 400);

        let data = {
            email: user.email,
            _id: user._id,
            role: user.role,
        };
        const token = tokenEncode(data);

        res.status(200).json({
            status: 200,
            msg: "Success",
            role: data.role,
            token,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/auth/update-password update password
 * @apiName Update password
 * @apiGroup Auth
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {String} password current password's  account
 * @apiParam {String} newPassword new password's account
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "password is incorrect"
 *     }
 */
const updatePassword = async (req, res, next) => {
    const { password, newPassword } = req.body;
    const { _id } = req.user;
    try {
        let user = await Account.findOne({ _id });
        if (!user) throw new HttpError("User not found", 400);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new HttpError("password is incorrect", 400);

        const hash = await bcrypt.hash(newPassword, 12);

        await Account.findByIdAndUpdate({ _id }, { password: hash });

        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/auth/reset-password reset password
 * @apiName Reset password
 * @apiGroup Auth
 * @apiParam {String} email  email of account need reset password
 * @apiSuccess {Number} status <code>200</code> if everything went fine.
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "We sent code to your email, the code only lasts for 5 minutes"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "Email does not exist in the system"
 *     }
 */
const requestResetPassword = async (req, res, next) => {
    let { email } = req.body;
    try {
        email = email.toLowerCase();
        const user = await Account.findOne({ email });
        if (!user) throw new HttpError("Email does not exist in the system", 400);
        const code = generate();
        await sendEmail(code, email);
        await Promise.all([
            Code.findOneAndRemove({ email }),
            Code.create({ email, code, accountId: user._id }),
        ]);
        res.status(200).json({
            status: 200,
            msg: "We sent code to your email, the code only lasts for 5 minutes",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/auth/confirm-code confirm code reset password
 * @apiName confỉrm code reset password
 * @apiGroup Auth
 * @apiParam {String} email  email of account need reset password
 * @apiParam {String} code  code in your email
 * @apiSuccess {Number} status <code>200</code> if everything went fine.
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "Your code is incorrect"
 *     }
 */
const confirmCode = async (req, res, next) => {
    let { email, code } = req.body;
    try {
        email = email.toLowerCase();
        const existCode = await Code.findOne({ email, code });
        if (!existCode) throw new HttpError("Your code is incorrect", 400);
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/auth/change-password change password reset
 * @apiName change password
 * @apiGroup Auth
 * @apiParam {String} email  email of account need reset password
 * @apiParam {String} code  code in your email
 * @apiParam {String} password  new password need update
 * @apiSuccess {Number} status <code>200</code> if everything went fine.
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Password has updated"
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400
 *     {
 *       "status" : 400,
 *       "msg": "Fail"
 *     }
 */
const changePasswordReset = async (req, res, next) => {
    let { email, code, password } = req.body;
    try {
        email = email.toLowerCase();
        const existCode = await Code.findOne({ email, code });
        if (!existCode) throw new HttpError("Fail", 400);
        const hash = await bcrypt.hash(password, 12);
        await Promise.all([
            Account.findByIdAndUpdate({ _id: existCode.accountId }, { password: hash }),
            Code.findByIdAndDelete({ _id: existCode._id }),
        ]);
        res.status(200).json({
            status: 200,
            msg: "Password has updated",
        });
    } catch (error) {
        next(error);
    }
};

export const authController = {
    registerIter,
    registerCompany,
    login,
    updatePassword,
    requestResetPassword,
    confirmCode,
    changePasswordReset,
};
