import categoryModel from "../models/categoryModel.js";
// export const getCategoryById = (id: string) => {
//   return categoryModel.findById(id);
// };
export const deleteCategoryById = (id) => categoryModel.findByIdAndDelete({ _id: id });
//# sourceMappingURL=categoryService.js.map