import { NotificationService } from '../services';

const notificationService = new NotificationService();

/**
 * @api {get} /api/v1/notifications  get notifications
 * @apiName get notifications
 * @apiGroup Notification
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 *@apiSampleRequest .../api/v1/notifications?page=1&take=10
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success"
 * data : {
        "currentPage": 1,
        "numPages": 4,
        "notifications": [
                {
                    "_id": "6113817877a68f477c7dd873",
                    "userId": "61123eb11b85e832a85d4fd9",
                    "title": "Response apply post Fullstack Dev (Java, JavaScript)",
                    "type": "POST",
                    "postId": "61123e461b85e832a85d4fd8",
                    "content": "FPT agree your apply, please wait an email to confirm",
                    "createdAt": "2021-08-11T07:51:20.870Z"
                },
                {
                     "_id": "6113817877a68f477c7dd873",
                    "userId": "61123eb11b85e832a85d4fd9",
                    "title": "Response apply post Fullstack Dev (Java, JavaScript)",
                    "type": "POST",
                    "postId": "61123e461b85e832a85d4fd8",
                    "content": "FPT agree your apply, please wait an email to confirm",
                    "createdAt": "2021-08-11T07:51:20.870Z"
                }
            ]
        }
 *    }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "No token, authorization denied"
 *     }
 */
const notifications = async (req, res, next) => {
	try {
		const { page, take } = req.query;
		const data = await notificationService.getNotifications(req.user._id, page, take);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			data,
		});
	} catch (error) {
		next(error);
	}
};
const numberOfNotifications = async (req, res, next) => {
	try {
		const numberOfNotifications = await notificationService.getNumberOfNotifications(req.user._id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
			numberOfNotifications,
		});
	} catch (error) {
		next(error);
	}
};

const reset = async (req, res, next) => {
	try {
		await notificationService.reset(req.user._id);
		res.status(200).json({
			status: 200,
			msg: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

export const notificationController = {
	notifications,
	numberOfNotifications,
	reset,
};
