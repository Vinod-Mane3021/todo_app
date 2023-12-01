import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Pending', 'InProgress', 'Complied'],
            default: "Pending",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        }
    },
    {
        timestamps: true
    }
);
