import { registerUser } from '../controllers/user.controller';
import express from 'express';

const userRouter = express.Router();

userRouter.post("/register-user", registerUser)

export default userRouter;


