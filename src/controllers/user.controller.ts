import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  findUserByUsernameAndEmail,
  findUsers,
  findUserByRefreshToken
} from "../services/user.service";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";
import asyncHandler from "../utils/asyncHandler";

/**
 * Controller function for user registration.
 * @param {Request} req - Express Request object containing the incoming HTTP request.
 * @param {Response} res - Express Response object for sending the HTTP response.
 * @returns {ApiResponse} - Standardized API response.
 */
const register = asyncHandler(
  async (req: Request, res: Response) => {
    // Extracting user data from the request body
    const { username, email, password, fullName } = req.body

    // Validating required fields
    if (!username || !email || !password || !fullName) {
      return new ApiResponse(HttpStatusCode.BAD_REQUEST, "FAILED", "All felids are required").sendResponse(res)
    }

    // Checking if a user with the same email or username already exists
    const existingUser = await findUserByUsernameAndEmail(username, email);
    if (existingUser) {
      return new ApiResponse(HttpStatusCode.CONFLICT, "CONFLICT", "User with email or username already exists").sendResponse(res)
    }

    // Creating a new user
    const createdUser = await createUser(username, email, password, fullName);

    // Handling response if the user not created
    if (!createUser) {
      return new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "user is not created").sendResponse(res)
    }

    // Sending a success response with the created user data
    return new ApiResponse(HttpStatusCode.CREATED, "CREATED", "User Successfully registered", createdUser).sendResponse(res)
})

/**
 * Controller function for user login
 * @param {Request} req - Express Request object containing the incoming HTTP request.
 * @param {Response} res - Express Response object for sending the HTTP response.
 * @returns {ApiResponse} - Standardized API response.
 */
const login = asyncHandler(
  async (req: Request, res: Response) => {
    // Extracting user data from the request body
    const {username, email, password} = req.body

    // Validating required fields
    if ((!username || !password) && (!email || !password)) {
      return new ApiResponse(HttpStatusCode.BAD_REQUEST, "FAILED", "must required username, email or password").sendResponse(res)
    }
    // find the user by username and email
    let user;
    if(email && !username) {
      user = await findUserByEmail(email)
    }
    if(username && !email) {
      user = await findUserByUsername(username)
    }

    // Handling response if the user not found in database
    if (!user) {
      return new ApiResponse(HttpStatusCode.NOT_FOUND, "NOT_FOUND", "user not found").sendResponse(res)
    }

    // comparing the user request password with encrypted password
    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect) {
      return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "Incorrect password").sendResponse(res)
    }

    // generate the refresh token
    const refreshToken = await user.generateRefreshToken();
    // set refresh token for user and save
    user.refreshToken = refreshToken;
    user.save()

    // set the cookie in client
    res.cookie('token', user.refreshToken, { domain: 'localhost', path: '/' })

    return new ApiResponse(HttpStatusCode.OK, "SUCCESS", "Valid user credential", user).sendResponse(res);
  }
)

export { register, login }





