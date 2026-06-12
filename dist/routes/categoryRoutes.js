import express, { Router } from "express";
import { createCategoryController, deleteCategoryController, updateCategoryController } from "../controllers/categoryControllers.js";
import reqValidator from "../middlewares/request/reqValidator.js";
import { createCategoryValidation, updateCategoryValidation } from "../validations/categoryValidation.js";
import { uploadMultipleDocuments, uploadSingleDocument } from "../middlewares/request/uploadFiles.js";
const router = express.Router();
router.post("/createCategory", uploadMultipleDocuments, reqValidator(createCategoryValidation), createCategoryController);
router.delete("/deleteCategory/:id", deleteCategoryController);
router.put("/updateCategory", uploadMultipleDocuments, reqValidator(updateCategoryValidation), updateCategoryController);
export default router;
//# sourceMappingURL=categoryRoutes.js.map