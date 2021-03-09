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
    },
    { timestamps: true }
);

export const Moderator = model("moderator", ModeratorSchema, "moderator");
