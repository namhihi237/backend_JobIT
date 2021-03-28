import { Account, Admin, Permission, UserPer } from "../models";
import mongo from "mongoose";

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
 *     HTTP/1.1 401
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
 *     HTTP/1.1 401
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
        const permissions = await UserPer.find(
            { userId: id },
            { createdAt: 0, __v: 0, updatedAt: 0 }
        );
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
 *     HTTP/1.1 401
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
                { _id: e._id, check: !e.check },
                { check: e.check } // check thay doi state moi doi
            );
        });
        const [...changed] = await Promise.all(updatePer);
        // console.log(...changed);
        let usersRole = [];
        if (role != "moderator")
            usersRole = await Account.find({ role }, { password: 0 });
        else usersRole = await Admin.find({ role }, { password: 0 });
        // no apply
        if (apply === false) {
            let addUserPers = [];
            for (let item of changed) {
                if (item) {
                    if (item.check == false) {
                        // flase => true
                        // add permission
                        let addUserPer = usersRole.map((e) => {
                            return UserPer.create({
                                userId: e._id,
                                perId: item._id,
                                perName: item.perName,
                                actionCode: item.actionCode,
                                check: false, // no apply
                            });
                        });
                        addUserPers = [...addUserPers, ...addUserPer];
                    } else {
                        // remove permission
                        // xoa user per neu false. true => false
                        let userPerDels = await UserPer.find(
                            {
                                perId: item._id,
                            },
                            { _id: 1 }
                        );
                        // console.log(userPerDels);
                        userPerDels = userPerDels.map((e) =>
                            UserPer.findByIdAndDelete({ _id: e._id })
                        );
                        addUserPers = [...addUserPers, ...userPerDels];
                    }
                }
            }
            await Promise.all(addUserPers);
        } else {
            let addUserPers = [];
            for (let item of changed) {
                if (item) {
                    if (item.check == false) {
                        // flase => true
                        // add permission
                        let addUserPer = usersRole.map((e) => {
                            return UserPer.create({
                                userId: e._id,
                                perId: item._id,
                                perName: item.perName,
                                actionCode: item.actionCode,
                                check: true, // no apply
                            });
                        });
                        addUserPers = [...addUserPers, ...addUserPer];
                    } else {
                        // remove permission
                        // xoa user per neu false. true => false
                        let userPerDels = await UserPer.find(
                            {
                                perId: item._id,
                            },
                            { _id: 1 }
                        );
                        // console.log(userPerDels);
                        userPerDels = userPerDels.map((e) =>
                            UserPer.findByIdAndDelete({ _id: e._id })
                        );
                        addUserPers = [...addUserPers, ...userPerDels];
                    }
                }
            }
            await Promise.all(addUserPers);
        }

        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * @api {put} /api/v1/user/:id/permissions update user permissions 
 * @apiName update user permissions 
 * @apiGroup Admin
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiParam {array} permissions permissions's user
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
        }
orExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "No token, authorization denied"
 *     }
 */

const updateUserPermission = async (req, res, next) => {
    const { id } = req.params; // id user
    const { permissions } = req.body;
    try {
        const newPermission = permissions.map((e) => {
            return UserPer.findOneAndUpdate(
                { userId: id, _id: e._id, check: !e.check },
                { check: e.check }
            );
        });
        await Promise.all(newPermission);
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        next(error);
    }
};

export const permissionController = {
    getPermissions,
    getUserPermission,
    updatePermission,
    updateUserPermission,
};
