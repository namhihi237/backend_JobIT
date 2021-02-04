import { Schema, model } from "mongoose";

const ITerSchema = new Schema(
    {
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        birthday: {
            type: String,
        },
        image: {
            type: String,
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
        receiveMailJob: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const ITer = model("iter", ITerSchema, "iter");
