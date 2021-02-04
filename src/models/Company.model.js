import { Schema, model } from "mongoose";

const CompanySchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        logo: {
            type: String,
        },
        rate: {
            type: Number,
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
    },
    { timestamps: true }
);

export const Company = model("company", CompanySchema, "company");
