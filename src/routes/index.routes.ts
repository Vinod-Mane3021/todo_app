import express, { Router } from 'express'
import userRouter from "./user.routes";

const router = Router()

const combineRoutes = (): Router => {
    userRouter(router)
    return router;
}

export default combineRoutes;

