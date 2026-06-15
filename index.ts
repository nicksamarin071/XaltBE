import dotenv from "dotenv";
import express, { type Application } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Added to handle directory paths safely

// External Dependencies
import errorHandler from "./middlewares/response/errorHandler.js";
import { logInfo } from "./utils/debug.js";
import connectDB from "./config/mongoose.js";
import allRoutes from "./routes/index.js";
import { setJWTVariable } from "./config/setvariables.js";
import { userAuthenticate } from "./middlewares/request/userAuthoriser.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(currentDir, ".env"),
});

const app: Application = express();
const PORT: number = 5500; 

await connectDB();

// Add jwt variables from environment
await setJWTVariable();

//  MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/public",
  express.static(path.join(currentDir, "public"))
);

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