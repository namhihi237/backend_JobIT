import { Schema, model } from "mongoose";

const permissionSchema = new Schema(
    {
        role: {
            type: String,
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

export const Permission = model("permission", permissionSchema, "permission");
