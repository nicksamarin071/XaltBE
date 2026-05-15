import express, { type Application } from "express";

import commonRoutes from "./commonRoutes.js";

const app: Application = express();

app.use("/common", commonRoutes);


export default app;
