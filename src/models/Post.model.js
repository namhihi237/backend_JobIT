import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
	{
		accountId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
			require: true,
		},
		companyId: {
			type: Schema.Types.ObjectId,
			ref: 'company',
			require: true,
		},
		title: {
			type: String,
		},
		name: {
			type: String,
		},
		skill: [{ type: String, default: [] }],
		address: {
			type: String,
		},

		salary: {
			type: String,
		},
		apply: [
			{
				iterId: {
					type: Schema.Types.ObjectId,
					ref: 'account',
				},
				cvId: {
					type: Schema.Types.ObjectId,
					ref: 'cv',
				},
				name: { type: String },
				email: { type: String },
				status: {
					type: String,
					enum: ['pending', 'agreed', 'rejected'],
					default: 'pending',
				},
				timeApply: {
					type: Date,
					default: new Date(),
				},
			},
		],
		endTime: {
			type: String,
		},
		description: {
			type: String,
		},
		status: {
			type: String,
			default: 'WAITING',
			enum: ['WAITING', 'ACCEPTED', 'DONE'],
		},
	},
	{ timestamps: true },
);
PostSchema.index({
	name: 'text',
	description: 'text',
	title: 'text',
	skill: 'text',
	address: 'text',
});
export const Post = model('post', PostSchema, 'post');
