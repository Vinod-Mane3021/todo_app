import mongoose, { Schema } from "mongoose";

interface ITodo {
    title: String,
    description: String,
    status: String,
    userId: Schema.Types.ObjectId
}

/**
 * Schema for todo
 */
const todoSchema = new Schema<ITodo>(
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

// Create the todo model using the defined schema
export const todoModel = mongoose.model("Todo", todoSchema);
