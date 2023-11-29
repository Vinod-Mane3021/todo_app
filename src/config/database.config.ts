import { DB_NAME } from "../constants/constants";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const DB_URL = process.env.MONGODB_URL;
      const response = await mongoose.connect(`${DB_URL}/${DB_NAME}`)
      mongoose.connection.on('connected', () => {
          console.log('💡 Database connected successfully');
      })

      if (response.connection.readyState === 1) {
        console.log(`✔️  MongoDB connected successfully | DB_NAME: ${response.connection.name} | HOST: ${response.connection.host} | MONGODB_URL: ${DB_URL}`);
      }
      mongoose.connection.on('error', (err) => {
          console.error('Error connecting to database:', err);
      })
      mongoose.connection.on('disconnected', () => {
          console.log('Database disconnected');
      })
      return response;
    } catch (error) {
      console.error("Got error while connecting to database");
      throw error;
    }
  };

  export default connectDB;
  

