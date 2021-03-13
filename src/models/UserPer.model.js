import { Schema, model } from "mongoose";
const userPerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        permissions: [{ actionCode: { type: String }, check: { type: Boolean } }],
    },
    { timestamps: true }
);

export const UserPer = model("userPer", userPerSchema, "userPer");
