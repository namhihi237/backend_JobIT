import { Schema, model } from 'mongoose';

const SavedPostSchema = new Schema(
	{
		iterId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
			required: true,
		},
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'post',
			required: true,
		},
	},
	{ timestamps: true },
);

export const SavedPost = model('savedPost', SavedPostSchema, 'savedPost');
