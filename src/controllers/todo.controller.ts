import HttpStatusCode from "../constants/HttpStatusCodes";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from 'express'
import { findUserByRefreshToken, findUserByUsername } from "../services/user.service";
import { createNewTodo, findTodoListByUserID } from "../services/todo.service";
import { RequestProps } from "../middlewares/user.middlewares";

/**
 * Controller to creating new todo
 * This controllers handles HTTP request to create new todo
 * and handles asynchronous errors
 */
const createTodo = asyncHandler(
    /**
     * asynchronous function to create a new todo for specific user
     * @param {Request} req - express request object containing the request params and body
     * @param {Response} res - express response object used to send HTTP response to client
     * @returns - HTTP response indicating success or failure of the todo creation
     */
    async (req: Request, res: Response) => {
        // Extracting felids from the params and body 
        const { username } = req.params
        const { title, description } = req.body;

        // Validating required felids
        if (!username || !title || !description) {
            return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "All fiends must required").sendResponse(res);
        }

        // finding user by username in the database
        const user = await findUserByUsername(username)
        // Checking if the user exits
        if (!user) {
            return new ApiResponse(HttpStatusCode.UNAUTHORIZED, "UNAUTHORIZED", "user not found").sendResponse(res)
        }

        // Creating a new todo
        const todo = await createNewTodo(title, description, "Pending", user._id)

        // Checking if the todo ser is created
        if(!todo) {
            return new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "todo not created").sendResponse(res);
        }
        // Sending success response with created todo
        return new ApiResponse(HttpStatusCode.CREATED, "CREATED", "todo created successfully", todo).sendResponse(res);
    }
)

const getTodoByUser = asyncHandler(
    async (req: RequestProps, res: Response) => {

        const userID = req.userID;

        const todos = await findTodoListByUserID(userID)

        if(!todos) {
            return new ApiResponse(HttpStatusCode.NOT_FOUND, "NOT_FOUND", "No todos found for the specified user").sendResponse(res)
        }

        // const todoString = JSON.stringify(todos, (key, value) => {
        //     if (key === 'someCircularReferenceProperty') {
        //         return '[Circular Reference]';
        //     }
        //     return value;
        // })

        return new ApiResponse(HttpStatusCode.OK, "SUCCESS", "Todos found successfully", todos).sendResponse(res)
    }    
) 




export { createTodo, getTodoByUser }






