// Internal Dependencies
import dotenv from "dotenv";
dotenv.config();
import express, {} from "express";
import cors from "cors";
import path from "path";
// External Dependencies
import allRoutes from "./routes/index.js";
import errorHandler from "./middlewares/response/errorHandler.js";
import { logInfo } from "./utils/debug.js";
import connectDB from "./config/mongoose.js";
import { setJWTVariable } from "./config/setvariables.js";
import { userAuthenticate } from "./middlewares/request/userAuthoriser.js";
const app = express();
const PORT = 5500;
// Connect to Mongo DB
await connectDB();
// Add jwt variables from environment
await setJWTVariable();
// Allow cors
app.use(cors());
// Allow app to use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Log http requests
// use only save images locally in uploads folder
// app.use(
//   "/uploads",
//   express.static(
//     path.join(process.cwd(), "uploads")
//   )
// );
app.use("/public", express.static(path.join(process.cwd(), "public")));
// Middleware to Authenticate User
app.use(userAuthenticate);
// Allow all Routes
app.use("/", allRoutes);
// Global Error Handler
app.use(errorHandler);
// Server Connection
app.listen(PORT, () => {
    logInfo("== Server running on Port ==", PORT);
});
//# sourceMappingURL=index.js.map