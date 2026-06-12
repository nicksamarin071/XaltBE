import mongoose from "mongoose";
import { MONGO_DB, MONGO_HOST, MONGO_PORT, NODE_ENV, MONGO_URI } from "../utils/constants.js";
import { logError, logInfo } from "../utils/debug.js";
// MongoDB connection URI
const mongoURI = (NODE_ENV === "dev" && MONGO_HOST && MONGO_PORT)
    ? `mongodb://${MONGO_HOST}:${MONGO_PORT}`
    : MONGO_URI;
// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        logInfo("== Connected to MongoDB ==");
    }
    catch (error) {
        logError(`== MongoDB connection error ${error.message}`);
    }
};
export default connectDB;
//# sourceMappingURL=mongoose.js.map