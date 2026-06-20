import mongoose, { Document } from "mongoose";
interface ICartItem {
    product_id: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}
export interface ICart extends Document {
    user_id: mongoose.Types.ObjectId;
    items: ICartItem[];
    total_amount: number;
}
declare const Cart: mongoose.Model<ICart, {}, {}, {}, mongoose.Document<unknown, {}, ICart, {}, mongoose.DefaultSchemaOptions> & ICart & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICart>;
export default Cart;
//# sourceMappingURL=addToCartModel.d.ts.map