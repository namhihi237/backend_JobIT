import { defaults } from "joi";
import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        companyId: {
            type: Schema.Types.ObjectId,
            ref: "company",
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        skill: [
            {
                type: String,
            },
        ],
        position: [
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
                    ref: "iter",
                },
                cvId: {
                    type: Schema.Types.ObjectId,
                    ref: "cv",
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
    { timestamps: true }
);

export const Post = model("post", PostSchema, "post");
