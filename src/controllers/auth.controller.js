import { ITer, Company, Role, Code } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode, sendEmail, generate } from "../utils";

/**
 * @api {post} /api/v1/auth/register-iter register iter
 * @apiName Register Iter
 * @apiGroup Auth
 * @apiParam {String} email email's  iter account
 * @apiParam {String} password password's iter account
 * @apiParam {String} fullName full name's iter
 * @apiParam {String} gender gender's iter
 * @apiParam {String} birthday birthday's iter
 * @apiParam {String} role role's iter requre "iter"
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
 *       "msg": "\"birthday\" is required, \"role\" is required"
 *     }
 */
const registerIter = async (req, res, next) => {
    let { password, email, role, gender, birthday, fullName } = req.body;
    email = email.toLowerCase();
    try {
        const [_com, _it] = await Promise.all([
            Company.findOne({ email }),
            ITer.findOne({ email }),
        ]);

        if (_com || _it) {
            throw new HttpError("The email has already been used by another account", 400);
        }
        const hash = await bcrypt.hash(password, 12);
        if (!hash) {
            throw new HttpError("Error, please try again", 400);
        }
        const _role = await Role.findOne({ roleName: role });
        if (!_role) {
            throw new HttpError("Error, please try again", 400);
        }
        await ITer.create({ email, password: hash, fullName, gender, birthday, roleId: _role._id });
        res.status(200).json({
            status: 200,
            msg: "Sign up success",
        });
    } catch (error) {
        console.log(error);
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
 * @apiParam {String} address address's company
 * @apiParam {String} role role's company requre "company"
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
 *       "msg": "\"role\" is required"
 *     }
 */
const registerCompany = async (req, res, next) => {
    let { password, email, role, address, companyName } = req.body;
    email = email.toLowerCase();
    try {
        const [_com, _it] = await Promise.all([
            Company.findOne({ email }),
            ITer.findOne({ email }),
        ]);

        if (_com || _it) {
            throw new HttpError("The email has already been used by another account", 400);
        }
        const hash = await bcrypt.hash(password, 12);
        if (!hash) {
            throw new HttpError("Error, please try again", 400);
        }
        const _role = await Role.findOne({ roleName: role });
        if (!_role) {
            throw new HttpError("Error, please try again", 400);
        }
        await Company.create({
            email,
            password: hash,
            address,
            companyName,
            roleId: _role._id,
        });
        res.status(200).json({
            status: 200,
            msg: "Sign up success",
        });
    } catch (error) {
        console.log(error);
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
        const [iter, company] = await Promise.all([
            ITer.findOne({ email }),
            Company.findOne({ email }),
        ]);
        if (!iter && !company) {
            throw new HttpError("Email or password is incorrect", 400);
        }
        let user = iter || company;
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new HttpError("Email or password is incorrect", 400);
        }

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
        console.log(error);
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
    const { _id, role } = req.user;
    try {
        let user;
        if (role === "iter") {
            user = await ITer.findById({ _id }, { password: 1 });
        }
        if (role === "company") {
            user = await Company.findById({ _id }, { password: 1 });
        }
        if (!user) {
            throw new HttpError("User not found", 400);
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new HttpError("password is incorrect", 400);
        }
        const hash = await bcrypt.hash(newPassword, 12);
        if (role === "iter") {
            await ITer.findByIdAndUpdate({ _id }, { password: hash });
        }
        if (role === "company") {
            await Company.findByIdAndUpdate({ _id }, { password: hash });
        }
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
 *         msg: "We sent code to your email, tt has a deadline of 5 minutes"
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
        const [user1, user2] = await Promise.all([
            ITer.findOne({ email }, { email: 1 }),
            Company.findOne({ email }, { email: 1, _id: 1 }),
        ]);

        if (!user1 && !user2) {
            throw new HttpError("Email does not exist in the system", 400);
        }
        const roleName = user1 ? user1.role : user2.role;
        const userId = user1 ? user1._id : user2._id;
        const code = generate();

        await sendEmail(code, email);
        await Promise.all([
            Code.findOneAndRemove({ email }),
            Code.create({ email, code, roleName, userId }),
        ]);
        res.status(200).json({
            status: 200,
            msg: "We sent code to your email, tt has a deadline of 5 minutes",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @api {post} /api/v1/auth/confirm-code confirmcode reset password
 * @apiName confrim code reset password
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
const comfirmCode = async (req, res, next) => {
    let { email, code } = req.body;
    try {
        email = email.toLowerCase();
        const existCode = await Code.findOne({ email, code });
        if (!existCode) {
            throw new HttpError("Your code is incorrect", 400);
        }
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
        if (!existCode) {
            throw new HttpError("Fail", 400);
        }
        const hash = await bcrypt.hash(password, 12);
        const role = existCode.role;

        if (role === "iter") {
            await ITer.findByIdAndUpdate({ _id: existCode.userId }, { password: hash });
        }
        if (role === "company") {
            await Company.findByIdAndUpdate({ _id: existCode.userId }, { password: hash });
        }
        await Code.findByIdAndDelete({ _id: existCode._id });
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
    comfirmCode,
    changePasswordReset,
};
