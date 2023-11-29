import connectDB from "./config/database.config";
import app from "./app";

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    })
    app.on('error', (error) => {
        console.error("Error : ", error);
        throw error
    })
})
.catch((error) => {
    console.error("MONGO db connection failed! ", error);
    throw error;
})