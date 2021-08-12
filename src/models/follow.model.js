import { Schema, model } from 'mongoose';

const FollowSchema = new Schema(
	{
		companyId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
			required: true,
		},
		iterId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
			required: true,
		},
	},
	{ timestamps: true },
);

export const Follow = model('follow', FollowSchema, 'follow');
