import { Schema, ObjectId,Types } from "mongoose";
import { todoModel } from "../models/todo.model";

/**
 * Creates a new todo
 * @param {string} title - title of the todo
 * @param {string} description - description of the todo
 * @param {string} status - status of the todo (either 'Pending', 'InProgress', or 'Completed').
 * @param {string} userId - the unique identifier of the user associated with todo
 * @returns - A promise that resolves to the created todo
 */
const createNewTodo = (
  title: string,
  description: string,
  status: string,
  userId: Types.ObjectId
) => {
  return todoModel.create({
    title: title,
    description: description,
    status: status,
    userId: userId,
  });
};

const findTodoListByUserID = (id: Types.ObjectId) => {
  return todoModel.find({ userId: id })
}


export { createNewTodo, findTodoListByUserID }






/**
 * find all todos based of user
 * @param {string} userId - user id
 * @returns - list of todos associated with userId
 */
const findTodosByUser = (userId: string) => {
    return todoModel.find({ userId: userId })
}