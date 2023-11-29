import mongoose, { Schema } from "mongoose";

interface IUser {
    username: string,
    email: string,
    password: string,
    fullName: string,
    refreshToken: string
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // to enable searching field
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

export const UserModel = mongoose.model<IUser>("User", userSchema);



