import { resSend } from "../middlewares/response/resSend.js";
import productModel from "../models/productModel.js";
import { deleteProductById, getProductsByCategoryService } from "../service/productService.js";
import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
import { deleteimageFromS3 } from "../thirdPartyServices/configure.s3.js";
import { uploadImagesToS3 } from "../thirdPartyServices/uploadimages.s3.js";
import { newGearFilters, rigsAndRacksFilters, crossfitEquipmentFilters, barbellsFilters, platesFilters } from "../utils/filters.js";
import { newGear, rigsAndRacks, crossfitEquipment, barbells, plates } from "../utils/constants.js";
const categoryFilterMap = {
    [newGear]: newGearFilters,
    [rigsAndRacks]: rigsAndRacksFilters,
    [crossfitEquipment]: crossfitEquipmentFilters,
    [barbells]: barbellsFilters,
    [plates]: platesFilters
};
export const createProductController = async (req, res) => {
    const user = req.session;
    if (!user || user.role !== "Admin") {
        return resSend(res, 400, "Access denied. Only admin can perform this action.", null);
    }
    ;
    try {
        const { productName, category_id, description, price, status, sku, brands, discount_price, gst_Percentage, gst_price, stock, is_new, service, logo_name, weight } = req.body;
        const checkProduct = await productModel.findOne({ productName });
        if (checkProduct) {
            return resSend(res, 400, "Product already Exit!! Please Change ProductName", null);
        }
        ;
        const CheckCategory = await categoryModel.findById(category_id);
        if (!CheckCategory) {
            return resSend(res, 404, "Category Not Found", null);
        }
        ;
        let filters = req.body.filters;
        const allowedFilters = categoryFilterMap[category_id];
        if (!allowedFilters) {
            return resSend(res, 400, "Invalid or unsupported category_id.", null);
        }
        // Check filter keys
        const invalidKeys = Object.keys(filters).filter(key => !Object.keys(allowedFilters).includes(key));
        if (invalidKeys.length > 0) {
            return resSend(res, 400, `Invalid filter keys: ${invalidKeys.join(", ")}`, null);
        }
        // Check filter values
        for (const [key, values] of Object.entries(filters)) {
            const allowedValues = allowedFilters[key];
            if (!allowedValues || !Array.isArray(values))
                continue;
            const invalidValues = values.filter(v => !allowedValues.includes(v));
            if (invalidValues.length > 0) {
                return resSend(res, 400, `Invalid filter keys: ${invalidKeys.join(", ")}`, null);
            }
        }
        const uploadedImages = await uploadImagesToS3(req);
        if (uploadedImages.length === 0) {
            return resSend(res, 400, "Image is required", null);
        }
        ;
        const productData = await productModel.create({
            productName, category_id, description,
            image: uploadedImages,
            price, status, filters, sku, brands,
            discount_price, gst_Percentage, gst_price, stock, is_new, service, logo_name, weight
        });
        return resSend(res, 201, 'Product Created Successfully', productData);
    }
    catch (error) {
        console.log(error);
        resSend(res, 500, "", null);
    }
};
export const getAllProductController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 20;
        const skip = (page - 1) * perPage;
        const products = await productModel.find().select('category_id productName description status image price discount_price').skip(skip).limit(perPage);
        if (!products) {
            return resSend(res, 404, "", null);
        }
        const totalData = await productModel.countDocuments();
        const totalPage = Math.ceil(totalData / perPage);
        return resSend(res, 200, "Get All products Successfully", products, {
            totalData,
            currentPage: page,
            perPage,
            totalPage,
        });
    }
    catch (error) {
        console.log(error);
        resSend(res, 500, "", null);
    }
};
export const getProductByNameController = async (req, res) => {
    try {
        const productName = req.query?.productName;
        const getProductDetails = await productModel.findOne({ productName });
        if (!getProductDetails) {
            return resSend(res, 404, "", null);
        }
        return resSend(res, 200, "Products data fetched successfully", [getProductDetails]);
    }
    catch (error) {
        console.log(error);
        resSend(res, 500, "", null);
    }
};
export const updateProductController = async (req, res) => {
    const user = req.session;
    if (!user || user.role !== "Admin") {
        return resSend(res, 400, "Access denied. Only admin can perform this action.", null);
    }
    ;
    try {
        const id = req.body?.id; // ? multipart/form-data = check if exit or not
        if (!id) {
            return resSend(res, 400, "Product ID is required", null);
        }
        // console.log("id:", id);
        // console.log("isValid:", mongoose.Types.ObjectId.isValid(id as string));
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return resSend(res, 400, "Invalid product id", null);
        }
        ;
        const product = await productModel.findById(id);
        if (!product) {
            return resSend(res, 404, "Product not found", null);
        }
        const uploadedImages = await uploadImagesToS3(req);
        let imageUrls = product.image;
        // If new images uploaded
        if (uploadedImages.length > 0) {
            // Delete old images from AWS
            if (product.image?.length > 0) {
                for (const image of product.image) {
                    await deleteimageFromS3(image);
                }
            }
            // Set new images
            imageUrls = uploadedImages;
        }
        const { productName, description, price, status, filters, sku, brands, discount_price, gst_Percentage, gst_price, stock, is_new } = req.body;
        const checkProduct = await productModel.findOne({ productName });
        if (checkProduct) {
            return resSend(res, 400, "Product already Exit!! Please Change ProductName", null);
        }
        ;
        const updateData = {
            productName,
            description,
            status,
            image: imageUrls,
            price, filters, sku, brands,
            discount_price, gst_Percentage, gst_price, stock, is_new
        };
        // Remove undefined fields
        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });
        // const updateProduct = await productModel.findByIdAndUpdate(id as string, updateData, {new: true});
        const updateProduct = await productModel.findOneAndUpdate({ _id: id }, updateData, { returnDocument: "after" }); //same behavior, but using the newer MongoDB driver terminology
        if (!updateProduct) {
            return resSend(res, 404, "Product not found", null);
        }
        return resSend(res, 200, "Product Updated successfully", updateProduct);
    }
    catch (error) {
        console.log(error);
        return resSend(res, 500, "", null);
    }
};
export const deleteProductController = async (req, res) => {
    const user = req.session;
    if (!user || user.role !== "Admin") {
        return resSend(res, 400, "Access denied. Only admin can perform this action.", null);
    }
    ;
    try {
        const { id } = req.params;
        if (!id) {
            return resSend(res, 400, "Product ID is required", null);
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return resSend(res, 400, "Invalid product id", null);
        }
        const product = await productModel.findById(id);
        if (!product) {
            return resSend(res, 404, "Product not found", null);
        }
        // Delete all product images from S3
        if (product.image) {
            await deleteimageFromS3(product.image);
        }
        const deletedProduct = await deleteProductById(id);
        if (!deletedProduct) {
            return resSend(res, 404, "Product not found", null);
        }
        return resSend(res, 200, "Product deleted successfully", null);
    }
    catch (error) {
        console.log(error);
        return resSend(res, 500, "", null);
    }
};
export const searchProductController = async (req, res) => {
    try {
        const { search, page = "1", perPage = "10", } = req.query;
        // Validation
        if (!search) {
            return resSend(res, 400, "Search keyword is required", null);
        }
        if (search.length < 3) {
            return resSend(res, 400, "Please enter at least 3 characters", null);
        }
        ;
        const pageNumber = Number(page);
        const perPageNumber = Number(perPage);
        // Find categories matching search
        const categories = await categoryModel.find({
            name: {
                $regex: search,
                $options: "i",
            },
        });
        const categoryIds = categories.map((item) => item._id);
        const filter = {
            status: "active",
            $or: [
                {
                    productName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    category_id: {
                        $in: categoryIds,
                    },
                },
            ],
        };
        const products = await productModel.find(filter)
            .populate({
            path: "category_id",
            select: "_id name",
        })
            .skip((pageNumber - 1) * perPageNumber)
            .limit(perPageNumber)
            .sort({ createdAt: -1 });
        const total = await productModel.countDocuments(filter);
        const totalPage = Math.ceil(total / perPageNumber);
        return resSend(res, 200, "Products fetched successfully", products, {
            total,
            page: pageNumber,
            perPage: perPageNumber,
            totalPage,
        });
    }
    catch (error) {
        console.log(error);
        return resSend(res, 500, "", null);
    }
};
export const getProductByCategoryIdController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 20;
        const categoryName = req.query.categoryName;
        const { page: _, perPage: __, categoryName: ___, ...queryFilters } = req.query;
        const filters = {};
        for (const [key, value] of Object.entries(queryFilters)) {
            if (Array.isArray(value)) {
                filters[key] = value.map(v => String(v).trim());
            }
            else if (typeof value === "string") {
                filters[key] = value.split(",").map(v => v.trim());
            }
        }
        const result = await getProductsByCategoryService(categoryName, filters, page, perPage);
        if (result.products.length === 0) {
            return resSend(res, 200, "Products fetched successfully", [], result.pagination, {
                filters: result.filters
            });
        }
        return resSend(res, 200, "Products fetched successfully", result.products, result.pagination, {
            filters: result.filters
        });
    }
    catch (error) {
        return resSend(res, error.code || 500, error.message, null);
    }
};
//# sourceMappingURL=productControllers.js.map