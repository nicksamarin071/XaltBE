import express, { Router } from "express";
import  { getallUserController, getSingleUserController}  from "../controllers/userControllers.js";

const router: Router = express.Router();

// Common API's

router.get("/getUser", getSingleUserController)
router.get("/getAllUsers", getallUserController);


export default router;
 