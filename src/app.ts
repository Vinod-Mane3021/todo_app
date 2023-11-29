import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { requestDataLimit } from './constants/constants';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// set the limit for request data coming from client
app.use(express.json({ limit: requestDataLimit }))
app.use(express.urlencoded({ extended: true, limit: requestDataLimit }))
app.use(express.static("public"))
app.use(cookieParser())



import userRouter from './routes/user.routes';

app.use('/api/v1/user', userRouter)

export default app;