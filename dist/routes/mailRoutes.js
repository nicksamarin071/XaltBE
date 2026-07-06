import express, { Router } from "express";
import reqValidator from "../middlewares/request/reqValidator.js";
import { sendEmailConsultWithExpert } from "../controllers/mailControllers.js";
import { ExpertEmailValidation } from "../validations/mailValidation.js";
const router = express.Router();
router.post("/sendEmailtoExpert", reqValidator(ExpertEmailValidation), sendEmailConsultWithExpert);
export default router;
//# sourceMappingURL=mailRoutes.js.map