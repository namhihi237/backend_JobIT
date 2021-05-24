import { signFileUploadRequest } from '../utils';

/**
 * @api {get} /api/v1/images get payload signature cloudinary
 * @apiName get payload signature cloudinary
 * @apiGroup Image
 * @apiHeader {String} token The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: Bearer AAA.BBB.CCC"
 * @apiSuccess {Number} status <code>200</code>
 * @apiSuccess {String} msg <code>Success</code>
 * @apiSuccess {Object} payload <code>Success</code>
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         status: 200,
 *         msg: "Success",
        * "payload": {
                "signature": "d47b348722d72d392dbf92f7abeeed3a0f49c9fc",
                "timestamp": 1617872195
            }
 *     }
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401
 *     {
 *       "status" : 401,
 *       "msg": "Denny permission"
 *     }
 */

const uploadImageProfile = async (req, res, next) => {
	try {
		const payload = await signFileUploadRequest();
		res.status(200).json({
			status: 200,
			msg: 'Success',
			payload,
		});
	} catch (error) {
		next(error);
	}
};

export const imageController = {
	uploadImageProfile,
};
