import { Schema, model } from 'mongoose';

const CompanySchema = new Schema(
	{
		accountId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
		},
		image: {
			type: String,
		},
		rate: {
			type: Number,
		},
		phone: {
			type: String,
		},
		address: {
			type: String,
		},
		recruitingPost: {
			type: Number,
			default: 0,
		},
		numberOfFollowers: {
			type: Number,
			default: 0,
		},
		numberOfNotifications: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);
CompanySchema.index({
	name: 'text',
});
export const Company = model('company', CompanySchema, 'company');
