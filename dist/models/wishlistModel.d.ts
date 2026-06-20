import mongoose, { Document } from "mongoose";
export interface IWishlist extends Document {
    user_id: mongoose.Types.ObjectId;
    product_id: mongoose.Types.ObjectId;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IWishlist, {}, {}, {}, mongoose.Document<unknown, {}, IWishlist, {}, mongoose.DefaultSchemaOptions> & IWishlist & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWishlist>;
export default _default;
//# sourceMappingURL=wishlistModel.d.ts.map