import mongoose, { Document } from "mongoose";
export interface ICategory extends Document {
    name: string;
    description: String;
    title: string;
    status?: string;
    image: string[];
}
declare const _default: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory, {}, mongoose.DefaultSchemaOptions> & ICategory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICategory>;
export default _default;
//# sourceMappingURL=categoryModel.d.ts.map