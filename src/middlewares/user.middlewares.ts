import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import HttpStatusCode from "../constants/HttpStatusCodes";
import ApiResponse from "../utils/ApiResponse";
import { findUserByRefreshToken } from "../services/user.service";

// Define interface that extends Request
export interface RequestProps extends Request {
  userID: Types.ObjectId;
}

interface tokeProps {
    token: string;
}

/**
 * Middleware to validating user by refresh token
 * If the token is valid then set the userId property on the request
 * @param {RequestProps} req - Object containing request params
 * @param {Response} res - Object used to send HTTP response 
 * @param {NextFunction} next - to pass control to next function
 * @returns - HTTP response if validation fails
 */
const validateUser = async (req: RequestProps, res: Response, next: NextFunction) => {
    const token = req.headers.token
    console.log(token)
    if (!token) {
        return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "Token not provided").sendResponse(res);
    }
    const user = await findUserByRefreshToken(token.toString());
    if (!user) {
        return new ApiResponse(HttpStatusCode.NOT_FOUND, "NOT_FOUND", "user not found").sendResponse(res);
    }
    req.userID = user._id;
    next();
};




// Export all the middlewares
export { validateUser };




