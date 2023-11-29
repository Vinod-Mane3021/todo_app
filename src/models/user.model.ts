import mongoose, { Schema } from "mongoose";

// Define the interface representing a user document in MongoDB
interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    fullName: string,
    refreshToken: string
}

// Define the Mongoose schema for the User model
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // Enable indexing for efficient searching
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            require: [true, "Password is required"],
        },
        fullName: {
            type: String,
            require: true,
            trim: true,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

// Create the User model using the defined schema
export const UserModel = mongoose.model<IUser>("User", userSchema);



