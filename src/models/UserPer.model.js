import { Schema, model } from "mongoose";

const userPerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        permissions: [{ type: String }],
    },
    { timestamps: true }
);

export const UserPer = model("userPer", userPerSchema, "userPer");
