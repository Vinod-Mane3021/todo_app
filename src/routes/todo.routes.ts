import { createTodo } from "../controllers/todo.controller";
import { Router } from "express";


const todoRouter = (router: Router) => {
    router.post("/todo/:username", createTodo)
}

export default todoRouter;