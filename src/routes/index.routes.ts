import express, { Router } from 'express'
import userRouter from "./user.routes";
import todoRouter from './todo.routes';

const router = Router()

const combineRoutes = (): Router => {
    userRouter(router)
    todoRouter(router)
    return router;
}

export default combineRoutes;

