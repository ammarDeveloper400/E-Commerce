import mongoose from "mongoose";
import ENV from "./keys.js";
import print from "../utils/print.js";
import logger from "../logger/index.js";

let dbConnection;
const DB = () => {
    try {
        mongoose.set("strictQuery", false);
        // If connection already exists, return it
        if (dbConnection) {
            return dbConnection;
        }
        dbConnection = mongoose.createConnection(ENV.DATABASE.URL);

        dbConnection.on("connected", () => {
            logger.info(`MongoDB Connected...`);
        });

        dbConnection.on("error", (error) => {
            logger.error("Mongoose connection error:", error);
        });

        dbConnection.on("disconnected", () => {
            logger.warn("Mongodb disconnected...");
        });

        dbConnection.on("reconnected", () => {
            logger.warn("Mongodb reconnected successfully.");
        });
        return dbConnection;
    } catch (error) {
        print("error", `${error.message}`);
        process.exit(1);
    }
    return dbConnection;
};

export default DB;
