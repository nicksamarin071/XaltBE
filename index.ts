// Internal Dependencies
import express, { type Application } from "express";
import cors from "cors";


// External Dependencies
import allRoutes from "./routes/index.js";
import errorHandler from "./middlewares/response/errorHandler.js";
import { logInfo } from "./utils/debug.js";
import connectDB from "./config/mongoose.js";
import { setJWTVariable } from "./config/setvariables.js";
import {  userAuthenticate } from "./middlewares/request/userAuthoriser.js";


const app: Application = express();
const PORT: Number = 5500;

// Connect to Mongo DB
await connectDB();

// Add jwt variables from environment
await setJWTVariable();

// Allow cors
app.use(cors());

// Allow app to use json
app.use(express.json());

// Log http requests

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
