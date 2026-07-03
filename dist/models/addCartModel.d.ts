import mongoose, { Document } from "mongoose";
interface ICartItem {
    product_id: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}
interface ICart extends Document {
    user_id: mongoose.Types.ObjectId;
    items: ICartItem[];
    total_amount: number;
}
declare const _default: mongoose.Model<ICart, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, ICart, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ICart & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<ICart, mongoose.Model<ICart, any, any, any, any, any, ICart>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICart, mongoose.Document<unknown, {}, ICart, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ICart & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ICart, mongoose.Document<unknown, {}, ICart, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICart & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    user_id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ICart, mongoose.Document<unknown, {}, ICart, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICart & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    items?: mongoose.SchemaDefinitionProperty<ICartItem[], ICart, mongoose.Document<unknown, {}, ICart, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICart & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    total_amount?: mongoose.SchemaDefinitionProperty<number, ICart, mongoose.Document<unknown, {}, ICart, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICart & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ICart>, ICart>;
export default _default;
//# sourceMappingURL=addCartModel.d.ts.map