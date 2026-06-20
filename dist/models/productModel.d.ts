import mongoose, { Document } from "mongoose";
export interface IProduct extends Document {
    productName: string;
    description: string;
    category_id: string;
    status?: string;
    image: string[];
    sku?: number;
    brands: string;
    price: number;
    discount_price?: number;
    gst_Percentage: number;
    gst_price?: number;
    stock: number;
    is_new: boolean;
    filters: object;
}
declare const _default: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
export default _default;
//# sourceMappingURL=productModel.d.ts.map