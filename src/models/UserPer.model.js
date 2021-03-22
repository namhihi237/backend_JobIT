import { Schema, model } from "mongoose";
const userPerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        per_id: {
            type: Schema.Types.ObjectId,
            ref: "permission",
        },
        perName: {
            type: String,
        },
        actionCode: {
            type: String,
        },
        check: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const UserPer = model("userPer", userPerSchema, "userPer");
