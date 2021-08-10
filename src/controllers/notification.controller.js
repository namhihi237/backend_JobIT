import { NotificationService } from '../services';

const notificationService = new NotificationService();

/**
 * @api {get} /api/v1/notifications  get notifications
 * @apiName get notifications
 * @apiGroup Notification
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
            "notifications": [
                {
                    "_id": "611241d2d9a9613bf4c16ac6",
                    "userId": "61123eb11b85e832a85d4fd9",
                    "title": "Response apply post Fullstack Dev (Java, JavaScript)",
                    "content": "YOu have accept",
                    "createdAt": "2021-08-10T09:07:30.591Z",
                },
                {
                    "_id": "611242b54bc0693714ed1d4e",
                    "userId": "61123eb11b85e832a85d4fd9",
                    "title": "Response apply post Fullstack Dev (Java, JavaScript)",
                    "content": "YOu have accept",
                    "createdAt": "2021-08-10T09:11:17.381Z",
                }
            ]
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "No token, authorization denied"
 *     }
 */
const notifications = async (req, res, next) => {
	try {
		const notifications = await notificationService.getNotifications(req.user._id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			notifications,
		});
	} catch (error) {
		next(error);
	}
};

export const notificationController = {
	notifications,
};
