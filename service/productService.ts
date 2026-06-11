import productModel from "../models/productModel.js";

export const getProductById = (id: string) => {
  return productModel.findById(id);
};
export const deleteProductById = (id: string) =>
  productModel.findByIdAndDelete(id);

// export const UpdateProductById = (id: string, values: Record<string, any>)=> 
//   productModel.findByIdAndUpdate(id, values, { new: true });


// export const UpdateProductById = (
//   id: string,
//   values: Record<string, any>
// ) => productModel.findByIdAndUpdate(
//   { _id: id },
//       values,
//       { new: true }
//     );