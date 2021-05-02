import { Schema, model } from 'mongoose';

const CompanySchema = new Schema(
	{
		accountId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
			required: true,
		},
		companyName: {
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
	},
	{ timestamps: true },
);

export const Company = model('company', CompanySchema, 'company');
