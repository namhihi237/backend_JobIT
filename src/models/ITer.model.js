import { Schema, model } from "mongoose";

const ITerSchema = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "account",
            required: true,
        },
        fullName: {
            type: String,
        },
        email: {
            type: String,
        },
        image: {
            type: String,
        },
        receiveMailJob: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const ITer = model("iter", ITerSchema, "iter");
