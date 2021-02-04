import { Schema, model } from "mongoose";

const AdminSchema = new Schema(
    {
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
            default: "admin",
        },
    },
    { timestamps: true }
);

export const Admin = model("admin", AdminSchema, "admin");
