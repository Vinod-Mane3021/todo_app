import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import ApiResponse from "../utils/ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";

// Define the interface representing a user document in MongoDB
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  fullName: string;
  refreshToken: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
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
      trim: true,
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
    timestamps: true,
  }
);

/**
 * scrypt user password before saving into database
 * @param next - next function
 */
userSchema.pre("save", async function (next: NextFunction) {
  try {
    if (!this.isModified("password")) {
      return;
    }
    // hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.error(`Failed to hash password: ${error.message}`)
    // Throw an ApiResponse if password hashing fails
    throw new ApiResponse(
        HttpStatusCode.INTERNAL_SERVER_ERROR, 
        "INTERNAL_SERVER_ERROR", 
        `Failed to hash password : ${error.message}`
    )
  }
});

/**
 * compare the user request password with encrypted password
 * @param {string} password - user passed from request
 * @returns {Promise<boolean>} - true if request password is equals to encrypted password
 */
userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

/**
 * Generates an access token for the user
 * @returns {string} - A promise that resolves to the generated access token.
 * @throws {ApiResponse} - If token generation fails.
 */
userSchema.methods.generateAccessToken = async function (): Promise<string> {
  try {
    // Create jwt token using user information and the secrete key
    const accessToken = jwt.sign(
          {
          _id: this._id,
          username: this.username,
          email: this.email,
          fullName: this.fullName,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
      );
      return accessToken;
  } catch (error) {
    console.error(`Failed to generate access token: ${error.message}`)
    // Throw an ApiResponse if token generation fails
    throw new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", `Failed to generate access token : ${error.message}`)
  }
};

/**
 * generate refresh token
 * @returns {Promise<string>} A promise that resolves to the generated refresh token.
 * @throws {ApiResponse} - If token generation fails.
 */
userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  try {
    // Create jwt token using user _id and the secrete key
    const refreshToken =  jwt.sign(
          {
          _id: this._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
          }
      );
      return refreshToken;
  } catch (error) {
    console.error(`Failed to generate refresh token: ${error.message}`)
    // Throw an ApiResponse if token generation fails
    throw new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", `Failed to generate refresh token : ${error.message}`)
  }
};

// Create the User model using the defined schema
export const UserModel = mongoose.model<IUser>("User", userSchema);
