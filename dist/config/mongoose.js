import mongoose from "mongoose";
import { logError, logInfo } from "../utils/debug.js";
// Connect to MongoDB
const connectDB = async () => {
    const nodeEnv = process.env.NODE_ENV;
    const mongoHost = process.env.MONGO_HOST;
    const mongoPort = process.env.MONGO_PORT;
    const mongoUri = process.env.MONGO_URI;
    const finalURI = nodeEnv === "dev" && mongoHost && mongoPort
        ? `mongodb://${mongoHost}:${mongoPort}`
        : mongoUri;
    logInfo(`Attempting connection with URI: ${finalURI}`);
    try {
        if (!finalURI) {
            throw new Error("MONGO_URI is missing or undefined in environment variables!");
        }
        await mongoose.connect(finalURI);
        logInfo("== Connected to MongoDB ==");
    }
    catch (error) {
        logError(`== MongoDB connection error: ${error.message}`);
    }
};
export default connectDB;
//# sourceMappingURL=mongoose.js.map