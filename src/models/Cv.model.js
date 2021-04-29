import { Schema, model } from 'mongoose';

const CvSchema = new Schema(
	{
		iterId: {
			type: Schema.Types.ObjectId,
			ref: 'account',
			required: true,
		},
		iterName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		skill: [{ type: String }],
		softSkill: {
			type: String,
		},
		birthday: {
			type: String,
		},
		experience: { type: String },
		description: {
			type: String,
		},
		receiveMail: {
			type: Boolean,
			default: false,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true },
);

export const Cv = model('cv', CvSchema, 'cv');
