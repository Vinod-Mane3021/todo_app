import { UserModel } from "../models/user.model";

/**
 * Finds a user by their unique identifier (ID).
 * @param id - The user's ID.
 * @returns A Promise that resolves to the found user or null if not found.
 */
const findUserById = (id: string) => {
    return UserModel.findById(id)
}

/**
 * Finds a user by their unique username.
 * @param username - The user's username.
 * @returns A Promise that resolves to the found user or null if not found.
 */
const findUserByUsername = (username: string) => {
    return UserModel.findOne({ username: username })
}

/**
 * Finds a user by their unique email address.
 * @param email - The user's email address.
 * @returns A Promise that resolves to the found user or null if not found.
 */
const findUserByEmail = (email: string) => {
    return UserModel.findOne({ email: email })
}

/**
 * Retrieves all users from the database.
 * @returns A Promise that resolves to an array of all users.
 */
const findUsers = () => {
    return UserModel.find();
}

/**
 * Finds a user by both their username and email address.
 * @param username - The user's username.
 * @param email - The user's email address.
 * @returns A Promise that resolves to the found user or null if not found.
 */
const findUserByUsernameAndEmail = (username: string, email: string) => {
    return UserModel.findOne({ username: username, email: email })
}

/**
 * Creates a new user in the database.
 * @param username - The new user's username.
 * @param email - The new user's email address.
 * @param password - The new user's password.
 * @param fullName - The new user's full name.
 * @returns A Promise that resolves to the created user.
 */
const createUser = (
    username: string,
    email: string,
    password: string,
    fullName: string,
) => {
    return UserModel.create({
        username: username,
        email: email,
        password: password,
        fullName: fullName,
    })
}

/**
 * export all the function here
 */
export { findUserById, findUserByUsername, findUserByEmail, findUsers, findUserByUsernameAndEmail, createUser };