import express, { Router } from "express";
import { addToCartController, getToCartController } from "../controllers/addToCartControllers.js";
import reqValidator from "../middlewares/request/reqValidator.js";
import { createAddCartValidation } from "../validations/addToCartValidation.js";
// import { createAddCartValidation } from "../validations/addToCartValidation.js";
// import reqValidator from "../middlewares/request/reqValidator.js";
const router = express.Router();
router.post("/addCart", reqValidator(createAddCartValidation), addToCartController);
router.get("/getCart", getToCartController);
export default router;
//# sourceMappingURL=addToCartRoutes.js.map