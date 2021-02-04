import { ITer, Company, Role } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode } from "../utils";

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
 * @apiParam {String} nameCompany full name's company
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
    let { password, email, role, address, nameCompany } = req.body;
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
            nameCompany,
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

export const authController = { registerIter, registerCompany, login };
