import express, { Router } from "express";
import reqValidator from "../middlewares/request/reqValidator.js";
import { sendEmailConsultWithExpert } from "../controllers/mailControllers.js";
import { EmailValidation } from "../validations/mailValidation.js";

const router: Router = express.Router();


router.post("/sendEmailtoExpert", reqValidator(EmailValidation),  sendEmailConsultWithExpert)

export default router;
 