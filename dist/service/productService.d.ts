import mongoose from "mongoose";
type FiltersType = Record<string, string[]>;
export declare const getProductById: (id: string) => mongoose.Query<(mongoose.Document<unknown, {}, import("../models/productModel.js").IProduct, {}, mongoose.DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null, mongoose.Document<unknown, {}, import("../models/productModel.js").IProduct, {}, mongoose.DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/productModel.js").IProduct, "findOne", {}>;
export declare const deleteProductById: (id: string) => mongoose.Query<(mongoose.Document<unknown, {}, import("../models/productModel.js").IProduct, {}, mongoose.DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null, mongoose.Document<unknown, {}, import("../models/productModel.js").IProduct, {}, mongoose.DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/productModel.js").IProduct, "findOneAndDelete", {}>;
export declare const getProductsByCategoryService: (categoryName: string, filters: Record<string, string[]>, page: number, perPage: number) => Promise<{
    filters: FiltersType;
    products: (mongoose.Document<unknown, {}, import("../models/productModel.js").IProduct, {}, mongoose.DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[];
    pagination: {
        page: number;
        perPage: number;
        totalProducts: number;
        totalPages: number;
    };
}>;
export {};
//# sourceMappingURL=productService.d.ts.map