import express, { Router } from "express";
import { addwishlistController, getUserWishlistController, removeWishlistController } from "../controllers/wishlistControllers.js";

const router: Router = express.Router();


router.post("/addWishlist", addwishlistController);
router.get("/getUserWishlist", getUserWishlistController);
router.delete("/removeWislist", removeWishlistController);


export default router;