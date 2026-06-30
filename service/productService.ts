import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";
import {  newGearFilters, rigsAndRacksFilters, crossfitEquipmentFilters, barbellsFilters, platesFilters } from "../utils/filters.js";
import {  newGear, rigsAndRacks,crossfitEquipment,barbells,plates   } from "../utils/constants.js";


type FiltersType = Record<string, string[]>;

const categoryFilterMap: Record<string, FiltersType> = {
  [newGear]: newGearFilters,
  [rigsAndRacks]: rigsAndRacksFilters,
  [crossfitEquipment]: crossfitEquipmentFilters,
  [barbells]: barbellsFilters,
  [plates]: platesFilters
};


export const getProductById = (id: string) => {
  return productModel.findById(id);
};

export const deleteProductById = (id: string) =>
  productModel.findByIdAndDelete(id);



export const getProductsByCategoryService = async (categoryName: string, filters: Record<string, string[]>, page: number, perPage: number
) => {
  
  // Find category by name
  const category = await categoryModel.findOne({name: { $regex: `^${categoryName}$`,$options: "i",},
  });

  if (!category) {
    throw {code: 404, message: "Category Not Found",};
  }

  const categoryId = category._id.toString();

  // Get category filters
  const availableFilters = categoryFilterMap[categoryId];


  if (!availableFilters) {
    throw {
      code: 400,
      message: "No filters configured for this category",
    };
  }
  
  
  // Validate filters
  for (const [filterKey, values] of Object.entries(filters)) {
    
    const allowedValues = availableFilters[filterKey];
    if (!allowedValues) {
      throw {
        code: 400,
        message: `${filterKey} filter is not allowed for this category`,
      };
    }

   const invalidValues = values.filter(value => {
  return !allowedValues.some(
    allowed =>
      allowed.toLowerCase().trim() === value.toLowerCase().trim()
  );
});

    if (invalidValues.length) {
      throw {
        code: 400,
        message: `Invalid values for ${filterKey}: ${invalidValues.join(", ")}`
      };
    }
  }

  // Build query
  const query: any = {
    category_id: category._id,
  };

  const filterConditions = [];

  // for (const [key, values] of Object.entries(filters)) {
  //   filterConditions.push({
  //     [`filters.${key}`]: {
  //       $in: values,
  //     },
  //   });
  // }

  for (const [key, values] of Object.entries(filters)) {
  filterConditions.push({
    $or: values.map(value => ({
      [`filters.${key}`]: {
        $regex: `^${value}$`,
        $options: "i",
      },
    })),
   });
  }


  if (filterConditions.length) {
    query.$and = filterConditions;
  }

  const skip = (page - 1) * perPage;

  const [products, totalProducts] = await Promise.all([
    productModel
      .find(query)
      .select(
        "category_id productName description status image price discount_price"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage),

    productModel.countDocuments(query),
  ]);

   if (!products.length) {
    throw {
      code: 404,
      message: "No products found for this category",
    };
  }

  return {
    filters: availableFilters,
    products,
    pagination: {
      page,
      perPage,
      totalProducts,
      totalPages: Math.ceil(totalProducts / perPage),
    },
  };
};

