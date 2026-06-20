import mongoose from "mongoose";
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
export declare const getProductsByCategoryService: (category_id: string, page: number, perPage: number) => Promise<{
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
export declare const getFilteredProductsService: (categoryId: string, filters: Record<string, string[]>, page: number, perPage: number) => Promise<{
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
//# sourceMappingURL=productService.d.ts.map