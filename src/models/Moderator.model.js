import { Schema, model } from "mongoose";

const ModeratorSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        roleId: {
            type: Schema.Types.ObjectId,
            ref: "role",
            required: true,
        },
        role: {
            type: String,
            default: "iter",
        },
    },
    { timestamps: true }
);

export const Moderator = model("moderator", ModeratorSchema, "moderator");
