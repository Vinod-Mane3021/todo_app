import { UserModel } from "../models/user.model";

export const findUserById = (id: string) => {
    return UserModel.findById(id)
}

export const findUserByUsername = (username: string) => {
    return UserModel.findOne({ username: username })
}

export const findUserByEmail = (email: string) => {
    return UserModel.findOne({ email: email })
}

export const findUsers = () => {
    return UserModel.find();
}

export const findUserByUsernameAndEmail = (username: string, email: string) => {
    return UserModel.findOne({ username: username, email: email })
}

export const createUser = (
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
