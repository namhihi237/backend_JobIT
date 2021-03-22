import { Schema, model } from "mongoose";
import { permissionSchema } from "./Permission.model";
const userPerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        permission: { type: permissionSchema },
    },
    { timestamps: true }
);

export const UserPer = model("userPer", userPerSchema, "userPer");
