import { Schema, model } from "mongoose";

const codeSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
        },
        email: {
            type: String,
            required: true,
        },
        roleName: {
            type: String,
        },
        expireAt: {
            type: Date,
            default: Date.now,
            createIndexes: { expires: "5m" },
        },
    },
    { timestamps: true }
);

export const Code = model("code", codeSchema, "code");
