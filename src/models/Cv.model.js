import { Schema, model } from "mongoose";

const CvSchema = new Schema(
    {
        iterId: {
            type: Schema.Types.ObjectId,
            ref: "iter",
            required: true,
        },
        iterName: {
            type: String,
            required: true,
        },
        linkGit: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        skill: [{ type: String }],
        personalSkill: {
            type: String,
        },
        education: { type: String },
        experience: { type: String },
        description: {
            type: String,
        },
        receiveMail: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Cv = model("cv", CvSchema, "cv");
