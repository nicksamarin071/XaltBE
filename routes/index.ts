import express, { type Application } from "express";

import commonRoutes from "./commonRoutes.js";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import wishlistRoutes from "./wishlistRoutes.js";
import addToCartRoutes from "./addToCartRoutes.js";
import mailRoutes from "./mailRoutes.js";

const app: Application = express();

app.use("/common", commonRoutes);
app.use("/", userRoutes);      // when we used only which api then used without authentication(Token);
app.use("/", productRoutes);
app.use("/", categoryRoutes);
app.use("/", wishlistRoutes);
app.use("/", addToCartRoutes);
app.use("/", mailRoutes);

export default app; 