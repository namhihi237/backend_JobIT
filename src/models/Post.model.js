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
		skill: [
			{
				type: String,
			},
		],
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
		comment: [{ type: String, default: [] }],
		accept: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: true,
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
