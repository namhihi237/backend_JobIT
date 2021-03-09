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
            default: "company",
        },
    },
    { timestamps: true }
);

export const Company = model("company", CompanySchema, "company");
