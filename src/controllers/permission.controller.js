import mongo from "mongoose";
import { PermissionService } from "../services";
const permissionService = new PermissionService();
/**
 * @api {get} /api/v1/permissions get permissions
 * @apiName Get permissions
 * @apiGroup Admin
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiExample {bash} Curl example
 * curl -X GET -H "Authorization: token 5f048fe" -i https://api.example.com/api/v1/permissions?role=iter
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
        let permissions = await permissionService.getPermissions(role);
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
        const permissions = await permissionService.getUserPermission(id);
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
 * @apiParam {Boolean} apply 
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
        await permissionService.updatePermisson(permissions, role, apply);
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
 * @api {put} /api/v1/users/:id/permissions update user permissions 
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
        await permissionService.updateUserPermisson(id, permissions);
        res.status(200).json({
            status: 200,
            msg: "Success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const permissionController = {
    getPermissions,
    getUserPermission,
    updatePermission,
    updateUserPermission,
};
