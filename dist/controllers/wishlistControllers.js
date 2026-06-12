import wishlistModel from "../models/wishlistModel.js";
import { resSend } from "../middlewares/response/resSend.js";
import productModel from "../models/productModel.js";
export const addwishlistController = async (req, res) => {
    try {
        const user_id = req.session?._id;
        if (!user_id) {
            return resSend(res, 401, "", null);
        }
        const { product_id } = req.body;
        if (!product_id) {
            return resSend(res, 400, "Product ID is required", null);
        }
        ;
        const product = await productModel.findById(product_id);
        if (!product) {
            return resSend(res, 404, "Product not found", null);
        }
        ;
        const existingWishlist = await wishlistModel.findOne({
            user_id,
            product_id,
        });
        // Same user + same product already exists
        if (existingWishlist) {
            return resSend(res, 400, "Product already added in wishlist", null);
        }
        const wishlist = await wishlistModel.create({
            user_id,
            product_id,
        });
        return resSend(res, 201, "Product added to wishlist successfully", wishlist);
    }
    catch (error) {
        console.log(error);
        resSend(res, 500, "", null);
    }
};
export const getUserWishlistController = async (req, res) => {
    try {
        const user_id = req.session?._id;
        if (!user_id) {
            return resSend(res, 401, "", null);
        }
        const userWishlist = await wishlistModel.find({ user_id }).populate({
            path: "product_id",
            select: "_id productName",
        });
        if (!userWishlist) {
            return resSend(res, 404, "Product is not Found", null);
        }
        return resSend(res, 200, "", userWishlist);
    }
    catch (error) {
        console.log(error);
        resSend(res, 500, "", null);
    }
};
export const removeWishlistController = async (req, res) => {
    try {
        const user_id = req.session?._id;
        if (!user_id) {
            return resSend(res, 401, "", null);
        }
        ;
        const { product_id } = req.body;
        if (!product_id) {
            return resSend(res, 400, "Product_id is required", null);
        }
        ;
        const exitingProduct = await wishlistModel.find();
        if (!exitingProduct) {
            return resSend(res, 400, "Product not exit", null);
        }
        ;
        const deletedWishlist = await wishlistModel.findOneAndDelete({ user_id, product_id, });
        if (!deletedWishlist) {
            return resSend(res, 404, "Wishlist product not found", null);
        }
        ;
        return resSend(res, 200, "Remove Wishlist Product Successfully", deletedWishlist);
    }
    catch (error) {
        console.log(error);
        resSend(res, 500, "", null);
    }
};
//# sourceMappingURL=wishlistControllers.js.map