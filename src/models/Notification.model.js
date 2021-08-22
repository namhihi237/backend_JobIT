import { Schema, model } from 'mongoose';
import constant from '../constant';
const TYPE = constant.NOTIFICATIONS_TYPE;
export const notificationSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		content: {
			type: String,
		},
		title: {
			type: String,
		},
		type: {
			type: String,
			enum: [TYPE.SYSTEM, TYPE.POST],
		},
		postId: {
			type: String,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true },
);

export const Notification = model('notification', notificationSchema, 'notification');
