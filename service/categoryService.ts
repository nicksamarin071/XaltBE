import categoryModel from "../models/categoryModel.js";


// export const getCategoryById = (id: string) => {
//   return categoryModel.findById(id);
// };

export const deleteCategoryById = (id: string)=> categoryModel.findByIdAndDelete({_id: id});
