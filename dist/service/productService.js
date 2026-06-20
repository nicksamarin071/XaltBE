import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";
import { newGearFilters, rigsAndRacksFilters, crossfitEquipmentFilters, barbellsFilters, platesFilters } from "../utils/filters.js";
import { newGear, rigsAndRacks, crossfitEquipment, barbells, plates } from "../utils/constants.js";
const categoryFilterMap = {
    [newGear]: newGearFilters,
    [rigsAndRacks]: rigsAndRacksFilters,
    [crossfitEquipment]: crossfitEquipmentFilters,
    [barbells]: barbellsFilters,
    [plates]: platesFilters
};
export const getProductById = (id) => {
    return productModel.findById(id);
};
export const deleteProductById = (id) => productModel.findByIdAndDelete(id);
export const getProductsByCategoryService = async (category_id, page, perPage) => {
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
        throw {
            code: 400,
            message: "Invalid or missing category_id",
        };
    }
    const category = await categoryModel.findById(category_id);
    if (!category) {
        throw { code: 404, message: "Category Not Found", };
    }
    const skip = (page - 1) * perPage;
    const [products, totalProducts] = await Promise.all([
        productModel
            .find({ category_id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage),
        productModel.countDocuments({ category_id }),
    ]);
    if (!products.length) {
        throw {
            code: 404,
            message: "No products found for this category",
        };
    }
    return {
        products,
        pagination: {
            page,
            perPage,
            totalProducts,
            totalPages: Math.ceil(totalProducts / perPage),
        },
    };
};
export const getFilteredProductsService = async (categoryId, filters, page, perPage) => {
    // category validation
    const categoryFilters = categoryFilterMap[categoryId];
    if (!categoryFilters) {
        throw { code: 400, message: "Invalid category", };
    }
    // validate filters
    for (const [filterKey, values] of Object.entries(filters)) {
        const allowedValues = categoryFilters[filterKey];
        if (!allowedValues) {
            throw {
                code: 400,
                message: `${filterKey} filter is not allowed for this category`,
            };
        }
        const invalidValues = values.filter((value) => !allowedValues.includes(value));
        if (invalidValues.length) {
            throw {
                message: `Invalid values for ${filterKey}: ${invalidValues.join(", ")}`,
                code: 400
            };
        }
    }
    // build mongo query
    const query = {
        category_id: categoryId
    };
    const filterConditions = [];
    for (const [key, values] of Object.entries(filters)) {
        filterConditions.push({
            [`filters.${key}`]: {
                $in: values
            }
        });
    }
    if (filterConditions.length) {
        query.$and = filterConditions;
    }
    const skip = (page - 1) * perPage;
    const [products, totalProducts] = await Promise.all([
        productModel
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage),
        productModel.countDocuments(query),
    ]);
    if (!products.length) {
        throw {
            code: 404,
            message: "No products found for this query",
        };
    }
    return {
        products,
        pagination: {
            page,
            perPage,
            totalProducts,
            totalPages: Math.ceil(totalProducts / perPage),
        },
    };
};
// Service
//  ├─ Validation
//  ├─ Database
//  ├─ Business Logic
//  └─ Return Data
//# sourceMappingURL=productService.js.map