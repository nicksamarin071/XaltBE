import express, { Router } from "express";
import { createProductController, deleteProductController, updateProductController } from "../controllers/productControllers.js";
import { uploadMultipleDocuments, uploadSingleDocument } from "../middlewares/request/uploadFiles.js";
import reqValidator from "../middlewares/request/reqValidator.js";
import { createProductValidation, UpdateproductValidation } from "../validations/productValidation.js";
import { parseFilters } from "../middlewares/request/fieldsParser.js";
const router: Router = express.Router();


router.post("/createProduct", uploadMultipleDocuments, parseFilters, reqValidator(createProductValidation), createProductController);
router.delete("/deleteProduct/:id", deleteProductController);
router.put("/updateProduct", uploadMultipleDocuments, reqValidator(UpdateproductValidation), updateProductController);

export default router;
 