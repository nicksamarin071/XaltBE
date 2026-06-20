export declare const getProductById: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/productModel.js").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null, import("mongoose").Document<unknown, {}, import("../models/productModel.js").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/productModel.js").IProduct, "findOne", {}>;
export declare const deleteProductById: (id: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/productModel.js").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null, import("mongoose").Document<unknown, {}, import("../models/productModel.js").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../models/productModel.js").IProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/productModel.js").IProduct, "findOneAndDelete", {}>;
//# sourceMappingURL=productService.d.ts.map