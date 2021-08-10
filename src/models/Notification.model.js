import { Schema, model } from 'mongoose';

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
	},
	{ timestamps: true },
);

export const Notification = model('notification', notificationSchema, 'notification');
