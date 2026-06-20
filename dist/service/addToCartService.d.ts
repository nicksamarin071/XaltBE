export declare const addToCartService: (userId: string, productId: string, quantity: number) => Promise<import("mongoose").Document<unknown, {}, import("../models/addToCartModel.js").ICart, {}, import("mongoose").DefaultSchemaOptions> & import("../models/addToCartModel.js").ICart & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getCartService: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/addToCartModel.js").ICart, {}, import("mongoose").DefaultSchemaOptions> & import("../models/addToCartModel.js").ICart & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
//# sourceMappingURL=addToCartService.d.ts.map