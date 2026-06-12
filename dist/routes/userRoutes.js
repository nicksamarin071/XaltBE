import express, { Router } from "express";
import { getallUserController, getUserByIdController } from "../controllers/userControllers.js";
const router = express.Router();
// Common API's
router.get("/getUser", getUserByIdController);
router.get("/getAllUsers", getallUserController);
export default router;
//# sourceMappingURL=userRoutes.js.map