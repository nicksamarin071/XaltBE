import express, { Router } from "express";
import { healthCheckC } from "../controllers/commonControllers.js";
import { userLoginController, userRegisterController } from "../controllers/userControllers.js";
import { getAllProductController, getProductByIdController, searchProductController } from "../controllers/productControllers.js";
import { getALLCategoryConroller, getProductByCategoryIdController } from "../controllers/categoryControllers.js";
import { loginValidation, registerValidation } from "../validations/userValidation.js";
import  reqValidator from "../middlewares/request/reqValidator.js";
import { getALLCategoryValidation, getCategoryValidation } from "../validations/categoryValidation.js";
import { getALLProductValidation, getProductByIdValidation } from "../validations/productValidation.js";
import { downloadBrochureController, sendEmailController } from "../controllers/mailControllers.js";

const router: Router = express.Router();

// Common API's
router.get("/status/healthCheck", healthCheckC);


router.post("/register", reqValidator(registerValidation), userRegisterController);
router.post("/login", reqValidator(loginValidation), userLoginController);
router.get("/getAllProducts", reqValidator(getALLProductValidation), getAllProductController);
router.get("/getProduct", reqValidator(getProductByIdValidation), getProductByIdController);
router.get("/searchProduct", searchProductController);
router.get("/getAllCategory",reqValidator(getALLCategoryValidation), getALLCategoryConroller);
router.get("/getCategory",reqValidator(getCategoryValidation), getProductByCategoryIdController);
router.post("/send-email", sendEmailController);
router.get("/download-brochure", downloadBrochureController);

export default router;
