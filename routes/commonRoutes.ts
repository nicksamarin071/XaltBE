import express, { Router } from "express";
import { healthCheckC } from "../controller/commonController.js";

const router: Router = express.Router();

// Common API's
router.get("/status/healthCheck", healthCheckC);

export default router;
