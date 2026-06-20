import express, { Router } from "express";
import  { getallUserController, getUserByIdController}  from "../controllers/userControllers.js";
import reqValidator from "../middlewares/request/reqValidator.js";
import { getALLUserValidation } from "../validations/userValidation.js";

const router: Router = express.Router();

// Common API's

router.get("/getUser", getUserByIdController)
router.get("/getAllUsers", reqValidator(getALLUserValidation), getallUserController);


export default router;
 