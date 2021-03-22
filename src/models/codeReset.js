import { Schema, model } from "mongoose";

const codeSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        email: {
            type: String,
            required: true,
        },

        expireAt: {
            type: Date,
            default: Date.now,
            createIndexes: { expires: "30m" },
        },
    },
    { timestamps: true }
);

export const Code = model("code", codeSchema, "code");
