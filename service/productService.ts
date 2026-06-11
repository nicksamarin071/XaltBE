import productModel from "../models/productModel.js";

export const getProductById = (id: string) => {
  return productModel.findById(id);
};
export const deleteProductById = (id: string) =>
  productModel.findByIdAndDelete(id);

