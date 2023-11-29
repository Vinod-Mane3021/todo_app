import { DB_NAME } from "../constants/constants";
import mongoose from "mongoose";

/**
 * Connect to the MongoDB database using Mongoose.
 *
 * @async
 * @function
 * @returns {Promise<mongoose>} A Promise representing the Mongoose connection.
 * @throws {Error} Throws an error if there is an issue connecting to the database.
 * 
 */
const connectDB = async () => {
    try {
      // Extract the MongoDB connection URL from the environment variables.
      const DB_URL = process.env.MONGODB_URL;
      // Attempt to connect to the database using Mongoose.
      const response = await mongoose.connect(`${DB_URL}/${DB_NAME}`)
      // Log a success message when the database connection is established.
      if (response.connection.readyState === 1) {
        console.log(`✔️  MongoDB connected successfully | DB_NAME: ${response.connection.name} | HOST: ${response.connection.host} | MONGODB_URL: ${DB_URL}`);
      }
      // Log an error message if there is an issue with the database connection.
      mongoose.connection.on('error', (err) => {
          console.error('Error connecting to database:', err);
      })
      // Log a message when the database connection is disconnected.
      mongoose.connection.on('disconnected', () => {
          console.log('Database disconnected');
      })
      // Return the mongoose response.
      return response;
    } catch (error) {
      // Log an error message and re-throw the error if there is an issue connecting to the database.
      console.error("Got error while connecting to database", error);
      throw error;
    }
  };

  export default connectDB;
  

