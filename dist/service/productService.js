import productModel from "../models/productModel.js";
export const getProductById = (id) => {
    return productModel.findById(id);
};
export const deleteProductById = (id) => productModel.findByIdAndDelete(id);
//# sourceMappingURL=productService.js.map