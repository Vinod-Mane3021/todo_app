import { validateUser } from "../middlewares/user.middlewares";
import { createTodo, getTodoByUser } from "../controllers/todo.controller";
import { Router } from "express";


const todoRouter = (router: Router) => {
    router.post("/todo/:username", createTodo)
    router.get("/todo", validateUser, getTodoByUser)
}

export default todoRouter;