import { Schema, model } from "mongoose";

const AccountSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Account = model("account", AccountSchema, "account");
