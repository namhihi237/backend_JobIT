import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "account",
        },
        content: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Feedback = model("feedback", feedbackSchema, "feedback");
