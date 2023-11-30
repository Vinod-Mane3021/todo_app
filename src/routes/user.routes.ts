import { login, register } from '../controllers/user.controller';
import express, { Router } from 'express';


const userRouter = (router: Router) => {
    router.post("/user/register", register)
    router.get("/user/login", login)
}

export default userRouter;


