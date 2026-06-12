import mongoose, { Document } from "mongoose";
export interface INewsletter extends Document {
    email: string;
    isSubscribed: boolean;
}
declare const _default: mongoose.Model<INewsletter, {}, {}, {}, mongoose.Document<unknown, {}, INewsletter, {}, mongoose.DefaultSchemaOptions> & INewsletter & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, INewsletter>;
export default _default;
//# sourceMappingURL=mailModel.d.ts.map